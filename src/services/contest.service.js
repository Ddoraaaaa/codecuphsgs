import { Contest } from "../models/contest.model";
import assert from "assert"
async function createContest(req, res, next) { 
    console.log(req.session.userId)
    if(!req.session.isAdmin) { 
        return res.status(401).send({msg: "User is not admin"}); 
    }

    let contest = await Contest.create({
        id: await Contest.count() + 1, 
        name: req.body.name, 
        startDate: req.body.startDate, 
        endDate: req.body.endDate, 
        gameId: req.body.gameId, 
        isHidden: req.body.isHidden, 
        hasRound16: req.body.hasRound16, 
        roundCoolDown: req.body.roundCoolDown
    })

    if(!contest) { 
        return res.status(401).send({msg: "creating contest failed"}); 
    }

    return res.status(200).send({msg: "creating contest succeeded"}); 
}

async function getAllContests(req, res, next) { 
    let ongoing = req.query.ongoing; 

    if(ongoing == null) { 
        return res.status(401).send({msg: "Missing parameters"}); 
    }

    let now = Date.now(); 
    let contests = ongoing? 
        await Contest.find({
            startDate: {$lte: now}, 
            endDate: {$gte: now}
        }): 
        await Contest.find(); 
    
    if(!req.session.isAdmin) { 
        contests = contests.map(contestInfoRestrictedView); 
    }

    return res.status(200).send({
        msg: "Successful", 
        contests
    }); 
}

async function getContest(req, res, next) { 
    let contestId = req.param.contestId; 

    if(contestId == null) { 
        return res.status(401).send({msg: "Missing parameters"}); 
    }

    let contest = await Contest.find({id: contestId}); 
    if(!contest) { 
        return res.status(401).send({msg: "Contest not found"}); 
    }

    if(!req.session.isAdmin) { 
        contest = contestInfoRestrictedView(contest); 
    }

    return res.status(200).send({
        msg: "Successful", 
        contest
    })
}

async function deleteContest(req, res, next) { 
    let contestId = req.query.contestId; 

    if(contestId == null) { 
        return res.status(401).send({msg: "Missing contestId"}); 
    }

    if(!req.session.isAdmin) { 
        return res.status(401).send({msg: "User is not admin"})
    }

    let contestFoundCount = await Contest.count({id: contestId})
    assert( contestFoundCount <= 1); 
    if(contestFoundCount == 0) { 
        return res.status(401).send({msg:"No contest found"}); 
    }

    let {acknowledged, deletedCount} = await Contest.deleteMany({id: contestId}); 
    assert(deletedCount == 1)

    return res.status(200).send({msg: "deleted"}); 
}

async function submitToContest(req, res, next) { 
    let contestId = req.params.contestId; 
    console.log(req.body);
    console.log(req.files);
    return res.send()
    let sourceFile = req.body.sourceFile; 
    let userId = req.session.userId; 

    if(!req.session.userId) { 
        return res.status(401).send({msg: "Not logged in"}); 
    }

    if(!contestId) { 
        return res.status(401).send({msg: "Missing contestId"}); 
    }

    let contestFoundCount = await Contest.count({id: contestId})
    assert( contestFoundCount <= 1); 
    if(contestFoundCount == 0) { 
        return res.status(401).send({msg:"No contest found"}); 
    }

    if(!sourceFile) { 
        return res.status(401).send({msg: "Missing file"}); 
    }

    let saveSucceeded = await saveFile(contestId, userId, sourceFile); 
    if(!saveSucceeded) { 
        return res.status(401).send({msg: "Saving failed"}); 
    }

    return res.status(200).send({msg: "saving succeeded"}); 
}

export { 
    createContest, 
    getAllContests, 
    getContest, 
    deleteContest, 
    submitToContest, 
}