import sourceCodeUpload from "../middlewares/multerSingleFileUpload.js";
import contestService from "../services/contest.service.js";

async function createContest(req, res, next) { 
    if(!req.session.isAdmin) { 
        return res.status(401).send({msg: "User is not admin"}); 
    }
    try {
        const contest = await contestService.createContest(req.body);

        if(!contest) { 
            return res.status(401).send({msg:  `Creating contest failed`}); 
        }

        return res.status(200).send({msg: "creating contest succeeded"}); 
    } catch(e) { 
        return res.status(401).send({msg:  `Error: ${e}`}); 
    }
}

async function getAllContests(req, res, next) { 
    let contests = await contestService.getAllContests(); 
    
    if(!req.session.isAdmin) { 
        contests = contests.map(restrictedView); 
    }

    return res.status(200).send({
        msg: "Successful", 
        contests
    }); 
}

async function getContest(req, res, next) { 
    let contestId = req.params.contestId; // bug: params, not param

    if(contestId == null) { 
        return res.status(401).send({msg: "Missing parameters"}); 
    }


    try {
        let contest = await contestService.getContest(contestId); 

        if(!contest) { 
            return res.status(401).send({msg: "Contest not found"}); 
        }


        if(!req.session.isAdmin) { 
            contest = restrictedView(contest); 
        }


        return res.status(200).send({
            msg: "Successful", 
            contest
        })
    } catch(e) { 
        return res.status(401).send({
            msg: "Server Error " + e  
        }); 
    }
}

async function deleteContest(req, res, next) { 
    let contestId = req.query.contestId; 

    if(contestId == null) { 
        return res.status(401).send({msg: "Missing contestId"}); 
    }

    if(!req.session.isAdmin) { 
        return res.status(401).send({msg: "User is not admin"})
    }
    
    try {
        contestService.deleteContest(contestId)
        return res.status(200).send({msg: "deleted"}); 
    } catch(e) { 
        return res.status(401).send({msg: "Server error: " + e}); 
    }
}

async function createSubmission(req, res, next) { 
    if(!req.params.contestId) { 
        return res.status(401).send({err: "Missing contestId"}); 
    }

    if(!req.session.userId) { 
        return res.status(401).send({err: "Not logged in"}); 
    }

    if(!req.file){ 
        // either it is to be saved, or the response has to be returned by upload middleware
        console.error("No file found"); 
        return res.status(500).send({msg: "Internal Server Error"}); 
    }

    const contestId = parseInt(req.params.contestId); 
    const sourceUrl = req.file.path; 

    try {
        const serviceResponse = await contestService.createSubmission({ 
            contestId, 
            userId: req.session.userId, 
            sourceUrl
        }); 

        return res.status(200).send({msg: "Submitted successfully"}); 
    } catch (err){
        console.error("Error at submitToContest Controller: " + err); 
        return res.status(401).send({err: "Internal Server Error"});
    }
}

async function getContestResults(req, res, next) { 
    const contestId = req.params.contestId; 
    if(!contestId) { 
        return res.status(401).send({msg: "Missing contest id"}); 
    }

    const results = await contestService.getContestResults(contestId); 
    return res.status(200).send({results}); 
}

function restrictedView(contest) { 
    return contest; 
}

function unrestrictedView(contest) { 
    return contests;
}

export { 
    createContest, 
    getAllContests, 
    getContest, 
    deleteContest, 
    createSubmission, 
    getContestResults, 
}