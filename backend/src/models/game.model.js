import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    gameId: {type: Number}, 
    name: {type: String}, 
    statementUrl: {type: String}, 
    judgeUrl: {type: String}, 
    renderUrl: {type: String}
})

const gameModel = model('game', gameSchema)
export { 
    gameModel
}