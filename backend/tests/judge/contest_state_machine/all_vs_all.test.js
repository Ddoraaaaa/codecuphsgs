const mongoose = require("mongoose");
import ContestService from "../../../src/services/contest.service";
import AllVsAllStateMachine from "../../../src/judge/contest_state_machine/all_vs_all"
import JudgeAPIWrapper from "../../../src/judge/mockJudgeAPIWrapper";

describe("Testign All vs All State Machine with mock MongoDB database & real judgeAPIWrapper", () => { 
    let ContestModel; 
    let SubmissionModel; 

    beforeAll(async() => { 
        mongoose.set('strictQuery', true);
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/codecup_test');
        ContestModel = require("../../../src/models/contest.model").ContestModel;
        SubmissionModel = require("../../../src/models/submission.model").default; 
    })

    beforeEach(async () => {
        await ContestModel.deleteMany({});         
        await SubmissionModel.deleteMany({}); 

    }); 

    it("Test", async() => { 
        const contestService = new ContestService(ContestModel, SubmissionModel);
        
        await ContestModel.create({
            id: 1, 
            name: "dummy", 
            finalSubmissions: { 
                1: 11, 
                2: 12, 
                3: 13, 
                4: 14, 
                5: 15, 
                6: 16
            }
        }); 

        // console.log(await contestService.getContest(1)); 
        
        const allVsAllStateMachine = new AllVsAllStateMachine({id: 1}, contestService);
        await allVsAllStateMachine.init();  
        
        await allVsAllStateMachine.updateResult(1, {firstPlayerWin: true, logUrl: "dummy url"})

        // while(await allVsAllStateMachine.hasNextUnjudgedMatch()) { 
        //     console.log(await allVsAllStateMachine.yieldNextUnjudgedMatch()); 
        // }
        expect(await contestService.getContestResults(1)).toBe(`{"matches":{"1":{"matchId":1,"player1":"1","player2":"2","winner":"1","logUrl":"dummy url"}}}`); 
    }); 

    afterAll(async() => { 
        try {
            await mongoose.disconnect(); 
        } catch(e) { 
            console.error(e); 
        }
    })
});