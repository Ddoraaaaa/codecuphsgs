import { Router } from "express";

import { 
    createGame,
    getAllGames,
    getGame 
} from "../services/game.service"

const gameRouter = Router(); 
gameRouter.use((req, res, next) => { 
    console.log("dlfjsdljfdslfjdsljfdkjdfk"); 
    next(); 
})

gameRouter.get("/game/:gameId", getGame); 
gameRouter.get("/games", getAllGames); 
gameRouter.post("/games/create", createGame); 

export default gameRouter; 