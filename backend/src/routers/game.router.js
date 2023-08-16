import { Router } from "express";

import { 
    createGame,
    getAllGames,
    getGame 
} from "../controllers/game.controller.js"

const gameRouter = Router(); 
gameRouter.use((req, res, next) => { 
    next(); 
})

gameRouter.get("/game/:gameId", getGame); 
gameRouter.get("/games", getAllGames); 
gameRouter.post("/games/create", createGame); 

export default gameRouter; 