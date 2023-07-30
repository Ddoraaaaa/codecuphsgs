import { Schema, model } from "mongoose";

const submissionSchema = new Schema ({ 
    id: {type: Number}, 
    userId: {type: Number}, 
    contestId: {type: String}, 
    submissionDate: {type: Date, default: () => new Date()}, 
    language: {type: String, default: "cpp"}, 
    sourceUrl: {type: String}, 
})

submissionSchema.methods.toJson = function () { 
    return { 
        userId: this.userId, 
        contestId: this.contestId, 
        language: this.language, 
        sourceUrl: this.sourceUrl
    }
}

const SubmissionModel = model('Submission', submissionSchema); 

export default SubmissionModel; 
