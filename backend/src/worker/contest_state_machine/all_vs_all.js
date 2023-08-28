import contestService from "../../services/contest.service.js";

export default class AllVsAllStateMachine { 
    #contest; 
    #currentState; 
    #result; 

    constructor(contest) { 
        this.#contest = contest; 
    }

    async init() { 
        //restore cached data about the contest from the database
        this.#contest = await contestService.getContest(this.#contest.id); 
        console.log("fetched contest: " + this.#contest.id); 
        this.#restoreCachedState(); 
        this.#restoreCachedResult(); 

        // initialize
        this.#initializeState(); 
        this.#initializeResult(); 
    }

    hasNextUnjudgedMatch() { 
        console.log("finding next match")
        return this.#findClosestUnjudgedMatch() != null; 
    }

    yieldNextUnjudgedMatch() {
        console.log("yielding next match" + this.#contest.id)
        const match = this.#findAndSkipClosestUnjudgedMatch(); 
        return { 
            matchId: match.matchId, 
            submission1: this.#contest.finalSubmissions.get(match.player1), 
            submission2: this.#contest.finalSubmissions.get(match.player2)
        }
    }

    async updateResult(matchId, {firstPlayerWin, logUrl}) { 
        // console.log("matches: " + matchId + " " + Object.keys(this.#currentState.matches)); 
        const match = this.#currentState.matches[matchId]; 
        match.winner = firstPlayerWin? match.player1: match.player2; 
        this.#result.matches[matchId] = {
            ...match, 
            logUrl, 
        }
        await this.#writeCurrentState(); 
        await this.#writeCurrentResult(); 
    }


    #restoreCachedState() { 
        const currentStateString = this.#contest.currentState; 
        if(!currentStateString || currentStateString.length === 0) {
            this.#currentState = {}; 
        }
        else { 
            this.#currentState = JSON.parse(currentStateString); 
        }
    }

    #restoreCachedResult() {
        const resultString = this.#contest.result; 
        if(!resultString || resultString.length === 0) { 
            this.#result = {matches: {}}; 
        }
        else { 
            this.#result = JSON.parse(resultString); 
        }
    }

    #initializeState() { 
        if(this.#currentState.players === undefined) { 
            this.#currentState.players = Array.from(this.#contest.finalSubmissions.keys()); 
        }

        if(this.#currentState.matches === undefined) { 
            this.#currentState.matches = {}; 
            
            const players = this.#currentState.players; 
            this.#currentState.matchCounter = 0; 

            console.log("adding match")

            for(let i = 0; i < players.length; i++) { 
                for(let j = i + 1; j < players.length; j++) {
                    this.#currentState.matchCounter++; 

                    console.log("new match")

                    
                    this.#currentState.matches[this.#currentState.matchCounter] = {
                        matchId: this.#currentState.matchCounter, 
                        player1: players[i], 
                        player2: players[j], 
                    }
                }
            }
        }
        
        // no matter where it is last time, reset it to the beginning. 
        this.#currentState.currentMatchPointer = 1; 
    }

    #initializeResult() { 
        
    }

    #findAndSkipClosestUnjudgedMatch() { 
        const match = this.#findClosestUnjudgedMatch(); 
        if(match == null) { 
            return null; 
        }
        ++this.#currentState.currentMatchPointer; 
        return match; 
    }

    #findClosestUnjudgedMatch() { 
        console.log(this.#currentState.matches)
        while(this.#currentState.currentMatchPointer <= this.#currentState.matchCounter) {
            const match = this.#currentState.matches[this.#currentState.currentMatchPointer]; 
            if(match.winner == null || match.winner == undefined) { 
                console.log("found match"); 
                return match; 
            }
            this.#currentState.currentMatchPointer++; 
        }

        console.log("not found amtch")
        return null; 
    }

    async #writeCurrentState() { 
        await contestService.setCurrentState(this.#contest.id, JSON.stringify(this.#currentState)); 
    }

    async #writeCurrentResult() { 
        await contestService.setContestResults(this.#contest.id, JSON.stringify(this.#result)); 
    }
}