import mongoose from "mongoose";
import UserModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import DatabaseError from "./errors/databaseError.js";
import UnknownInternalError from "./errors/unknownInternalError.js";
import ValidationError from "./errors/validationError.js";
import ServiceError from "./errors/serviceError.js";

// throws serviceError.
async function createUser({ 
    username, 
    email, 
    password
}) {  
    
    if((!username && !email) || !password) { 
        throw new ServiceError("Parameter missing information"); 
    }

    // findOne return null if not found, so no catching needed. 
    if(await UserModel.findOne({username})) { 
        throw new ValidationError("Username already exists"); 
    }

    if(await UserModel.findOne({email})) { 
        throw new ValidationError("Email aready exists"); 
    }

    try {
        const userDocument = await UserModel.create({ 
            id: await UserModel.count() + 1, 
            username: username, 
            password: await bcrypt.hash(password, 10), 
            email: email
        })
        return userDocument.toObject(); 
    } catch(err) { 
        // log the error
        console.error("Error encountered at createUser service: " + err); 

        // abstract away specific service error
        // if(err instanceof MongooseError) {
        //     throw new DatabaseError("Database Error"); 
        // }
        // else { 
            throw new UnknownInternalError();  
        // }
    }
}

async function getUser({
    id
}) { 
    if(!id) { 
        throw new ServiceError("Parameter missing ID"); 
    }

    try { 
        const userDocument = await UserModel.findOne({id}); 
        if(!userDocument) { 
            throw new ValidationError("No user with such id"); 
        }
        return userDocument; 
    }
    catch(err) { 
        // log the error
        console.error("Error encountered at createUser service: " + err); 

        // if(err instanceof MongooseError) {
        //     throw new DatabaseError("Database Error"); 
        // }
        // else { 
            throw new UnknownInternalError();  
        // }
    }
}

const userService = { 
    createUser,
    getUser
}

export default userService; 