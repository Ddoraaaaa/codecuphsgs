import { MongooseError } from "mongoose";
import ContestModel from "../models/contest.model";
import * as submissionService from "../services/submission.service" 
import ServiceError from "./errors/serviceError";
import ValidationError from "./errors/validationError";
import DatabaseError from "./errors/databaseError";
import UnknownInternalError from "./errors/unknownInternalError";

async function getAllEndedUnjudgedContest() { 
    return Array.from(
            await ContestModel.find({judged: false, endDate: {$lte: new Date().toISOString()}})
        ).map(contestDocument => contestDocument.toObject()); 
}

/*
    returns array of all contests in the database. 
*/
async function getAllContests() { 
    return Array.from(await ContestModel.find())
        .map(contestDocument => contestDocument.toObject()); 
}

/*
    return {success: boolean, error: undefined | string, insertedContest: undefined | object}
*/
async function createContest(contest) {
    let reformattedContest = {
        id: await ContestModel.count() + 1, 
        name: contest.name, 
        startDate: contest.startDate, 
        endDate: contest.endDate, 
        gameId: contest.gameId, 
        runTrialMatches: contest.runTrialMatches, 
        judgeMode: contest.judgeMode, 
        contestFormat: contest.contestFormat
    }
    
    if(contest.judged != undefined) { 
        console.warn("Contest is marked as judged / unjudged!!!!"); 
        reformattedContest.judged = contest.judged; 
    }

    try {
        let insertedContest = await ContestModel.create(reformattedContest); 
        return insertedContest; 
    } catch (e) { 
        throw new Error("Failed at creating ")
    }
}

async function getContest(contestId) { 
    const contestDocument = await ContestModel.findOne({id: contestId});
    return contestDocument.toObject(); 
}

async function deleteContest(contestId) { 
    let contestFoundCount = await ContestModel.count({id: contestId})
    assert( contestFoundCount <= 1); 
    if(contestFoundCount == 0) { 
        return res.status(401).send({msg:"No contest found"}); 
    }

    let {acknowledged, deletedCount} = await contestModel.deleteMany({id: contestId}); 
    assert(deletedCount == 1); 
}

async function isContestActive(contestId) { 
    const contestDocument = await ContestModel.findOne({id: contestId}); 
    const currentDate = new Date().toISOString(); 
    if(contestDocument.endDate < currentDate || contestDocument.startDate > currentDate) { 
        return false; 
    }
    return true; 
} 

async function createSubmission({
    contestId, 
    userId, 
    sourceUrl
}) { 
    if(isNaN(contestId)) { 
        throw new ServiceError("Contest Id is not a number"); 
    }

    if(isNaN(userId)) { 
        throw new ServiceError("UserId is not a number"); 
    }

    if(typeof sourceUrl != "string") { 
        throw new ServiceError("soureUrl is not a string"); 
    }

    if(!isContestActive(contestId)) { 
        throw new ValidationError("Invalid request: contest is not active"); 
    }

    try { 
        const insertedSubmission = await submissionService.createSubmission({
            contestId, 
            userId, 
            sourceUrl
        }); ; 

        await setFinalSubmission({contestId, userId, submissionId: insertedSubmission.id}); 
    } 
    catch(err) {
        console.error("Error at createSubmission service: " + err); 
        if(err instanceof MongooseError) { 
            throw new DatabaseError("Database error"); 
        }
        else { 
            throw new UnknownInternalError(); 
        }
    }
}

async function getFinalSubmission(contestId, userId) { 
    const contestDocument = await ContestModel.findOne({id: contestId});
    return contestDocument.finalSubmissions.get((userId).toString()); 
}

async function setFinalSubmission({contestId, userId, submissionId}) { 
    try {
        await ContestModel.updateOne(
            {id: submissionId, userId: userId, contestId: contestId}, 
            { $set: {[`finalSubmissions.${userId}`]: submissionId}}); // finalSumissions.11 = finalSubmissions["11"]? 
        console.warn("This syntax still needs investigation"); 
        return true; 
    } catch(e) { 
        console.error(e); 
        return false; 
    }
}

async function getContestResults(contestId) { 
    console.log(contestId); 
    const contest = await ContestModel.findOne({id: contestId}); 
    return contest.result; 
}

async function setContestResults(contestId, result) { 
    try {
        const contest = await ContestModel.findOne({id: contestId})
        contest.result = result; 
        await contest.save(); 
    } catch(e) { 
        console.error(e); 
        return false; 
    }
}

async function getCurrentState(contestId) { 
    const contestDocument = await ContestModel.findOne({id: contestId}); 
    return contestDocument.currentState; 
}

async function setCurrentState(contestId, currentStateString) { 
    await ContestModel.updateOne({id: contestId}, {currentState: currentStateString}); 
}

export { 
    getAllEndedUnjudgedContest, 
    getAllContests, 
    createContest, 
    getContest, 
    deleteContest, 
    isContestActive, 
    createSubmission, 
    getFinalSubmission, 
    setFinalSubmission, 
    getContestResults, 
    setContestResults, 
    getCurrentState, 
    setCurrentState
}