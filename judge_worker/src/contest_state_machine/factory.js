import AllVsAllStateMachine from "./all_vs_all";
import Round16StateMachine from "./round_16";

export default class ContestStateMachineFactory { 
    #contestDBService; 

    constructor(contestDBService) {
        this.#contestDBService = contestDBService; 
    }

    getStateMachine(contest) { 

        console.log("getting state for " + contest.id)

        if(contest.contestFormat == "all-vs-all") { 
            return new AllVsAllStateMachine(contest, this.#contestDBService); 
        }
        else { 
            throw new Error("No state machine available")
            // return new Round16StateMachine(contest, this.#contestDBService); 
        }
    }
}