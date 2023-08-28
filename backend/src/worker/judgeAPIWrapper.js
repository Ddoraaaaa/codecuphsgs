import fs from "fs"; 
import axios from "axios";
import FormData from "form-data"
import {Server} from "socket.io";
import EventEmitter from "events";
import submissionService from "../services/submission.service.js"; 


const judgeAPIWrapper = new EventEmitter(); 

const JUDGE_URL = process.env.JUDGE_URL; 
const WORKER_PORT = process.env.WORKER_PORT; 

const axiosInstance = axios.create({
    baseURL: JUDGE_URL, 
    timeout:5000, 
});

const io = new Server(WORKER_PORT);

const locks = {};
const sockets = []; 

io.on("connection", (socket) => { 
    console.log("Accecpted connection from Judge"); 
    addJudgeSocket(socket); 
    judgeAPIWrapper.emit("ready"); 
})


function addJudgeSocket(socket) { 
    socket.on('finish_judge', (submission_id) => { 
        console.log("received signal of finish juding")
        locks[submission_id].free(); 
    })
    sockets.push(socket); 
}

async function submit(submission1, submission2) { 
    console.log("Judge API Wrapper received request to judge " + submission1 + " vs " + submission2); 

    const judgeReceiptId = await sendFiles(submission1, submission2);
    
    if(!judgeReceiptId) { 
        console.error("Failed to send file"); 
        return null; 
    }
    
    await waitFinishJudging(judgeReceiptId); 


    const {firstPlayerWin} = await fetchResult(judgeReceiptId);

    assert(firstPlayerWin != null); 

    const {logUrl} = await fetchLog(judgeReceiptId); 

    assert(logUrl != null); 

    return {firstPlayerWin, logUrl}; 
}

async function sendFiles(submission1, submission2) { 
    console.log("Sending source codes to judge"); 

    const formData = new FormData(); 

    const sourceUrl1 = await getSourceUrls(submission1); 
    const sourceUrl2 = await getSourceUrls(submission2); 
    console.log("Sources: " + sourceUrl1 + sourceUrl2); 
    
    if(!fs.existsSync(sourceUrl1)) { 
        console.error("Error at sendFiles: " + sourceUrl1 + " does not exists"); 
        throw new Error("file does not exists"); 
    }
    if(!fs.existsSync(sourceUrl2)) { 
        console.error("Error at sendFiles: " + sourceUrl2 + " does not exists"); 
        throw new Error("file does not exists"); 
    }

    formData.append('xdy', 'z')

    formData.append('player1', fs.createReadStream(sourceUrl1), "player1.cpp"); 
    formData.append('player2', fs.createReadStream(sourceUrl2), "player2.cpp");

    // console.log("Form data: "); 
    // console.log(formData); 

    console.log("Judge URl: " + `${JUDGE_URL}/submit`); 
    
    let response; 
    try { 
        response = await axiosInstance.request({ 
            method: "post", 
            url: `/submit`, 
            headers:{
                'Content-Type': 'multipart/form-data'
            }, 
            data: formData
        }); 
    } catch(error) { 
        console.error("Error: fetching failed"); 
        throw new Error("Fetching failed"); 
    }

    if(response.status != 200) { 
        console.log("Error sending file to judge"); 
        throw new Error("Sending file failed"); 
    }

    try { 
        console.log(response.data)
        return response.data.submission_id; 
    } catch(error) { 
        console.err("Error at sending file: " + error); 
        throw new Error("Sending file failed"); 
    }
}

async function fetchResult(judgeReceiptId) { 
    let response; 
    try { 
        response = await axiosInstance.request({
            method:'get', 
            url:'/result/' + judgeReceiptId, 
        }); 
    } catch(error) { 
        console.error("Error: fetching result failed");
        throw new Error("fetching result failed"); 
    }
    if(response.status != 200) { 
        console.error("Error: judge fetch error"); 
        throw new Error("Judge fetching error"); 
    }
    
    console.log(response.data); 
}

async function fetchLog(judgeReceiptId) { 
    const response = await fetch(`${JUDGE_URL}/log/${judgeReceiptId}`); 
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


async function waitFinishJudging(judgeReceiptId) { 
    console.log("wating for " + judgeReceiptId + " to finish"); 
    const judgingFinished = new Promise((resolve) => { 
        console.log("creating lock for receipt id: " + judgeReceiptId)
        locks[judgeReceiptId] =  {
            free: resolve
        }
    })

    await judgingFinished; 

    console.log("Finished juding for " + judgeReceiptId); 
}

async function getSourceUrls(submissionId) { 
    console.log("Fetching source code urls for submission #" + submissionId + " from the database"); 

    const submission = await submissionService.getSubmission({id: submissionId}); 

    console.log("Source code URL: " + submission.sourceUrl); 
    return submission.sourceUrl; 
}

judgeAPIWrapper.submit = submit; 

export default judgeAPIWrapper; 