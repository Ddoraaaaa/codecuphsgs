import { Router } from "express";
import { 
    createSession, 
    endSession, 
} from "../middlewares/authenticate"; 

import * as userController from "../controllers/user.controller"

const userRouter = Router()

userRouter.post("/register", userController.createUser)
userRouter.post("/login", createSession)
userRouter.post("/logout", endSession)

userRouter.get("/user/:userId", userController.getUser)
userRouter.get("/users", userController.getAllUsers)

export default userRouter; 