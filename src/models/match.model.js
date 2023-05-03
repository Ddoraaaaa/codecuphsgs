import { Schema, Model } from "mongoose";

const matchSchema = new Schema({
    matchId: {type: Number}, 
    gameId: {type: Number}, 
    player1: {type: Number}, 
    player2: {type: Number}, 
    logUrl: {type: String}
})

const match = new Model('match', matchSchema)

export default match
