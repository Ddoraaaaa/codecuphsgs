import express from "express";
import cors from "cors"

import sessionMiddleware from "./middlewares/sessionMiddleware";

import upload from "./middlewares/upload";
import { userRouter } from "./routers/user.router";
import { contestRouter } from "./routers/contest.router";
import { gameRouter } from "./routers/game.router";
import sourceCodeUpload from "./middlewares/upload";


function Application() { 
    const app = express();

    app.use(cors()); 

    app.use(sessionMiddleware);

    app.use((req, res, next) => { 
    console.log(req.session); 
    return next(); 
    })

    var bodyParser = require('body-parser');

    // // for parsing application/json
    app.use(bodyParser.json()); 

    // // for parsing application/xwww-
    app.use(bodyParser.urlencoded({ extended: true })); 
    // //form-urlencoded

    // multpart-formdata is handle in endpoint function?

    app.use(express.static('public'));

    app.use((req, res, next) => { 
    console.log(req); 
    next(); 
    })

    app.use(userRouter); 
    app.use(contestRouter); 
    app.use(gameRouter); 

    return app; 
}

module.exports = Application; 
