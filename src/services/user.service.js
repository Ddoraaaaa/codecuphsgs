import User from "../models/user.model";

//register an user, duh
export async function registerUser(params) {
    const user = await User.create(params);
    console.log(user);
    return user;
}

//find user
export async function findUser(params) {
    console.log("reached here");
    const user = await User.findOne(params, (err, obj) => {console.log(obj)});
    return user;
}