import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    id: {type: Number, required: true}, 
    name: {type: String, required: true}, 
    statementUrl: {type: String, required: true}, 
    judgeUrl: {type: String}, 
    renderUrl: {type: String, required: true}, 
})

const GameModel = model('game', gameSchema)
export default GameModel; 