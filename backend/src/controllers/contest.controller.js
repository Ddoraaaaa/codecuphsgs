import sourceCodeUpload from "../middlewares/upload";

export default class ContestController {
    #contestService; 
    #submissionService; 

    constructor(contestService, submissionService) { 
        this.#contestService = contestService; 
        this.#submissionService = submissionService; 

        this.createContest.bind(this);
        this.getAllContests.bind(this); 
        this.getContest.bind(this); 
        this.deleteContest.bind(this); 
        this.submitToContest.bind(this); 
    }

    async createContest(req, res, next) { 
        console.log(req.session.userId)
        if(!req.session.isAdmin) { 
            return res.status(401).send({msg: "User is not admin"}); 
        }
        try {
            const contest = await this.#contestService.createContest(req.body);

            if(!contest) { 
                return res.status(401).send({msg:  `Creating contest failed`}); 
            }

            return res.status(200).send({msg: "creating contest succeeded"}); 
        } catch(e) { 
            return res.status(401).send({msg:  `Error: ${e}`}); 
        }
    }

    async getAllContests(req, res, next) { 
        console.log("ayoooooo " + this); 
        this.#contestService; 

        let contests = await this.#contestService.getAllContests(); 
        
        if(!req.session.isAdmin) { 
            contests = contests.map(ContestController.#restrictedView); 
        }

        console.log(222222); 

        return res.status(200).send({
            msg: "Successful", 
            contests
        }); 
    }

    async getContest(req, res, next) { 
        let contestId = req.params.contestId; // bug: params, not param
        console.log(contestId)

        if(contestId == null) { 
            return res.status(401).send({msg: "Missing parameters"}); 
        }


        // try {
            console.log(this); 
            let contest = await this.#contestService.getContest(contestId); 

            console.log("good"); 


            if(!contest) { 
                return res.status(401).send({msg: "Contest not found"}); 
            }
    

            console.log(contest); 
            if(!req.session.isAdmin) { 
                contest = ContestController.#restrictedView(contest); 
            }

            console.log(contest); 

            return res.status(200).send({
                msg: "Successful", 
                contest
            })
        // } catch(e) { 
        //     return res.status(401).send({
        //         msg: "Server Error " + e  
        //     }); 
        // }
    }

    async deleteContest(req, res, next) { 
        let contestId = req.query.contestId; 

        if(contestId == null) { 
            return res.status(401).send({msg: "Missing contestId"}); 
        }

        if(!req.session.isAdmin) { 
            return res.status(401).send({msg: "User is not admin"})
        }
        
        try {
            this.#contestService.deleteContest(contestId)
            return res.status(200).send({msg: "deleted"}); 
        } catch(e) { 
            return res.status(401).send({msg: "Server error: " + e}); 
        }
    }

    async submitToContest(req, res, next) { 
        let contestId = req.params.contestId; 

        if(!contestId) { 
            return res.status(401).send({msg: "Missing contestId"}); 
        }
        if(!req.session.userId) { 
            console.log(req.session)
            return res.status(401).send({msg: "Not logged in"}); 
        }

        if(!this.#contestService.isContestActive(contestId)) { 
            return res.status(401).send({msg: "Contest is not active"}); 
        }

        try {
            sourceCodeUpload(req, res, (error) => { 
                if (error instanceof multer.MulterError) {
                    throw(error); 
                    return res.status(200).send({msg: "Server error"}); 
                } else if (error) {
                    console.error("errorOR: " + erroror); 
                    throw(error); 
                    return res.status(200).send({msg: "Server error"}); 
                }
            })

            console.log(req.files); 

            const submissionData = await this.#submissionService.createSubmission({ 
                contestId: contestId, 
                userId: req.session.userId, 
                sourceUrl: ""
            }); 

            await this.#contestService.setFinalSubmission(contestId, userId, submissionData.id); 

            return res.status(200).send({msg: "submitted"}); 
        } catch(e) { 
            return res.status(401).send({msg: "Server Error: " + e});
        }
    }

    static #restrictedView(contest) { 
        return contest; 
    }

    static #unrestrictedView(contest) { 
        return contests;
    }
}