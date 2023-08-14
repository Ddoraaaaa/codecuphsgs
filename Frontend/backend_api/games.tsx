import { type } from "os";
import UnknownInternalError from "./errors/unknownInternalError";
import ValidationError from "./errors/validationError";
import validateResponse from "./validation_utils/validateResponse"

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
}) {
    if(typeof name !== "string") { 
        throw new ValidationError("name is not string"); 
    }

    if(typeof statementUrl !== "string") { 
        throw new ValidationError("statementUrl is not string"); 
    }

    if(typeof renderUrl !== "string") { 
        throw new ValidationError("renderUrl is not string"); 
    }
    
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

    const {status, body} = await validateResponse(response); 
}

async function getGameInfo(
    gameId: number
): Promise<GameInfoI> {

    if(typeof gameId != "number") { 
        throw new ValidationError("type of gameId is not number"); 
    }

    const response = await fetch(`/api/game/${gameId}`); 

    const {status, body} = await validateResponse(response); 

    try { 
        const game = body.game; 
        return {
                id: game.id, 
                name: game.name, 
                statementUrl: game.statementUrl, 
                renderUrl: game.renderUrl
        }
    } 
    catch(error: any) {
        console.error("Unknown error at get game API: " + error); 
        throw new UnknownInternalError(); 
    }
}

async function getAllGamesInfo(): Promise<Array<GameInfoI>>{
    const response = await fetch(`/api/games`, { // hudge mistake: api/games -> /api/games!!!!!
        method: "GET"
    }); 
    
    const {status, body} = await validateResponse(response); 

    try { 
        return body.games.map((game: any) => { 
            return { 
                id: game.id, 
                name: game.name, 
                statementUrl: game.statementUrl, 
                ...(game.judgeUrl != undefined && {
                    judgeUrl: game.judgeUrl
                }), 
                renderUrl: game.renderUrl
            }
        });
    } catch(error: any) { 
        console.error("Unknown error at get all games API: " + error); 
        throw new UnknownInternalError(); 
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