import User from "../models/user.model";
const bcrypt = require("bcrypt"); 

async function createSession(req, res, next) { 
    let username = req.body.username; 
    let password = req.body.password; 
    let email = req.body.email; 


    if((!username && !email) || !password) { 
        return res.status(500).send("Missing information"); 
    }
    
    const user = username? await User.findOne({username}): await User.findOne({email})
    if(!user) { 
        return res.status(404).send("User not found"); 
    }

    if(user.password != bcrypt(password)) { 
        return res.status(404).send("Wrong password"); 
    }

    req.session.userId = user.id; 
    return res.status(200).send("logged in"); 
}

async function endSession(req, res, next) { 
    if(!req.session.id) { 
        return res.status(401).send({msg:"not logged in"})
    }

    req.session.userid = null; 
    return res.status(200).send({msg: "logged out"}); 
}

async function requireSelf(req, res, next) { 
    if(!req.session.userId || req.session.userId != req.body.userId) { 
        return res.status(401).send({msg: "unauthorized access"})
    }

    return next(); 
}

async function requireAdmin(req, res, next) { 
    let user = await User.findOne({id: req.body.userId}); 

    if (!user) { 
        return res.status(404).send({msg: "User not found"});
    }

    if(req.body.userId != req.session.userId || !user.isAdmin) { 
        return res.status(401).send({msg: "Unauthorized access"})
    }

    return next();
}

export { 
    createSession, 
    endSession, 
    requireSelf, 
    requireAdmin
}