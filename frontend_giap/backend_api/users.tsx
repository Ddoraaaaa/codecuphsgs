import { userInfoI } from '@/session_storage_api/api';
import assert from 'assert';

const API_URL = "http://localhost:5000"; 


async function signup({
    username, 
    password,
    email
}: { 
    username: string | null, 
    password: string | null, 
    email: string | null, 
}) : Promise<{
    success: boolean, 
    msg: string, 
    userInfo?: userInfoI 
}> { 
    // cannot figure out the bug???? Just need to try catch!!!
    try { 
        // why is it not working? apparently await can escape try / catch block
        let response = await fetch(API_URL + "/register", 
            { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: username, 
                    email: email, 
                    password: password
                })
            }
        ); 

        let success = response.ok;
        let jsonResponse = await response.json(); 
        let msg = jsonResponse.msg;  
        let user = jsonResponse.user; 
        console.log(jsonResponse); 
        
        return { 
            success, 
            msg, 
            userInfo: { 
                userId: jsonResponse.user.id, 
                username: jsonResponse.user.username, 
                userIsAdmin: jsonResponse.user.isAdmin
            }
        }
    } catch(error) {
        return { 
            success: false, 
            msg: error.toString()
        }
    }

}

async function login({
    username, 
    password,
    email
}: { 
    username: string | null, 
    password: string | null, 
    email: string | null, 
}) : Promise<{
    success: boolean, 
    msg: string, 
    userInfo?: userInfoI
}> { 
    // cannot figure out the bug???? Just need to try catch!!!
    try { 
        let response = await fetch(API_URL + "/login", 
            { 
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: username, 
                    email: email, 
                    password: password
                })
            }
        ); 
        
        let success = response.ok;
        let jsonResponse = await response.json(); 
        let msg = jsonResponse.msg;  
        let user = jsonResponse.user; 
        console.log(jsonResponse); 
        
        return { 
            success, 
            msg, 
            userInfo: { 
                userId: jsonResponse.user.id, 
                username: jsonResponse.user.username, 
                userIsAdmin: jsonResponse.user.isAdmin
            }
        }
    }
    catch(error) {
        console.log(error); 
    }

    return { 
        success: true, 
        msg: "nice"
    }; 

}

export { 
    signup, 
    login
}