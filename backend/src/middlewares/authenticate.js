import {User} from "../models/user.model";
import { userInfoRestrictedView } from "../services/user.service";
const bcrypt = require("bcrypt"); 

async function createSession(req, res, next) {
    console.log(req.session)
    
    let username = req.body.username; 
    let password = req.body.password; 
    let email = req.body.email; 


    if((!username && !email) || !password) { 
        return res.status(401).send({msg: "Missing information"}); 
    }

    const user = username? await User.findOne({username}): await User.findOne({email})
    if(!user) {
        return res.status(401).send({msg: "User not found"}); 
    }

    if((await bcrypt.compare(password, user.password)) == false) { 
        return res.status(401).send({
            msg: "Wrong password", 
        }); 
    }

    console.log(user)

    req.session.userId = user.id; 
    req.session.isAdmin = user.isAdmin
    console.log("after update: ")
    console.log(req.session)
    console.log(user.id)
    return res.status(200).send({
        msg: "logged in", 
        user: userInfoRestrictedView(user)
    }); 
}

async function endSession(req, res, next) { 
    console.log("recieved log out request"); 
    if(!req.session.id) { 
        return res.status(401).send({msg:"not logged in"})
    }

    req.session.destroy(); 
    return res.status(200).send({msg: "logged out"}); //
}

export { 
    createSession, 
    endSession, 
}