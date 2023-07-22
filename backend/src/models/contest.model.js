import { Schema, model } from "mongoose";

const contestSchema = new Schema({
	id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
	gameId: {type: Number}, 
	startDate: {type: Date, default: Date.now},
	endDate: {type: Date, default: Date.now},
	runTrialMatches: {type: Boolean, default: true}, 
    judgeMode: {type: String, enum: ['manual-judge', 'auto-judge'], default: 'auto-judge'}, 
    contestFormat: {type: String, enum: ['round-16', 'all-vs-all'], default: 'all-vs-all'} , 
	judge: {type: Boolean, default: false}
})

const Contest = model('Contest', contestSchema)
//
export { 
	Contest
}

