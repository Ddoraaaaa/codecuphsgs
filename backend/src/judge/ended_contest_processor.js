'use strict'; 

export default class EndedContestProcessor { 
    #contestStateMachine ; 
    #judgeAPIWrapper; 

    constructor(contestStateMachine, judgeAPIWrapper) { 
        this.#contestStateMachine = contestStateMachine; 
        this.#judgeAPIWrapper = judgeAPIWrapper; 
    }

    async process() { 
        const promises = []; 
        console.log(Object.keys(this.#contestStateMachine))
        while(await this.#contestStateMachine.hasNextUnjudgedMatch()) {
            console.log("dljsdldflkfjldjfdlkjfdklfj"); 
            // put this on hold until there is a new match
            const {matchId, submission1, submission2} = await this.#contestStateMachine.yieldNextUnjudgedMatch();
             
            
            // once there is a new match, call #submit, but does not wait 
            // for it to complete
            promises.push(this.#submit(matchId, submission1, submission2)); 
        }
        try {
            const x = await Promise.all(promises); 
            console.log("finished processing");
        } catch(e) { 
            console.error("Waiting for all promises does not work. " + e); 
        } 
    }

    async #submit(matchId, submission1, submission2) { 
        // console.log(matchId + " " + submission1 + " " +submission2); 

        // hold until there is result for the match. In the mean time, switch back to 
        // handle contests to handle new matches
        const result = await this.#judgeAPIWrapper.submit(submission1, submission2);
        // console.log("resuls: " + result); 
        await this.#contestStateMachine.updateResult(matchId, result); 
        console.log("submitting & updating finished"); 
    }
}