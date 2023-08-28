import EndedContestProcessor from "../../src/judge/ended_contest_processor";

const mongoose = require("mongoose");
import ContestService from "../../../backend/src/services/contest.service";
import AllVsAllStateMachine from "../../src/judge/contest_state_machine/all_vs_all"
import JudgeAPIWrapper from "../../src/judge/judgeAPIWrapper";
import SubmissionService from "../../../backend/src/services/submission.service";

describe("Integrated test: Judge API using mock database & mock API", () => { 
    let SubmissionModel; 

    beforeAll(async() => { 
        mongoose.set('strictQuery', true);
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/codecup_test');
        SubmissionModel = require("../../../backend/src/models/submission.model").default; 
    })

    beforeEach(async () => {
        await SubmissionModel.deleteMany({}); 
    }); 

    it("Test", async() => { 
        const JUDGE_URL = "http://localhost:8000"
        const submissionService = new SubmissionService(SubmissionModel); 

        const judgeAPIWrapper = new JudgeAPIWrapper(JUDGE_URL, submissionService); 
        
        const submission1 = await submissionService.createSubmission(1, 1, "/Users/hoanggiapvu/Documents/codecuphsgs/backend/mock_source_code/player1.cpp"); 
        console.log(submission1); 
        const submission2 = await submissionService.createSubmission(1, 1, "/Users/hoanggiapvu/Documents/codecuphsgs/backend/mock_source_code/player2.cpp"); 


        const {firstPlayerWin, logUrl} = await judgeAPIWrapper.submit(submission1.id, submission2.id); 
        console.log(firstPlayerWin + " " + logUrl); 
    }); 

    afterAll(async() => { 
        try {
            await mongoose.disconnect(); 
        } catch(e) { 
            console.error(e); 
        }
    })
});