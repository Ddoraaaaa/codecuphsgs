import mongoose from "mongoose";
import UserModel from "../models/user.model"
import bcrypt from "bcrypt"
import DatabaseError from "./errors/databaseError";
import UnknownInternalError from "./errors/unknownInternalError";
import ValidationError from "./errors/validationError";

// throws serviceError.
async function createUser({ 
    username, 
    email, 
    password
}) {  
    
    if((!username && !email) || !password) { 
        throw new ValidationError("Missing information"); 
    }

    // findOne return null if not found, so no catching needed. 
    if(await UserModel.findOne({username})) { 
        throw new ValidationError("Username already exists"); 
    }

    if(await UserModel.findOne({email})) { 
        throw new ValidationError("Email aready exists"); 
    }

    try {
        let user = await UserModel.create({ 
            id: await UserModel.count() + 1, 
            username: username, 
            password: await bcrypt.hash(password, 10), 
            email: email
        })
    } catch(err) { 
        // log the error
        console.error("Error encountered at createUser service: " + err); 

        // abstract away specific service error
        if(err instanceof mongoose.Error) {
            throw new DatabaseError("Database Error, inserting failed"); 
        }
        else { 
            throw new UnknownInternalError();  
        }
    }

    return user; 
}

export { 
    createUser
}