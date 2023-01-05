import { Router } from "express";
import { registerUser } from "../services/user.service";

const router = Router()

router.post('/register', async (req, res) => {
    const body = req.body;

    const result = await registerUser(body);

    return res.json({message:"registerrrr succesful", userid:result._id});
})

export default router;