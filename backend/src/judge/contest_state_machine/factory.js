import AllVsAllStateMachine from "./all_vs_all";
import Round16StateMachine from "./round_16";

export default class ContestStateMachineFactory { 
    #contestDBService; 

    constructor(contestDBService) {
        this.#contestDBService = contestDBService; 
    }

    getStateMachine(contest) { 
        if(contest.contestFormat == "all-vs-all") { 
            return new AllVsAllStateMachine(contest, this.#contestDBService); 
        }
        else { 
            return new Round16StateMachine(contest, this.#contestDBService); 
        }
    }
}