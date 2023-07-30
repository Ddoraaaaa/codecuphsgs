const mongoose = require("mongoose");
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

    it("Test ContestService.createContest", async () => { 
        const contestService = new ContestService(ContestModel, SubmissionModel); 
        await contestService.createContest({ 
            name: "new Contest", 
        })
    })

    it("Test ContestService.getAllEndedUnjudgedContest", async() => { 
        const contestService = new ContestService(ContestModel, SubmissionModel); 
        await contestService.createContest({ 
            name: "Running Contest", 
            startDate: new Date() - 1000000, 
            endDate: new Date(Date.now() + 1000000), 
            gameId: 1, 
        })
        await contestService.createContest({ 
            name: "Ended, Unjudged Contest", 
            startDate: new Date() - 1000000, 
            endDate: new Date(Date.now() - 10), 
            gameId: 1, 
        })
        await contestService.createContest({ 
            name: "not started Contest", 
            startDate: new Date() + 1000000, 
            endDate: new Date(Date.now() + 1000000), 
            gameId: 1, 
        })
        await contestService.createContest({ 
            name: "Ended, Judged Contest", 
            startDate: new Date() - 1000000, 
            endDate: new Date(Date.now() - 10), 
            gameId: 1, 
            judged: true
        })
        const contests = await contestService.getAllEndedUnjudgedContest(); 
        expect(contests).toHaveLength(1); 
        expect(contests[0].name).toBe("Ended, Unjudged Contest"); 

    })

    it("Testing setting and getting current state", async() => { 
        const contestService = new ContestService(ContestModel, SubmissionModel); 
        await contestService.createContest({ 
            name: "Ended Contest", 
            startDate: new Date() - 1000000, 
        })
        await(contestService.setCurrentState(1, "abc"));  
        expect(await contestService.getCurrentState(1)).toBe("abc"); 
    }); 

    afterAll(async () => {  
        try {
            await mongoose.disconnect(); 
        } catch(e) { 
            console.error(e); 
        }
    })
}); 