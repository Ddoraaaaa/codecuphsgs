export default class JudgeAPIWrapper { 
    #JUDGE_URL; 
    #submissionService; 

    constructor (judge_url, submissionService) { 
        this.#JUDGE_URL = judge_url; 
        this.submissionService = submissionService; 
    }

    async submit(submission1, submission2) { 
        const judgeReceiptId = await this.#sendFiles(submission1, submission2);
        if(!judgeReceiptId) { 
            console.error("Failed to send file"); 
            return null; 
        }
        await waitForUpdate(); 
        const resultResponse = await this.#fetchResult(judgeReceiptId); 
        return resultResponse; 
    }

    async #sendFiles(submission1, submission2) { 
        const formData = new FormData(); 
        
        formData.append('player1', fs.readFileSync(await this.#getSourceUrls(submission1))); 
        formData.append('player2', fs.readFileSync(await this.#getSourceUrls(submission2)));
        
        const response = await fetch(`${HOST_URL}/submit`, { 
            method:"POST", 
            headers:{
                'Content-Type': 'multipart/form-data'
            }, 
            body: formData
        }); 

        if(!response.ok) { 
            const body = response.json(); 
            console.error(body.msg); 
        }
        return response.ok; 
    }

    async #fetchResult(judgeReceiptId) { 

    }

    async #getSourceUrls(submission) { 
        return await this.#submissionService.getSubmission({id: submission1}).sourceUrl; 
    }
}