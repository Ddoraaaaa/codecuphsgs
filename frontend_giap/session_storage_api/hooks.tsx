
import { useState, useEffect, Dispatch, SetStateAction } from "react";

/* session-wide data */
/* todo: caching to reduce the number of fetch? */

/* caching the user data in sessionStorage to reduce the number of fetch request */
/* however a problem arises: concurrent access to sessionStorage from different hooks */
/* -> just need to provide the same hook to all components */
/* another way is to use context */ 
/* basically the same, just different implmentation. However the first sol is much more neat */
/* only one hook -> singleton? */

interface userInfoI { 
    userId: number, 
    username: string, 
    userIsAdmin: boolean; 
}

class SharedUserInfoHook { 
    static instance: SharedUserInfoHook; 
    static userInfo: userInfoI | null; 
    static setUserInfo: Dispatch<SetStateAction<userInfoI | null>>

    static getUserInfo(): userInfoI | null { 
        let userInfoString = sessionStorage.getItem('userInfo'); 
        if(userInfoString == null) { 
            return null; 
        }
        return JSON.parse(userInfoString); 
    }

    constructor() { 
        if(SharedUserInfoHook.instance) { 
            throw new Error("SharedUserInfoHook: Singleton violated"); 
        }
        SharedUserInfoHook.instance = this; 
        [SharedUserInfoHook.userInfo, SharedUserInfoHook.setUserInfo] 
            = useState<userInfoI | null>(SharedUserInfoHook.getUserInfo()); 
    }

    static saveUserInfo(userInfo: userInfoI | null) { 
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); 
        SharedUserInfoHook.setUserInfo(userInfo); 
    }

    static useUserInfo() { 
        return [SharedUserInfoHook.userInfo, SharedUserInfoHook.saveUserInfo]; 
    }
}

export { 
    SharedUserInfoHook
}

// one advantage of a custom hook is to remove implementation logic from components
