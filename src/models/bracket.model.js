import { Schema, model } from "mongoose";

const bracketSchema = new Schema({
	contestId: Number,
	currentRound: Number,
	hasRound16: {
        type: Boolean, default: false
    },
	gameId: Number,
	stage: {
        type: Number, 
        default: 1 //1 being qualification, 2 being ro16
    },
	nextRound: Date,
	groups: {
        type: [[Number]], 
        default: new Array(16).fill([]) //16 groups of players
    },
	playerCount: Number,
	players: [Number],
	scores: [Number],
	roundCooldown: Number //miliseconds
})

const Bracket = model('Bracket', bracketSchema)

export default Bracket

