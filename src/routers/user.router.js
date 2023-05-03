import { Router } from "express";
import { 
    createSession, 
    endSession, 
    requireSelf, 
    requireAdmin 
} from "../middlewares/authenticate"; 

import { 
    createUser
} from "../services/user.service"

const userRouter = Router()

userRouter.post("/register", createUser)
// userRouter.get("/users", requireAdmin, getAllUsers)
// userRouter.get("/user/:userId", getUser)
// userRouter.post("/login", authenticate)
// userRouter.post("/logout", endSession)

export { 
    userRouter
}