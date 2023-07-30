export default class ContestService { 
    #contestModel
    constructor(contestModel) { 
        this.#contestModel = contestModel; 
    }

    async getAllEndedUnjudgedContest() { 
        return Array.from(
                await this.#contestModel.find({judged: false, endDate: {$lte: new Date().toISOString()}})
            ).map(contestDocument => contestDocument.toObject()); 
    }

    async getAllContests() { 
        return Array.from(await this.#contestModel.find())
            .map(contestDocument => contestDocument.toObject()); 
    }



    async createContest(contest) {
        let reformattedContest = {
            id: await this.#contestModel.count() + 1, 
            name: contest.name, 
            startDate: contest.startDate, 
            endDate: contest.endDate, 
            gameId: contest.gameId, 
            runTrialMatches: contest.runTrialMatches, 
            judgeMode: contest.judgeMode, 
            contestFormat: contest.contestFormat
        }
        if(contest.judged != undefined) { 
            console.warn("Contest is marked as judged / unjudged!!!!"); 
            reformattedContest.judged = contest.judged; 
        }
        let insertedContest = await this.#contestModel.create(reformattedContest); 
        return insertedContest; 
    }

    async getContest(contestId) { 
        const contestDocument = await this.#contestModel.findOne({id: contestId});
        return contestDocument.toObject(); 
    }

    async deleteContest(contestId) { 
        let contestFoundCount = await this.#contestModel.count({id: contestId})
        assert( contestFoundCount <= 1); 
        if(contestFoundCount == 0) { 
            return res.status(401).send({msg:"No contest found"}); 
        }

        let {acknowledged, deletedCount} = await contestModel.deleteMany({id: contestId}); 
        assert(deletedCount == 1); 
    }

    async isContestActive(contestId) { 
        const contestDocument = await this.#contestModel.findOne({id: contestId}); 
        const currentDate = new Date().toISOString(); 
        if(contestDocument.endDate < currentDate || contestDocument.startDate > currentDate) { 
            return false; 
        }
        return true; 
    } 

    async getFinalSubmission(contestId, userId) { 
        const contestDocument = await this.#contestModel.findOne({id: contestId});
        return contestDocument.finalSubmissions.get((userId).toString()); 
    }

    async setFinalSubmission(contestId, userId, submissionId) { 
        try {
            await this.#contestModel.updateOne(
                {id: submissionId, userId: userId, contestId: contestId}, 
                { $set: {[`finalSubmissions.${userId}`]: submissionId}}); // finalSumissions.11 = finalSubmissions["11"]? 
            console.warn("This syntax still needs investigation"); 
            return true; 
        } catch(e) { 
            console.error(e); 
            return false; 
        }
    }

    async getContestResult(contestId) { 
        const contest = await this.#contestModel.findOne({id: contestId}); 
        return contest.result; 
    }

    async setContestResult(contestId, result) { 
        try {
            const contest = await this.#contestModel.findOne({id: contestId})
            contest.result = result; 
            await contest.save(); 
        } catch(e) { 
            console.error(e); 
            return false; 
        }
    }

    async getCurrentState(contestId) { 
        const contestDocument = await this.#contestModel.findOne({id: contestId}); 
        return contestDocument.currentState; 
    }

    async setCurrentState(contestId, currentStateString) { 
        await this.#contestModel.updateOne({id: contestId}, {currentState: currentStateString}); 
    }
}
