export default class MockJudgeAPIWrapper { 
    constructor() {
    }

    async submit(submission1, submission2) { 
        await new Promise((resolve) => setTimeout(resolve, 200)); 
        return { 
            logUrl: "dummy logurl",
            firstPlayerWin: submission1 > submission2
        }
    }

    /* 
    submitToJudge = async (bracket, match) => { 

        ; 

        const response = await fetch(`${HOST_URL}/submit`, { 
            method:"POST", 
            headers:{
                'Content-Type': 'multipart/form-data'
            }, 
            body: formData
        })
        if(!response.ok) { 
            console.log("Error: " + (await response.json()).message); 
        }
        else { 
            const body = await response.json(); 
            console.log("Ok: " + body.message); 
            this.waitingResult.set(body.submission_id, new Date()); 
            this.periodicallyPingResult(bracket, match, body.submission_id);
        }
    }
    */
}