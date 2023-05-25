import { Schema, model } from "mongoose";

const contestSchema = new Schema({
	id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
	gameId: {type: Number}, 
	startDate: {type: Date, default: Date.now},
	endDate: {type: Date, default: Date.now},
	isHidden: {type: Boolean, default: false},
	hasRound16: {type: Boolean, default: false}, 
	roundCoolDown: {type: Number}
})

const Contest = model('Contest', contestSchema)
//
export { 
	Contest
}

