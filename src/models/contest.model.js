import { Schema, model } from "mongoose";

const contestSchema = new Schema({
	contestId: {type: Number},
    name: {type: String},
	isHidden: {type: Boolean, default: false},
	startDate: {type: Date, default: Date.now},
	endDate: {type: Date, default: Date.now},
	gameId: {type: Number}
})

const Contest = model('Contest', contestSchema)

export default Contest

