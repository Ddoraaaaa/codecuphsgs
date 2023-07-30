
const mongoose = require("mongoose");
const { default: ContestController } = require("../../src/controllers/contest.controller");
const ContestService = require("../../src/services/contest.service").default;


describe("Test Contest Service", () => { 
    let ContestModel; 
    let SubmissionModel; 
    beforeAll(async () => {
        // connect mongoose to test database
        mongoose.set('strictQuery', true);
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/codecup_test');
        ContestModel = require("../../src/models/contest.model").ContestModel;
        SubmissionModel = require("../../src/models/submission.model").default; 
    }); 

    beforeEach(async () => { 
        // if there were no await, it will continue dropping after the connection has closed. 
        await ContestModel.deleteMany({}); 
        await SubmissionModel.deleteMany({}); 
    })

    it("TEST DISABLED", async () => { 
        // const contestService = new ContestService(ContestModel); 
        // const submissionService = new SubmissionService(SubmissionModel); 

        // await contestService.createContest({ 
        //     name: "Running Contest", 
        //     startDate: new Date() - 1000000, 
        //     endDate: new Date(Date.now() + 1000000), 
        //     gameId: 1, 
        // }); 

        // await contestService.createContest({ 
        //     name: "Ended, Unjudged Contest", 
        //     startDate: new Date() - 1000000, 
        //     endDate: new Date(Date.now() - 10), 
        //     gameId: 1, 
        // }); 

        // await contestService.createContest({ 
        //     name: "not started Contest", 
        //     startDate: new Date() + 1000000, 
        //     endDate: new Date(Date.now() + 1000000), 
        //     gameId: 1, 
        // }); 

        // const req1 = { 
        //     params: { 
        //         contestId: 1
        //     }
        // }

        // const contestController = new ContestController(contestService, submissionService); 
        // expect(contestController.addSubmission())

    })


    afterAll(async () => {  
        try {
            await mongoose.disconnect(); 
        } catch(e) { 
            console.error(e); 
        }
    })
}); 