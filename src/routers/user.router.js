import { Router } from "express";
import { 
    createSession, 
    endSession, 
} from "../middlewares/authenticate"; 

import { 
    createUser, 
    getUser, 
    getAllUsers
} from "../services/user.service"

const userRouter = Router()

userRouter.post("/register", createUser)
userRouter.post("/login", createSession)
userRouter.post("/logout", endSession)

userRouter.get("/user/:userId", getUser)
userRouter.get("/users", getAllUsers)

export { 
    userRouter
}