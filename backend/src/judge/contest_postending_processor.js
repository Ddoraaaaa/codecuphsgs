'use strict';
import EndedContestProcessor from "./ended_contest_processor";

 

export default class ContestPostEndingProcessor { 
    static TIME_DELTA = 10;

    #contestStateMachineFactory; 
    #judgeAPIWrapper; 
    #contestDBService; 

    constructor(contestStateMachineFactory, judgeAPIWrapper, contestDBService) { 
        this.#contestStateMachineFactory = contestStateMachineFactory;
        this.#judgeAPIWrapper = judgeAPIWrapper; 
        this.#contestDBService = contestDBService; 
    }

    async start() { 
        await this.#handleEndedUnjudgedContestsFromDB(); 
    }

    subscribe(contest) { 
        setTimeout(() => { 
            this.#handleEndedUnjudgedContest(contest); 
        }, TIME_DELTA + (contest.endDate - new Date())); 
    }

    async #handleEndedUnjudgedContestsFromDB() { 
        const contests = await this.#contestDBService.getAllEndedUnjudgedContest(); 

        for(const contest of contests) { 
            await this.#handleEndedUnjudgedContest(contest); 
        }
    }

    async #handleEndedUnjudgedContest(contest) {  
        console.log("handling contest: " + contest.id)

        const endedContestProcessor = new EndedContestProcessor(
            this.#contestStateMachineFactory.getStateMachine(contest), 
            this.#judgeAPIWrapper
        )
        this.#checkHasEnded(contest); 
        this.#checkUnjudged(contest); 

        await endedContestProcessor.process(contest); 
    }

    #checkHasEnded(contest) { 
        const currentDate = new Date().toISOString(); 
        if(contest.endDate > currentDate) { 
            throw new Error("Contest has not ended. End date: " + contest.endDate + ". Current date: " + currentDate); 
        }
    }

    #checkUnjudged(contest) { 
        if(contest.judged === true) { 
            throw new Error("contest has been judged"); 
        }
    }
}