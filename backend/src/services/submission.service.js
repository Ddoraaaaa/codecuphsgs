import SubmissionModel from "../models/submission.model";

async function getSubmission(submissionId) { 
    return (await SubmissionModel.findOne({id: submissionId})).toObject(); 
}

async function createSubmission(contestId, userId, sourceUrl) { 
    const submissionId = await submissionModel.count() + 1; 
    const submissionDocument = await SubmissionModel.create({
        id: submissionId, 
        contestId, 
        userId, 
        sourceUrl
    })
    console.log("submission id: " + submissionId + submissionDocument.id)
    return submissionDocument.toObject();  
}

export { 
    getSubmission, 
    createSubmission
}