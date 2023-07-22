import { Router } from "express";

import { 
    createGame,
    getAllGames,
    getGame 
} from "../services/game.service"

const gameRouter = Router(); 

gameRouter.get("/game/:gameId", getGame); 
gameRouter.get("/games", getAllGames); 
gameRouter.post("/games/create", createGame); 

export { 
    gameRouter
}