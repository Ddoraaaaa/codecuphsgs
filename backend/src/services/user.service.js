import { User } from "../models/user.model"
import bcrypt from "bcrypt"
async function createUser(req, res, next) { 
    let username = req.body.username; 
    let email = req.body.email;
    let password = req.body.password; 

    console.log(req.body)
    
    if((!username && !email) || !password) { 
        return res.status(401).send({msg: "Missing information"}); 
    }

    if(await User.findOne({username})) { 
        return res.status(401).send({msg: "Username already exists"}); 
    }

    if(await User.findOne({email})) { 
        return res.status(401).send({msg: "Email aready exists"}); 
    }

    let user = await User.create({ 
        id: await User.count() + 1, 
        username: username, 
        password: await bcrypt.hash(password, 10), 
        email: email
    })

    if(!user) { 
        return res.status(401).send({msg: "Failed for some reason"} ); 
    }

    return res.status(200).send({
        msg: "Registered", 
        user: userInfoRestrictedView(user)
    })
}

function userInfoRestrictedView(user) { 
    return {
        id: user.id, 
        username: user.username,
        email: user.email, 

        name: user.name, 
        isAdmin: user.isAdmin, 
        contests: user.contests
    }
}

function userInfoUnrestrictedView(user) { 
    return {
        id: user.id, 
        username: user.username,
        email: user.email, 

        name: user.name, 
        isAdmin: user.isAdmin, 
        contests: user.contests
    }
}

async function getUser(req, res, next) { 
    let userId = req.params.userId; 
    let user = await User.findOne({id: userId})

    if(!user) { 
        return res.status(401).send({msg: "user not found"})
    }

    if(req.session.isAdmin || req.session.userId == userId) { 
        return res.status(200).send({
            msg: "retrieved successfully", 
            user: userInfoUnrestrictedView(user)
        })
    }

    return res.status(200).send({
        msg: "retrieved successfully", 
        user: userInfoRestrictedView(user)
    })    
}

// received "cannot GET /users". thought it was because of mispelling some words, 
// but it is in fact because of the function getAllUser.

async function getAllUsers(req, res, next) { 
    let users = await User.find()
    console.log(users)

    if(req.session.isAdmin) { 
        return res.status(200).send({
            msg: "retrieved successfully", 
            users: users.map(userInfoUnrestrictedView)
        })
    }

    return res.status(200).send({
        msg: "retrieved successfully", 
        users: users.map(userInfoRestrictedView)
    })    
}

export { 
    createUser, 
    getUser, 
    getAllUsers, 
    userInfoRestrictedView, 
    userInfoUnrestrictedView
}