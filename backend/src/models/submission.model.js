import { Schema, model } from "mongoose";

const submissionSchema = new Schema ({ 
    id: {type: Number}, 
    userId: {type: Number}, 
    contestId: {type: String}, 
    submissionDate: {type: Date}, 
    language: {type: String}, 
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

const Submission = model('Submission', submissionSchema); 

export default Submission; 
