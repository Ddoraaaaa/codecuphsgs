import { Router } from "express";

import gameControler from "../controllers/game.controller"

const gameRouter = Router(); 
gameRouter.use((req, res, next) => { 
    next(); 
})

gameRouter.get("/game/:gameId", gameControler.getGame); 
gameRouter.get("/games", gameControler.getAllGames); 
gameRouter.post("/games/create", gameControler.createGame); 

export default gameRouter; 