import assert from "assert";
import SubmissionModel from "../models/submission.model";
import ServiceError from "./errors/serviceError";
import { MongooseError } from "mongoose";
import DatabaseError from "./errors/databaseError";
import UnknownInternalError from "./errors/unknownInternalError";

async function getSubmission({submissionId}) { 
    return (await SubmissionModel.findOne({id: submissionId})).toObject(); 
}

async function createSubmission({contestId, userId, sourceUrl}) { 
    // validate inputs
    if(isNaN(contestId)) { 
        console.log("type of contestId" + typeof(contestId))
        throw new ServiceError("contestId (" + contestId + ") is not a number"); 
    }
    if(isNaN(userId)) { 
        throw new ServiceError("userId is not a number"); 
    }
    if(typeof sourceUrl != "string") { 
        throw new ServiceError("sourceUrl is not a string"); 
    }

    try {
        const submissionId = await SubmissionModel.count() + 1; 
        const submissionDocument = await SubmissionModel.create({
            id: submissionId, 
            contestId, 
            userId, 
            sourceUrl
        }); 
        console.log("submission id: " + submissionId + submissionDocument.id)
        return submissionDocument.toObject();  
    } 
    catch(err) { 
        console.err("Error at createSubmissionService: " + err); 

        if(err instanceof MongooseError) { 
            throw new DatabaseError("Database error"); 
        }
        else { 
            throw new UnknownInternalError(); 
        }
    }
}

export { 
    getSubmission, 
    createSubmission
}