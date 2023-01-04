import express from "express";
import mongoose from "mongoose";

mongoose.connect()

const app = express();

app.use(express.json());

app.get('/bucac', (req, res) => {
    return res.json({msg:"ditmemay"})
})

app.listen(3000, () => {
    console.log("tao da song");
})