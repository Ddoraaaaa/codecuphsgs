import { Router } from "express";
import * as contestController from "../controllers/contest.controller"
import uploadSourceCodeMiddleware from "../middlewares/uploadSourceCodeMiddleware";

const contestRouter = Router(); 

contestRouter.get("/contest/:contestId/results", contestController.getContestResults)
contestRouter.get("/contests", contestController.getAllContests); 
contestRouter.post("/contests/create", contestController.createContest); 
contestRouter.get("/contest/:contestId/", contestController.getContest); 
contestRouter.delete("/deletecontest", contestController.deleteContest); 
contestRouter.post("/contest/:contestId/submit", uploadSourceCodeMiddleware, contestController.createSubmission);

export default contestRouter; 