import { Router } from "express";

import { 
    getGame 
} from "../services/game.service"

const gameRouter = Router(); 

gameRouter.get("/game/:gameId", getGame); 

export { 
    gameRouter
}