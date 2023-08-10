import mongoose from "mongoose";
import { Contest } from "../models/contest.model";
import Submission from "../models/submission.model";
import { Match } from "../models/match.model";
import fs from "fs"
import { createBrackets } from "../services/bracket.service";
import { Bracket } from "../models/bracket.model";

const HOST_URL = "localhost:8000"

// ended contest, but not judged

// class BracketManager {
//     static MAX_WAITING_NUM = 50; 
//     static SUBMIT_TIMEOUT = 1000; 

//     constructor() { 
//         this.queue = new Map(); 
//         this.waitingResult = new Map(); // store the submissionId for submissions that are being judged
//         this.start(); 
//     }

//     handle = (bracket) => { 
//         if(!this.queue.has(bracket.id)) { 
//             this.queue.set(bracket.id, new Date()); 
//         }
//     }

//     start = () => { 
//         this.periodicallySubmit(); 
//     }

//     async periodicallySubmit () { 
//         setTimeout(() => {  
//             while(this.waitingResult.size < BracketManager.MAX_WAITING_NUM && this.queue.entries().size > 0) {
//                 console.log("not empty");  
//                 this.submitOne(); 
//             }
//             this.periodicallySubmit(); 
//         }, BracketManager.SUBMIT_TIMEOUT)
//     }

//     submitOne = async () => { 
//         const [bracketId, addedDate] = this.queue.entries().next().value;  
//         console.log("dmm"); 
//         this.submit(bracketId); 
//     }

//     submit = async (bracketId) => { 
//         try {
//             const contestId = bracket.contestId; 
//             const bracket = Bracket.find({id: bracketId}); 
//             if(bracket.matchId == null) { 
//                 const submission1 = Submission.find({userId: bracketId.player1}).sort({submissionDate: -1})[0]; 
//                 const submission2 = Submission.find({userId: bracketId.player2}).sort({submissionDate: -1})[0];  
//                 match = await createMatch(submission1, submission2); 
//                 bracket.matchId = match.id; 
//             }

//             const match = Match.find({id: bracket.matchId}); 
//             if(match.logUrl == null) { 
//                 await submitToJudge(bracket, match); 
//             }
//             else { 
//                 bracket.judged = true; 
//                 bracket.save(); 
//             }

//             this.queue.delete(matchId); 
//         } catch(e) { 
//             console.log("Error: " + e); 
//         }
//     }



//     periodicallyPingResult = async (bracket, match, submissionId) => { 
//          setTimeout(async () => {
//             const response = await fetch(`${HOST_URL}/result/${judgeSubmissionId}`); 
//             if(response.ok) { 
//                 console.log("Response: "+ response); 
//             }

//             this.periodicallyPingResult(bracket, match, submissionId); 
//          }), 1000; 
//     }
// }

// // each 1000s -> fetch all ended but not not in 