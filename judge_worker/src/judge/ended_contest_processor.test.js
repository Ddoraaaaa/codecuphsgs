import EndedContestProcessor from "../../src/judge/ended_contest_processor";

const mongoose = require("mongoose");
import ContestService from "../../src/services/contest.service";
import AllVsAllStateMachine from "../../src/judge/contest_state_machine/all_vs_all"
import JudgeAPIWrapper from "../../src/judge/mockJudgeAPIWrapper";

describe("Integrated test: EndedContestProcessor & StateMachines using mock database & mock judge API", () => { 
    let ContestModel; 
    let SubmissionModel; 

    beforeAll(async() => { 
        mongoose.set('strictQuery', true);
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/codecup_test');
        ContestModel = require("../../src/models/contest.model").ContestModel;
        SubmissionModel = require("../../src/models/submission.model").default; 
    })

    beforeEach(async () => {
        await ContestModel.deleteMany({});         
        await SubmissionModel.deleteMany({}); 

    }); 

    it("Test", async() => { 
        const judgeAPIWrapper = new JudgeAPIWrapper(); 
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

        const allVsAllStateMachine = new AllVsAllStateMachine({id: 1}, contestService);
        await allVsAllStateMachine.init(); 

        const endedContestProcessor = new EndedContestProcessor(
            allVsAllStateMachine,
            judgeAPIWrapper
        )
        
        await endedContestProcessor.process();  
        expect(await contestService.getContestResults(1)).toBe(`{"matches":{"1":{"matchId":1,"player1":"1","player2":"2","winner":"2","logUrl":"dummy logurl"},"2":{"matchId":2,"player1":"1","player2":"3","winner":"3","logUrl":"dummy logurl"},"3":{"matchId":3,"player1":"1","player2":"4","winner":"4","logUrl":"dummy logurl"},"4":{"matchId":4,"player1":"1","player2":"5","winner":"5","logUrl":"dummy logurl"},"5":{"matchId":5,"player1":"1","player2":"6","winner":"6","logUrl":"dummy logurl"},"6":{"matchId":6,"player1":"2","player2":"3","winner":"3","logUrl":"dummy logurl"},"7":{"matchId":7,"player1":"2","player2":"4","winner":"4","logUrl":"dummy logurl"},"8":{"matchId":8,"player1":"2","player2":"5","winner":"5","logUrl":"dummy logurl"},"9":{"matchId":9,"player1":"2","player2":"6","winner":"6","logUrl":"dummy logurl"},"10":{"matchId":10,"player1":"3","player2":"4","winner":"4","logUrl":"dummy logurl"},"11":{"matchId":11,"player1":"3","player2":"5","winner":"5","logUrl":"dummy logurl"},"12":{"matchId":12,"player1":"3","player2":"6","winner":"6","logUrl":"dummy logurl"},"13":{"matchId":13,"player1":"4","player2":"5","winner":"5","logUrl":"dummy logurl"},"14":{"matchId":14,"player1":"4","player2":"6","winner":"6","logUrl":"dummy logurl"},"15":{"matchId":15,"player1":"5","player2":"6","winner":"6","logUrl":"dummy logurl"}}}`);
    }); 

    afterAll(async() => { 
        try {
            await mongoose.disconnect(); 
        } catch(e) { 
            console.error(e); 
        }
    })
});