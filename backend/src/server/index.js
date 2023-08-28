import express from "express";
import cors from "cors"
import bodyParser from "body-parser";

import sessionMiddleware from "../middlewares/sessionMiddleware.js";
import requestLoggerMiddleware from "../middlewares/requestLoggerMiddleware.js";

import userRouter from "../routers/user.router.js";
import gameRouter from "../routers/game.router.js";
import contestRouter from "../routers/contest.router.js";

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

export default app; 