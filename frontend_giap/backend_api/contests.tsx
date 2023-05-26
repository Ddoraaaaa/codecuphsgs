import assert from 'assert';

interface contestInfoI { 
    contestId: number, 
    contestName: string, 
    startDate: Date, 
    endDate: Date, 
}

interface contestDetailsI { 
    contestId: number, 
    contestName: string, 
    startDate: Date, 
    endDate: Date, 
    gameId: number, 
    gameName: string, 
    gameStatementUrl: string, 
    gameRenderUrl: string
}

async function getAllContests() : Promise<{ 
    success: boolean, 
    msg: string, 
    contestsInfo?: contestInfoI[]
}>{  
    // cannot figure out the bug???? Just need to try catch!!!
    try { 
        // why is it not working? apparently await can escape try / catch block
        let response = await fetch("/api/contests", 
            { 
                method: "GET"
            }
        ); 

        let success = response.ok;
        let jsonResponse = await response.json(); 
        let msg = jsonResponse.msg;  
        let contests = jsonResponse.contests; 
        console.log(jsonResponse); 
        
        return { 
            success, 
            msg, 
            contestsInfo: contests.map((contest) => {
                return { 
                    contestId: contest.id, 
                    contestName: contest.name, 
                    startDate: contest.startDate, 
                    endDate: contest.endDate
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
    contestDetails?: contestDetailsI 
}> { 
    console.log("function called!")
    try { 
        let response = await fetch("/api/contest/" + contestId, 
            { 
                method: "GET"
            }
        ); 
        let success = response.ok;
        let jsonResponse = await response.json(); 
        let msg = jsonResponse.msg;  
        let contest = jsonResponse.contest; 

        console.log(jsonResponse); 

        if(!success) { 
            return { 
                success, 
                msg
            }
        }

        let responseGame = await fetch(
            "/api/game/" + contest.gameId, 
            { 
                method: "GET"
            }
        ); 
        let successGame = responseGame.ok; 
        let jsonResponseGame = await responseGame.json(); 
        let msgGame = jsonResponseGame.msg; 
        let game = jsonResponseGame.game; 

        console.log(jsonResponseGame); 

        if(!successGame) { 
            return { 
                success: successGame, 
                msg: msgGame
            }
        }

        return { 
            success: true, 
            msg: "Contest query: " + msg + "\nGame query: " + msgGame, 
            contestDetails: { 
                contestId: contest.id, 
                contestName: contest.name, 
                startDate: contest.startDate, 
                endDate: contest.endDate, 
                gameId: game.id, 
                gameName: game.name, 
                gameStatementUrl: game.statementUrl, 
                gameRenderUrl: game.renderUrl
            }
        }; 
    }catch(error) {
        return { 
            success: false, 
            msg: error.toString()
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
        let data = new FormData(); 
        data.append("sourceCode", file); 
        let response = await fetch("/api/contest/" + contestId + "/submit", 
            { 
                method: "POST", 
                body: data
            }
        ); 
        let success = response.ok;
        let jsonResponse = await response.json(); 
        let msg = jsonResponse.msg;  

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

export type { 
    contestInfoI, 
    contestDetailsI
}

export { 
    getAllContests, 
    getContestDetails, 
    submitCode
}