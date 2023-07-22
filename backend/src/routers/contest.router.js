import { Router } from "express";

import { 
    createContest, 
    getAllContests, 
    getContest, 
    deleteContest, 
    submitToContest, 
} from "../services/contest.service"

const contestRouter = Router(); 

contestRouter.post("/createcontest", createContest); 

contestRouter.get("/contests", getAllContests); 
contestRouter.post("/contests/create", createContest)
contestRouter.get("/contest/:contestId", getContest); 
contestRouter.delete("/deletecontest", deleteContest); 
contestRouter.post("/contest/:contestId/submit", submitToContest);

export { 
    contestRouter
}