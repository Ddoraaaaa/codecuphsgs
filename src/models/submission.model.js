import { Schema, Model } from "mongoose";

const submissionSchema = new Schema ({ 
    userId: {type: String}, 
    contestId: {type: String}, 
    language: {type: String}, 
    sourceUrl: {type: String}
})

submissionSchema.methods.toJson = function () { 
    return { 
        userId: this.userId, 
        contestId: this.contestId, 
        language: this.language, 
        sourceUrl: this.sourceUrl
    }
}

const Submission = new Model('Submission', submissionSchema)

export default Submission
