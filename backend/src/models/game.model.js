import { Schema, Model } from "mongoose";

const gameSchema = new Schema({
    gameId: {type: Number}, 
    name: {type: String}, 
    statementUrl: {type: String}, 
    judgeUrl: {type: String}, 
    renderUrl: {type: String}
})

const gameModel = newModel('game', gameSchema)
export default gameModel