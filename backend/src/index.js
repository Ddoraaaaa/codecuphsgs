import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors"
import { userRouter } from "./routers/user.router";
import { contestRouter } from "./routers/contest.router";

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/codecup')

const app = express();

const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/codecup",
    collection: "sessions"
}); 

app.use(cors()); 

app.use(require('express-session')({
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
  }));

var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(req.session.userId.toString())
    cb(null, 'userId-' + req.session.userId.toString() + '_' + file.originalname)
  }
})

var upload = multer({ storage: storage })

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.single('sourceFile')); 
app.use(express.static('public'));

app.use(userRouter); 
app.use(contestRouter); 

app.get("/", (req, res, next) => { 
  return res.status(200).send("server reached"); 
})

app.listen(5000, () => {
    console.log("tao da song");
})