import { Schema, model } from "mongoose";

const userSchema = new Schema({
	userId: {type: String},
	username: {type: String, required: true},
	password: {type: String, required: true},
	name: String,
	email: String,
	isAdmin: {type: Boolean, default: false},
	contests: [Number]
});


const User = model('User', userSchema);

export default User;