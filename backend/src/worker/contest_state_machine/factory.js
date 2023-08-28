import AllVsAllStateMachine from "./all_vs_all.js";

function getStateMachine(contest) { 

    console.log("State machine factory getting state machine for contest: " + contest.id)

    if(contest.contestFormat == "all-vs-all") { 
        return new AllVsAllStateMachine(contest); 
    }
    else { 
        throw new Error("No state machine available")
    }
}

const stateMachineFactory = { 
    getStateMachine
}

export default stateMachineFactory; 