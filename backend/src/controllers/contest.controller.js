import sourceCodeUpload from "../middlewares/upload";
import * as contestService from "../services/contest.service";
import * as submissionService from "../services/submission.service"; 

async function createContest(req, res, next) { 
    console.log(req.session.userId)
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
    console.log("ayoooooo " + this); 

    let contests = await contestService.getAllContests(); 
    
    if(!req.session.isAdmin) { 
        contests = contests.map(restrictedView); 
    }

    console.log(222222); 

    return res.status(200).send({
        msg: "Successful", 
        contests
    }); 
}

async function getContest(req, res, next) { 
    let contestId = req.params.contestId; // bug: params, not param
    console.log(req.params)
    console.log(contestId)

    if(contestId == null) { 
        return res.status(401).send({msg: "Missing parameters"}); 
    }


    try {
        console.log(this); 
        let contest = await contestService.getContest(contestId); 

        console.log("good"); 


        if(!contest) { 
            return res.status(401).send({msg: "Contest not found"}); 
        }


        console.log(contest); 
        if(!req.session.isAdmin) { 
            contest = restrictedView(contest); 
        }

        console.log(contest); 

        return res.status(200).send({
            msg: "Successful", 
            contest
        })
    } catch(e) { 
        console.log("server error" + e)
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

async function submitToContest(req, res, next) { 
    let contestId = req.params.contestId; 

    if(!contestId) { 
        return res.status(401).send({msg: "Missing contestId"}); 
    }
    if(!req.session.userId) { 
        console.log(req.session)
        return res.status(401).send({msg: "Not logged in"}); 
    }

    if(!contestService.isContestActive(contestId)) { 
        return res.status(401).send({msg: "Contest is not active"}); 
    }

    try {
        sourceCodeUpload(req, res, (error) => { 
            // if (error instanceof multer.MulterError) {
            //     throw(error); 
            //     return res.status(200).send({msg: "Server error"}); 
            // } else 
            if (error) {
                console.error("errorOR: " + erroror); 
                throw(error); 
                return res.status(200).send({msg: "Server error"}); 
            }
        })

        console.log(req.files); 

        const submissionData = await submissionService.createSubmission({ 
            contestId: contestId, 
            userId: req.session.userId, 
            sourceUrl: ""
        }); 

        await contestService.setFinalSubmission(contestId, userId, submissionData.id); 

        return res.status(200).send({msg: "submitted"}); 
    } catch(e) { 
        return res.status(401).send({msg: "Server Error: " + e});
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
    submitToContest, 
    getContestResults, 
}