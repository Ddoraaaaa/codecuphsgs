import { model, Schema } from "mongoose";

const bracketSchema = new Schema({
    id: {type: Number}, 
    contestId: {type: Number}, 
    player1: {type: Number}, 
    player2: {type: Number}, 
    matchId: {type: Number}, 
    judged: {type: Boolean, default: false}
})

const Bracket = model('Bracket', bracketSchema);

export { 
	Bracket
}