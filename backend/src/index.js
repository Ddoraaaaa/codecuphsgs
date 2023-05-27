import express from "express";
import mongoose from "mongoose";
import cors from "cors"

// import sessionMiddleware from "./middlewares/sessionMiddleware";
import session from "express-session";
const MongoDBStore = require("connect-mongodb-session")(session);

import upload from "./middlewares/upload";
import { userRouter } from "./routers/user.router";
import { contestRouter } from "./routers/contest.router";
import { gameRouter } from "./routers/game.router";
import sourceCodeUpload from "./middlewares/upload";

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/codecup')

const app = express();

app.use(cors()); 

const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/codecup",
  collection: "sessions"
}); 
var sessionMiddleware = session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
})

app.use(sessionMiddleware);

app.use((req, res, next) => { 
  console.log(req.session); 
  return next(); 
})

var bodyParser = require('body-parser');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// multpart-formdata is handle in endpoint function?

app.use(express.static('public'));

app.use(userRouter); 
app.use(contestRouter); 
app.use(gameRouter); 

app.get("/", (req, res, next) => { 
  return res.status(200).send("server reached"); 
})

app.listen(5000, () => {
    console.log("tao da song");
})