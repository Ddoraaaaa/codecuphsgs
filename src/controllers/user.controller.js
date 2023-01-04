import { Router } from "express";
import { registerUser, findUser } from "../services/user.service";

const router = Router()

router.post('/register', async (req, res) => {
    const body = req.body;

    const result = await registerUser(body);

    return res.json({message:"registerrrr succesful", userid:result._id});
})

router.get('/finduser', async (req, res) =>{
    const body = req.body;

    const found = await findUser(body);
    if(!found)
    {
        throw new error('NOT_FOUND');
    }
    else
    {
        return res.json({message:"dude is found", id:found._id});
    }
})

export default router;