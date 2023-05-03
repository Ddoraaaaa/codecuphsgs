import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: {type: Number, required: true, unique: true}, 
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    email: {type: String, unique: true}, 

    name: {type: String}, 
    isAdmin: {type: Boolean, default: false}, 
    contests: {type: [Number]}
})

userSchema.methods.toJson = function () { 
    return { 
        name: this.name, 
        username: this.username, 
        isAdmin: this.isAdmin, 
        email: this.email, 
        contests: this.contests, 
    }
}

const User = model('User', userSchema)

export { 
    User 
}

