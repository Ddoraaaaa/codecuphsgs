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
    } catch(e: any) { 
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
        const response = await fetch(`/api/game/${gameId}`); 
        console.log("ldsjfldsjkf")
        if(response.ok) {
            const jsonResponse = await response.json(); 
            const {msg, game} = jsonResponse; 
            console.log("ldsjfldsjkf. response: " + Object.keys(jsonResponse)); 
            return ({
                success: true, 
                msg, 
                gameInfo: {
                    id: game.id, 
                    name: game.name, 
                    statementUrl: game.statementUrl, 
                    renderUrl: game.renderUrl
                }
            }) 
        }
        else { 
            return ({
                success: false, 
                msg: await response.text()
            })
        }
    } catch(e: any) { 
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
                gamesInfo: jsonResponse.games.map((game: any) => { 
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
    } catch(e: any) { 
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