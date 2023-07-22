import { Contest } from "../models/contest.model";
import assert from "assert"
import sourceCodeUpload from "../middlewares/upload";
import { error } from "console";
import multer from "multer";
async function createContest(req, res, next) { 
    console.log(req.session.userId)
    if(!req.session.isAdmin) { 
        return res.status(401).send({msg: "User is not admin"}); 
    }
    try {
        let contest = await Contest.create({
            id: await Contest.count() + 1, 
            name: req.body.name, 
            startDate: req.body.startDate, 
            endDate: req.body.endDate, 
            gameId: req.body.gameId, 
            runTrialMatches: req.body.runTrialMatches, 
            judgeMode: req.body.judgeMode, 
            contestFormat: req.body.contestFormat
        })

        if(!contest) { 
            return res.status(401).send({msg:  `Creating contest failed`}); 
        }

        createMatches(contest); 

        return res.status(200).send({msg: "creating contest succeeded"}); 
    } catch(e) { 
        return res.status(401).send({msg:  `Error: ${e}`}); 
    }
}

function contestInfoRestrictedView(contest) { 
    console.log(contest.id); 
    return { 
        id: contest.id, 
        name: contest.name, 
        startDate: contest.startDate, 
        endDate: contest.endDate, 
        gameId: contest.gameId
    }
}

async function getAllContests(req, res, next) { 

    // if(ongoing == null) { 
    //     return res.status(401).send({msg: "Missing parameters"}); 
    // }

    // let now = Date.now(); 
    // let contests = ongoing? 
    //     await Contest.find({
    //         startDate: {$lte: now}, 
    //         endDate: {$gte: now}
    //     }): 
    //     await Contest.find(); 

    let contests = await Contest.find(); 
    
    if(!req.session.isAdmin) { 
        contests = contests.map(contestInfoRestrictedView); 
    }

    return res.status(200).send({
        msg: "Successful", 
        contests
    }); 
}

async function getContest(req, res, next) { 
    let contestId = req.params.contestId; // bug: params, not param
    console.log(contestId)

    if(contestId == null) { 
        return res.status(401).send({msg: "Missing parameters"}); 
    }

    let contest = await Contest.findOne({id: contestId}); 
    if(!contest) { 
        return res.status(401).send({msg: "Contest not found"}); 
    }
    console.log(contest); 
    if(!req.session.isAdmin) { 
        contest = contestInfoRestrictedView(contest); 
    }

    console.log(contest); 

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

    if(!contestId) { 
        return res.status(401).send({msg: "Missing contestId"}); 
    }
    if(!req.session.userId) { 
        console.log(req.session)
        return res.status(401).send({msg: "Not logged in"}); 
    }
    sourceCodeUpload(req, res, (error) => { 
        if (error instanceof multer.Multererroror) {
            throw(error); 
            return res.status(200).send({msg: "Server error"}); 
        } else if (error) {
            console.log("errorOR: " + erroror); 
            throw(error); 
            return res.status(200).send({msg: "Server error"}); 
        }
    })
    return res.status(200).send({msg: "submitted"}); 
}

export { 
    createContest, 
    getAllContests, 
    getContest, 
    deleteContest, 
    submitToContest, 
}