import { Router } from "express";

export default function createContestRouter(contestController) { 

    const contestRouter = Router(); 

    contestRouter.get("/contest/:contestId/results", contestController.getContestResultss.bind(contestController))
    contestRouter.get("/contests", contestController.getAllContests.bind(contestController)); 
    contestRouter.post("/contests/create", contestController.createContest.bind(contestController)); 
    contestRouter.get("/contest/:contestId/", contestController.getContest.bind(contestController)); 
    contestRouter.delete("/deletecontest", contestController.deleteContest.bind(contestController)); 
    contestRouter.post("/contest/:contestId/submit", contestController.submitToContest.bind(contestController));

    return contestRouter; 
}