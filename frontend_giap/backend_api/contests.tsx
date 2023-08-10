import assert from 'assert';
import { EnumType } from 'typescript';
import { getGameInfo } from './games';


enum ContestFormat {
    ALL_VS_ALL = "all-vs-all", 
    ROUND_16 = "round-16"
}

enum JudgeMode { 
    MANUAL_JUDGE = "manual-judge", 
    AUTO_JUDGE = "auto-judge"
}

interface ContestInfoI { 
    contestId: number, 
    contestName: string, 
    overview: string, 
    startDate: Date, 
    endDate: Date, 
    contestFormat: ContestFormat, 
    trialJudge: boolean, 
    judgeMode: JudgeMode, 
}

interface ContestDetailsI { 
    contestId: number, 
    contestName: string, 
    startDate: Date, 
    endDate: Date, 
    gameId: number, 
    gameName: string, 
    gameStatementUrl: string, 
    gameRenderUrl: string
}

async function createContest(contestInfo:Object) : Promise<{
    success: boolean, 
    msg: string
}> {
    try { 
        const response = await fetch("/api/contests/create", 
            { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(contestInfo), 
            }
        ); 

        return {
            success: response.ok, 
            msg: (await response.json()).msg
        }
    } catch(e) { 
        return { 
            success: false, 
            msg: "Error: " + e 
        }
    }
}

async function getAllContests() : Promise<{ 
    success: boolean, 
    msg: string, 
    contestsInfo?: ContestInfoI[]
}>{  
    // cannot figure out the bug???? Just need to try catch!!!
    try { 
        // why is it not working? apparently await can escape try / catch block
        const response = await fetch("/api/contests", 
            { 
                method: "GET"
            }
        ); 

        const success = response.ok;
        const jsonResponse = await response.json(); 
        const msg = jsonResponse.msg;  
        const contests = jsonResponse.contests; 
        
        return { 
            success, 
            msg, 
            contestsInfo: contests.map((contest) => {
                return { 
                    contestId: contest.id, 
                    contestName: contest.name, 
                    startDate: new Date(contest.startDate), 
                    endDate: new Date(contest.endDate),
                }
            })
        }
    } catch(error) {
        return { 
            success: false, 
            msg: error.toString()
        }
    }
}

async function getContestDetails(
    contestId: number
): Promise<{
    success: boolean, 
    msg: string, 
    contestDetails?: ContestDetailsI 
}> { 
    try { 
        const response = await fetch("/api/contest/" + contestId, 
            { 
                method: "GET"
            }
        ); 
        const success = response.ok;
        const jsonResponse = await response.json(); 
        const msg = jsonResponse.msg;  
        const contest = jsonResponse.contest; 

        console.log(jsonResponse); 

        if(!success) { 
            return { 
                success, 
                msg
            }
        }

        console.log(contest); 

        const gameInfoResponse = await getGameInfo(contest.gameId); 
        console.log(gameInfoResponse); 

        if(!gameInfoResponse.success) { 
            return { 
                success: false, 
                msg: "fetching game failed. " + gameInfoResponse.msg
            }
        }

        const game = gameInfoResponse.gameInfo; 
        assert(game != undefined); 

        return { 
            success: true, 
            msg: "Contest query: " + msg + "\nGame query: " + gameInfoResponse.msg, 
            contestDetails: { 
                contestId: contest.id, 
                contestName: contest.name, 
                startDate: new Date(contest.startDate), 
                endDate: new Date(contest.endDate), 
                gameId: game.id, 
                gameName: game.name, 
                gameStatementUrl: game.statementUrl, 
                gameRenderUrl: game.renderUrl
            }
        }; 
    }catch(e) {
        return { 
            success: false, 
            msg: e.toString()
        }; 
    }
}

async function submitCode({
    contestId, 
    file
}:{ 
    contestId: number, 
    file: File
}): Promise<{ 
    success: boolean, 
    msg: string
}> {
    try { 
        const data = new FormData(); 
        data.append("sourceCode", file); 
        const response = await fetch("/api/contest/" + contestId + "/submit", 
            { 
                method: "POST", 
                body: data
            }
        ); 
        const success = response.ok;
        const jsonResponse = await response.json(); 
        const msg = jsonResponse.msg;  

        console.log(jsonResponse); 

        return { 
            success, 
            msg
        }

    }catch(error) {
        alert(error); 
        return { 
            success: false, 
            msg: error.toString()
        }; 
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
    ContestInfoI, 
    ContestDetailsI
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