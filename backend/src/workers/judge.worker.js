import mongoose from "mongoose";
import { Contest } from "../models/contest.model";
import Submission from "../models/submission.model";
import { Match } from "../models/match.model";
import fs from "fs"
import { createBrackets } from "../services/bracket.service";
import { Bracket } from "../models/bracket.model";

const TIMEOUT = 2000; 
const HOST_URL = "localhost:8000"

// ended contest, but not judged

class BracketManager {
    static MAX_WAITING_NUM = 50; 
    static SUBMIT_TIMEOUT = 1000; 

    constructor() { 
        this.queue = new Map(); 
        this.waitingResult = new Map(); // store the submissionId for submissions that are being judged
        this.start(); 
    }

    handle = (bracket) => { 
        if(!this.queue.has(bracket.id)) { 
            this.queue.set(bracket.id, new Date()); 
        }
    }

    start = () => { 
        this.periodicallySubmit(); 
    }

    async periodicallySubmit () { 
        setTimeout(() => {  
            while(this.waitingResult.size < BracketManager.MAX_WAITING_NUM && this.queue.entries().size > 0) {
                console.log("not empty");  
                this.submitOne(); 
            }
            this.periodicallySubmit(); 
        }, BracketManager.SUBMIT_TIMEOUT)
    }

    submitOne = async () => { 
        const [bracketId, addedDate] = this.queue.entries().next().value;  
        console.log("dmm"); 
        this.submit(bracketId); 
    }

    submit = async (bracketId) => { 
        try {
            const contestId = bracket.contestId; 
            const bracket = Bracket.find({id: bracketId}); 
            if(bracket.matchId == null) { 
                const submission1 = Submission.find({userId: bracketId.player1}).sort({submissionDate: -1})[0]; 
                const submission2 = Submission.find({userId: bracketId.player2}).sort({submissionDate: -1})[0];  
                match = await createMatch(submission1, submission2); 
                bracket.matchId = match.id; 
            }

            const match = Match.find({id: bracket.matchId}); 
            if(match.logUrl == null) { 
                await submitToJudge(bracket, match); 
            }
            else { 
                bracket.judged = true; 
                bracket.save(); 
            }

            this.queue.delete(matchId); 
        } catch(e) { 
            console.log("Error: " + e); 
        }
    }

    submitToJudge = async (bracket, match) => { 

        const formData = new FormData(); 
        const submission1 = Submission.find({id: match.submission1}); 
        const submission2 = Submission.find({id: match.submission2});
        formData.append('player1', fs.readFileSync(submission1.sourceUrl)); 
        formData.append('player2', fs.readFileSync(submission2.sourceUrl)); 

        const response = await fetch(`${HOST_URL}/submit`, { 
            method:"POST", 
            headers:{
                'Content-Type': 'multipart/form-data'
            }, 
            body: formData
        })
        if(!response.ok) { 
            console.log("Error: " + (await response.json()).message); 
        }
        else { 
            const body = await response.json(); 
            console.log("Ok: " + body.message); 
            this.waitingResult.set(body.submission_id, new Date()); 
            this.periodicallyPingResult(bracket, match, body.submission_id);
        }
    }

    periodicallyPingResult = async (bracket, match, submissionId) => { 
         setTimeout(async () => {
            const response = await fetch(`${HOST_URL}/result/${judgeSubmissionId}`); 
            if(response.ok) { 
                console.log("Response: "+ response); 
            }

            this.periodicallyPingResult(bracket, match, submissionId); 
         }), 1000; 
    }
}

async function judgeAllvsAll(contest) { 
    const lastSubmssions = new Map(); 
    await Submission.find({contestId: contest.id}).sort({submissionDate: 1}).forEach(submission => { 
        lastSubmssion.set(submission.userId, submission.id); 
    })
    const lastSubmissionList = Array.from(lastSubmssions.values()); 
    for(let i = 0; i < lastSubmissionList.length; i++) { 
        for(let j = i + 1; j < lastSubmissionList.length; j++) { 
            const submission1 = lastSubmissionList[i]; 
            const submission2 = lastSubmissionList[j];
            if(submission1.id > submission2.id) {  
                [submission1, submission2] = [submission2, submission1]; // swap the two. 
            } 
            let match = await Match.findOne({submission1Id: submission1.id, submission2Id: submission2.id});
            if(!match) { 
                match = new Match({
                    id: await Match.count() + 1, 
                    contestId: contest.id, 
                    submission1Id: submission1.id, 
                    submission2Id: submission2.id, 
                    logUrl: null, 
                })
                match.save(); 
            } 
            
            // no matter it is created of not 
            if(match.logUrl == null) {
                judge(match); 
            }
        }
    }
}

// each 1000s -> fetch all ended but not not in 

const judgeWorker = { 
    listen: async () => { 
        setTimeout(() => { 
            fetchUnjdugedContest(); 
            this.listen(); 
        }, 1000)
    }
}


function completeAlert(){
    console.log('Timer completed');
    return true;
}


class EndedContestManager { 
    constructor() {
        this.bracketManager = new BracketManager(); 
        this.running = false; 
    }

    start () { 
        this.running = true; 
        this.handleUnjudgedBrackets(); 
        this.startWaitingForNewContests(); // perhaps it has not finished initializing, so I cannot call 
    }

    stop() {
        this.running = false; 
    }

    async handleUnjudgedBrackets () { 
        const brackets = await Bracket.find({judge: false}); 
        console.log("Not judged: "); 
        console.log(brackets); 
        brackets.forEach(bracket => { 
            this.handleBracket(bracket); 
        }); 
        console.log("finised handling"); 
    }

    startWaitingForNewContests() { 
        setTimeout(() => { 
            console.log("running"); 
            this.handleUnjudgedBrackets(); 
            if(this.running) {
                this.startWaitingForNewContests(); 
            }
        }, 1000) 
    }

    async handleUnjudgedContests() { 
        const contests = await Contest.find({endDate: {$lte: (new Date()).toISOString()}, judgeMode: 'auto-judge', judged: false}); 
        console.log("unjudged contest: " + contests)
        contests.forEach(contest => { 
            handleContest(contest); 
        }); 
    }

    handleContest = async (contest) => { 
        await createBrackets(contest);
        contest.judged = true; 
        contest.save(); 
    }

    createBrackets = async (contest) => { 
        if(contest.contestFormat == 'all-vs-all') { 
            await createBracketsAllvsAll(contest); 
        }
        else if(contest.contestFormat == 'round-16') { 
            await createBracketsRound16(contest); 
        }
    }

    createBracketsAllvsAll = async (contest) => {
        const players = new Set(); 
        await Submission.find({contestId: contest.id}).sort({submissionDate: 1}).forEach(submission => { 
            players.add(submission.userId); 
        })
        playerList = Array.from(players); 
        const numPlayer = len(playerList); 
        for(let i = 0; i < numPlayer; i++) { 
            for(let j = j + 1; j < numPlayer; j++) {  
                const bracket = createBracket(contest.id, playerList[i], playerList[j]); 
                this.handleBracket(bracket); 
            }
        }
    }

    createBracketsRound16 = async (contest) => { 

    }

    handleBracket = async (bracket) => { 
        BracketManager.handle(bracket); 
    }
}

const endedContestManager = new EndedContestManager(); 
endedContestManager.start(); 

export default endedContestManager; 