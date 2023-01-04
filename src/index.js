import express from "express";
import mongoose from "mongoose";
import userController from "./controllers/user.controller"
// import contestController from "./controllers/user.controller"

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/codecup')

const app = express();

app.use(express.json());

app.use(userController);
// app.use(contestController);

app.listen(3000, () => {
    console.log("tao da song");
})