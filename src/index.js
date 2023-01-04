import express from "express";
import mongoose from "mongoose";
import User from "./models/user.model";

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017')

const app = express();

app.use(express.json());

app.post('/register', (req, res) => {
    console.log(req.body);
    return res.json({msg: "registered succesfully"});
})

app.listen(3000, () => {
    console.log("tao da song");
})