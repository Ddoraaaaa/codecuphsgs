import express from "express";
import mongoose from "mongoose";

import { userRouter } from "./routers/user.router";

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/codecup')

const app = express();

app.use(express.json());

app.use(userRouter)

app.listen(3000, () => {
    console.log("tao da song");
})