const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/codecup')

const app = require("./app")(); 
const endedContestManager = require("./workers/judge.worker"); 



