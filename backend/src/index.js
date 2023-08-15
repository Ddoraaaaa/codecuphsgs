
import dotenv from "dotenv"; 

// load env variables
console.log("NODE_ENV: " + process.env.NODE_ENV)

if(process.env.NODE_ENV === "dev") {
    dotenv.config({path: '.env.' + process.env.NODE_ENV})
}

import mongoose from "mongoose"; 

// set mongoose connection before importing services
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI)

import express from "express";
import cors from "cors"
import bodyParser from "body-parser";

import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import requestLoggerMiddleware from "./middlewares/requestLoggerMiddleware.js";

import userRouter from "./routers/user.router";
import gameRouter from "./routers/game.router";
import contestRouter from "./routers/contest.router";

const app = express();

// CORS MIDDLEWARE
app.use(cors()); 

// PARSING REQUESTS
// parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// SESSION MIDDLEWARE
app.use(sessionMiddleware); 

// // REQUEST LOGGER
app.use(requestLoggerMiddleware);

// ROUTERS
app.use(userRouter); 
app.use(contestRouter); 
app.use(gameRouter); 

// START LISTENING
const server = app.listen(5000, () => { 
    console.log("server on"); 
})