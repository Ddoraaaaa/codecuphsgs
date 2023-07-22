interface GameInfoI { 
    id: number, 
    name: string, 
    statementUrl: string, 
    renderUrl: string
}

async function createGame({
    name, 
    statementUrl, 
    renderUrl
}: { 
    name: string, 
    statementUrl:string, 
    renderUrl: string
}) : Promise<{ 
    success: boolean, 
    msg: string
}>{
    try { 
        const response = await fetch("/api/games/create", 
            { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                }, // !!!! without this, won't work. 
                body: JSON.stringify({
                    name, 
                    statementUrl, 
                    renderUrl,
                })
            }
        )
        const success = response.ok; 
        
        const jsonResponse = await response.json(); 
        const msg = jsonResponse.msg; 

        return { 
            success, 
            msg
        }
    } catch(e) { 
        return { 
            success: false, 
            msg: e.toString()
        };  
    }
}

async function getGameInfo(
    gameId:number
): Promise<{
    success: boolean, 
    msg: string, 
    gameInfo?: GameInfoI
}> {
    try { 
        const response = await fetch(`api/game/${gameId}`); 
        const success = response.ok; 
        const jsonResponse = await response.json(); 
        const {msg, gameInfo} = jsonResponse; 
        return ({
            success, 
            msg, 
            ...(success && {
                gameInfo: {
                    id: gameInfo.id, 
                    name: gameInfo.name, 
                    statementUrl: gameInfo.statementUrl, 
                    renderUrl: gameInfo.renderUrl
                }
            })
        }) 
    } catch(e) { 
        return { 
            success: false, 
            msg: e.toString()
        }
    }
}

async function getAllGamesInfo(
): Promise<{ 
    success: boolean, 
    msg: string, 
    gamesInfo?: Array<GameInfoI>
}>{
    try { 
        const response = await fetch(`/api/games`, { // hudge mistake: api/games -> /api/games!!!!!
            method: "GET"
        }); 
        const success = response.ok; 
        const jsonResponse = await response.json(); 
        console.log(jsonResponse); 
        const msg = jsonResponse.msg; 
        return ({
            success, 
            msg, 
            ...(success && {
                gamesInfo: jsonResponse.games.map(game => { 
                    return { 
                        id: game.id, 
                        name: game.name, 
                        statementUrl: game.statementUrl, 
                        ...(game.judgeUrl != undefined && {
                            judgeUrl: game.judgeUrl
                        }), 
                        renderUrl: game.renderUrl
                    }
                })
            })
        }) 
    } catch(e) { 
        return { 
            success: false, 
            msg: e.toString()
        }
    }
}

export { 
    getAllGamesInfo, 
    getGameInfo, 
    createGame
}

export type { 
    GameInfoI
}