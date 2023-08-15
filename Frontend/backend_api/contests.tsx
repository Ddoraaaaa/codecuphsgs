import { getGameInfo } from './games';
import validateResponse from './validation_utils/validateResponse';
import UnknownInternalError from './errors/unknownInternalError';
import ServerError from './errors/serverError';
import ValidationError from './errors/validationError';


enum ContestFormat {
    ALL_VS_ALL = "all-vs-all", 
    ROUND_16 = "round-16"
}

enum JudgeMode { 
    MANUAL_JUDGE = "manual-judge", 
    AUTO_JUDGE = "auto-judge"
}

interface ContestInfo { 
    contestId: number, 
    contestName: string, 
    overview: string, 
    startDate: Date, 
    endDate: Date, 
    contestFormat: ContestFormat, 
    trialJudge: boolean, 
    judgeMode: JudgeMode, 
}

interface ContestDetails { 
    contestId: number, 
    contestName: string, 
    startDate: Date, 
    endDate: Date, 
    gameId: number, 
    gameName: string, 
    gameStatementUrl: string, 
    gameRenderUrl: string
}

interface SubmissionInfo { 
    submissionId: number, 
    contestId: number, 
    userId: number
}

async function createContest(contestInfo:Object) : Promise<{
    success: boolean, 
    msg: string
}> {
    const response = await fetch("/api/contests/create", 
        { 
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(contestInfo), 
        }
    ); 

    const { status, body} = await validateResponse(response); 

    try { 
        return body.contest; 
    }
    catch(error: any) { 
        console.log("Unknown internal api error at create contest api: " + error); 
        throw new UnknownInternalError(); 
    }
}

async function getAllContests() : Promise<ContestInfo[]>{  
    const response = await fetch("/api/contests", 
        { 
            method: "GET"
        }
    ); 

    const { status, body} = await validateResponse(response); 
    
    try { 
        return body.contests.map((contest: any) => {
                return { 
                    contestId: contest.id, 
                    contestName: contest.name, 
                    startDate: new Date(contest.startDate), 
                    endDate: new Date(contest.endDate),
                }
            })
    } catch(error: any) {
        console.log("Unknown internal api error at getAllContests api: " + error); 
        throw new UnknownInternalError(); 
    }
}

async function getContestDetails(
    contestId: number
): Promise<ContestDetails> { 
    const response = await fetch("/api/contest/" + contestId, 
        { 
            method: "GET"
        }
    ); 

    const {status, body} = await validateResponse(response); 
    
    let contest; 
    try { 
        contest = body.contest; 
    } catch(error) { 
        console.log("Error at getContestDetails API: " + error); 
        throw new ServerError(); 
    }

    const game = await getGameInfo(contest.id); 

    try { 
        return { 
                contestId: contest.id, 
                contestName: contest.name, 
                startDate: new Date(contest.startDate), 
                endDate: new Date(contest.endDate), 
                gameId: game.id, 
                gameName: game.name, 
                gameStatementUrl: game.statementUrl, 
                gameRenderUrl: game.renderUrl
        }
    }
    catch(error: any) {
        console.log("Error at getContestDetails API: " + error); 
        throw new UnknownInternalError(); 
    }
}

async function submitCode({
    contestId, 
    file
}:{ 
    contestId: number, 
    file: File
}): Promise<SubmissionInfo> {
    if(!file) { 
        throw new ValidationError("File missing"); 
    }
    if(typeof contestId != "number") { 
        throw new ValidationError("ContestId is not a number")
    }

    const data = new FormData(); 

    data.append("sourceCode", file); 
    const response = await fetch("/api/contest/" + contestId + "/submit", 
        { 
            method: "POST", 
            body: data
        }
    ); 

    const {status, body} = await validateResponse(response);
    
    try { 
        const submission = body.submission; 
        return { 
            submissionId: submission.id, 
            contestId: submission.contestId, 
            userId: submission.userId
        }
    }catch(error: any) {
        console.log("Error at submitCode API: " + error); 
        throw new UnknownInternalError(); 
    }
}

async function getResult(contestId:Number) {
    const response = await fetch(`/api/contest/${contestId}/results`, 
    { 
        method: "GET"
    })
    const body = await response.json(); 
    return body; 
}

export type {  
    ContestInfo, 
    ContestDetails, 
    SubmissionInfo
}

export { 
    ContestFormat, 
    JudgeMode, 
    getAllContests, 
    getContestDetails, 
    submitCode, 
    createContest, 
    getResult
}