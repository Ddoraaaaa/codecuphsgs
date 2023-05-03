import { Router } from "express";
import { User } from "../models/user.model"

async function createUser(req, res, next) { 
    let username = req.body.username; 
    let email = req.body.email;
    let password = req.body.password; 
    
    if((!username && !email) || !password) { 
        return res.status(401).send("Missing information"); 
    }

    if(await User.findOne({username})) { 
        return res.status(401).send("Username already exists"); 
    }

    if(await User.findOne({email})) { 
        return res.status(401).send("Email aready exists"); 
    }

    let user = await User.create({ 
        username: username, 
        password: password, 
        email: email
    })

    if(!user) { 
        return res.status(401).send("Failed for some reason"); 
    }

    return res.status(200).send("Registered")
}

async function getUser(req, res, next) { 
    const username = req.body.username; 
    const email = req.body.email; 
    user = username? await User.findOne({username}): await User.findOne({email}); 
    if(!user) { 
        return raiseError("Cannot find user"); 
    }
    res.body.user = user.toJson(); 
    
    return next; 
}

// async function getAllUsers(req, res, next) { 
//     try { 
    
//     }
// }

export { 
    createUser
    // getUser, 
    // getAllUsers
    
}