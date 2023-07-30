import { userInfoI } from '@/session_storage_api/api';
import assert from 'assert';

async function logout(): Promise<{ 
    success: boolean, 
    msg: string
}> {
    try { 
        // why is it not working? apparently await can escape try / catch block
        let response = await fetch("/api/logout", 
            { 
                method: "GET", 
            }
        ); 

        let success = response.ok;
        let jsonResponse = await response.json(); 
        let msg = jsonResponse.msg;  
        console.log(jsonResponse); 
        
        return { 
            success, 
            msg, 
        }
    } catch(error) {
        alert(error); 
        return { 
            success: false, 
            msg: error.toString()
        }
    }
}

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
        let response = await fetch("/api/register", 
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
        let response = await fetch("/api/login", 
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
            ...(success && {userInfo: { 
                userId: jsonResponse.user.id, 
                username: jsonResponse.user.username, 
                userIsAdmin: jsonResponse.user.isAdmin
            }})
        }
    }
    catch(error) {
        alert(error); 
        return { 
            success: false, 
            msg: "login failed"
        }
    }

}

export { 
    signup, 
    login, 
    logout
}