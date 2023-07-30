const mongoose = require("mongoose"); 
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/codecup')

import express from "express";
import cors from "cors"

import sessionMiddleware from "./middlewares/sessionMiddleware";

import { userRouter } from "./routers/user.router";
import { gameRouter } from "./routers/game.router";
import { ContestModel } from "./models/contest.model";
import ContestController from "./controllers/contest.controller"
import ContestService from "./services/contest.service";
import createContestRouter from "./routers/contest.router";
import ContestStateMachineFactory from "./judge/contest_state_machine/factory";
import ContestPostEndingProcessor from "./judge/contest_postending_processor";
import JudgeAPIWrapper from "./judge/mockJudgeAPIWrapper";
import SubmissionModel from "./models/submission.model";
import SubmissionService from "./services/submission.service";

const contestDBService = new ContestService(ContestModel); 
const submissionDBService = new SubmissionService(SubmissionModel); 

const contestController = new ContestController(contestDBService, submissionDBService); 

const contestRouter = createContestRouter(contestController); 

function startServer() { 
    const app = express();

    app.use(cors()); 

    app.use(sessionMiddleware);

    /*
    app.use((req, res, next) => { 
    console.log(req.session); 
    return next(); 
    })
    */

    app.use((req, res, next) => { 
        console.log("debuggin"); 
        next(); 
    })

    var bodyParser = require('body-parser');

    // // for parsing application/json
    app.use(bodyParser.json()); 

    // // for parsing application/xwww-
    app.use(bodyParser.urlencoded({ extended: true })); 
    // //form-urlencoded

    // multpart-formdata is handled in endpoint function?

    app.use(express.static('public'));

    app.use(userRouter); 
    app.use(contestRouter); 
    app.use(gameRouter); 

    app.listen(5000, () => { 
        console.log("server on"); 
    })

    return app; 
}

function startContestPostEndingProcessor() { 
    const judgeAPIWrapper = new JudgeAPIWrapper(); 
    const contestStateMachineFactory = new ContestStateMachineFactory(contestDBService);
    const contestPostEndingProcessor = new ContestPostEndingProcessor(contestStateMachineFactory, judgeAPIWrapper, contestDBService); 
    contestPostEndingProcessor.start(); 
}

startServer(); 
startContestPostEndingProcessor(); 