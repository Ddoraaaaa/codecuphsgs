import ContestPostEndingProcessor from "../../src/judge/contest_postending_processor"

// beforeEach(ContestPostEndingProcessor.mockClear()); 

describe("testing ContestPostEndingProcessor", () => {

    it("Test ContestPostEndingProcessor", async () => { 
        function mockEndedContest(name) { 
            this.name = name; 
            this.endDate = new Date().toISOString(); 
            this.judged = false;
        }

        const dummyContestList = [new mockEndedContest('dummy 1'), new mockEndedContest('dummy 2')]; 

        const mockStateMachine = { 
            hasNextUnjudgedMatch: () => false, 
            getNextUnjudgedMatch: () => null
        }

        const mockStateMachineFactory = { 
            getStateMachine: jest.fn().mockImplementation(() => { 
                return mockStateMachine
            })
        }

        const mockAPIwrapper = { 

        }

        const contestDBService = { 
            getAllEndedUnjudgedContest: jest.fn()
        }
        contestDBService.getAllEndedUnjudgedContest.mockReturnValue(dummyContestList); 

        const contestPostEndingProcessor = new ContestPostEndingProcessor(mockStateMachineFactory, mockAPIwrapper, contestDBService);
        
        await contestPostEndingProcessor.start(); 
        
        // const processContestCalls = mockEndedContestProcessor.process.mock.calls; 
        // expect(mockEndedContestProcessor.process.mock.calls).toHaveLength(dummyContestList.length); 
        // for(let i = 0; i < dummyContestList.length; i++) {
        //     expect(processContestCalls[i]).toHaveLength(1);
        //     expect(processContestCalls[i][0]).toBe(dummyContestList[i]);
        // }
    })
}); 