import { Schema, model } from "mongoose";

const matchSchema = new Schema({
    id: {type: Number}, 
    contestId: {type: Number}, 
    submission1Id: {type: Number}, 
    submission2Id: {type: Number}, 
    logUrl: {type: String, default: null}
})


const Match = model('match', matchSchema)

export  {Match}; 
