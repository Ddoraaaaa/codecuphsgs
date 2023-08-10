import { assert } from "console";
import FormData from "form-data"; 
import fetch from "node-fetch"; 
import fs from "fs"; 

export default class JudgeAPIWrapper { 
    #JUDGE_URL; 
    #submissionService; 

    constructor (judge_url, submissionService) { 
        this.#JUDGE_URL = judge_url; 
        this.#submissionService = submissionService; 
    }

    async submit(submission1, submission2) { 
        console.log(submission1 + " " + submission2)
        const judgeReceiptId = await this.#sendFiles(submission1, submission2);
        
        if(!judgeReceiptId) { 
            console.error("Failed to send file"); 
            return null; 
        }
        
        await waitFinishJudging(); 


        const {firstPlayerWin} = await this.#fetchResult(judgeReceiptId);

        assert(firstPlayerWin != null); 

        const {logUrl} = await this.#fetchLog(judgeReceiptId); 

        assert(logUrl != null); 

        return {firstPlayerWin, logUrl}; 
    }

    async #sendFiles(submission1, submission2) { 
        const formData = new FormData(); 

        const sourceUrl1 = await this.#getSourceUrls(submission1); 
        const sourceUrl2 = await this.#getSourceUrls(submission2); 
        console.log("Sources: " + sourceUrl1 + sourceUrl2 + ". CWd" + __dirname + "/" + __filename); 
        
        if(fs.existsSync(sourceUrl1) && fs.existsSync(sourceUrl2)) {
            const data1 = fs.readFileSync(sourceUrl1, 'utf8'); 
            console.log("data: " + data1); 
            formData.append('player1', fs.createReadStream(sourceUrl1)); 
            formData.append('player2', fs.createReadStream(sourceUrl2));
        }
        else { 
            throw new Error("file does not exists"); 
        }


        console.log("form data: " + formData)
        
        const response = await fetch(`${this.#JUDGE_URL}/submit`, { 
            method:"POST", 
            headers:{
                'Content-Type': 'multipart/form-data'
            }, 
            body: formData
        }); 

        if(!response.ok) { 
            const body = await response.json(); 
            console.error(body); 
        }
        return response.ok; 
    }

    async #fetchResult(judgeReceiptId) { 
        const response = await fetch(`${this.#JUDGE_URL}/result/${judgeReceiptId}`); 
        if(response.ok) { 
            const {winner} = await response.json(); 
            return {firstPlayerWin: winner === 1}; 
        }
        else { 
            return {}; 
        }
    }

    async #fetchLog(judgeReceiptId) { 
        const response = await fetch(`${this.#JUDGE_URL}/log/${judgeReceiptId}`); 
        if(response.ok) { 
            const url = "./logs/logs_" + judgeReceiptId + ".txt"; 
            const text_data = response.text(); 
            fs.writeFile(url, text_data, (err) => { 
                console.error(err); 
            })
            return {logUrl: url}; 
        }
        else { 
            return null; 
        }
    }


    async #waitFinishJudging() { 
        await new Promise((resolve) => { 
            setTimeout(resolve, 10000); 
        })
    }

    async #getSourceUrls(submissionId) { 
        console.log(submissionId)
        const submission = await this.#submissionService.getSubmission(submissionId); 
        console.log(submission); 
        return submission.sourceUrl; 
    }
}