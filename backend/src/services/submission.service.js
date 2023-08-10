export default class SubmissionService { 
    #submissionModel; 
    
    constructor(submissionModel) { 
        this.#submissionModel = submissionModel;
    }

    async getSubmission(submissionId) { 
        return (await this.#submissionModel.findOne({id: submissionId})).toObject(); 
    }

    async createSubmission(contestId, userId, sourceUrl) { 
        const submissionId = await this.#submissionModel.count() + 1; 
        const submissionDocument = await this.#submissionModel.create({
            id: submissionId, 
            contestId, 
            userId, 
            sourceUrl
        })
        console.log("submission id: " + submissionId + submissionDocument.id)
        return submissionDocument.toObject();  
    }
}