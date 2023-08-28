'use strict'; 

import judgeAPIWrapper from "./judgeAPIWrapper.js";

export default class EndedContestProcessor { 
    #contestStateMachine; 

    constructor(contestStateMachine) { 
        this.#contestStateMachine = contestStateMachine; 
    }

    async process() { 
        console.log("Contest processor processing contest")

        await this.#contestStateMachine.init(); 
        const promises = []; 
        while(await this.#contestStateMachine.hasNextUnjudgedMatch()) {
            // put this on hold until there is a new match
            const {matchId, submission1, submission2} = await this.#contestStateMachine.yieldNextUnjudgedMatch();
             
            
            // once there is a new match, call #submit, but does not wait 
            // for it to complete
            promises.push(this.#submit(matchId, submission1, submission2)); 
        }
        try {
            await Promise.all(promises); 
        } catch(e) { 
            console.error("Waiting for all promises does not work. " + e); 
        } 
    }

    async #submit(matchId, submission1, submission2) { 
        // console.log(matchId + " " + submission1 + " " +submission2); 

        // hold until there is result for the match. In the mean time, switch back to 
        // handle contests to handle new matches
        const result = await judgeAPIWrapper.submit(submission1, submission2);
        await this.#contestStateMachine.updateResult(matchId, result); 
    }
}