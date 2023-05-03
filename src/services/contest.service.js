import { Router } from "express";
import {fetchAllContest, fetchOneContest, createContest, deleteContest} from "./contest.service"

const router = Router()

router.get('/contests/:ongoing', async (req, res) => {
    const result = await fetchAllContest(req.params.ongoing);

    return res.json({message:"", total: result.length, result: result});
})

router.get('/contests/:contestId', async (req, res) => {
    const result = await fetchOneContest(req.params.contestId);

    return res.json({
        message:"registerrrr succesful", 
        contestId:result.contestId, 
        name: result.name, 
        startDate: result.startDate, 
        duration: result.endDate - result.startDate + 1, 
        gameId: result.gameId, 
        players: result.players, 
    });
})

router.post('/createcontest', async (req, res) => {
    const body = req.body;

    const result = await createContest(body);

    return res.json({contestId: result.contestId});
})

router.post('/deletecontest', async (req, res) => {
    const body = req.body;

    const result = await deleteContest(body.contestId);

    return res.json({msg: result.msg});
})

router.post('/contest/:contestId/submit', async (req, res) => {
    const body = req.body;

    const result = await createContest(body);

    return res.json({contestId: result.contestId});
})
export default router;