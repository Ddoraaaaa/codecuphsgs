import User from "../models/user.model";

//register an user
export async function registerUser(params) {
    const user = await User.create(params);
    return user;
}