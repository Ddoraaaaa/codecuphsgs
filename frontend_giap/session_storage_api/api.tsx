interface userInfoI { 
    userId: number, 
    username: string, 
    userIsAdmin: boolean; 
}

function setUserInfo(userInfo: userInfoI) { 
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); 
}

function getUserInfo(): userInfoI | null { 
    let userInfoString = sessionStorage.getItem('userInfo'); 
    if(userInfoString == null) { 
        return null; 
    }
    return JSON.parse(userInfoString); 
}

export type { 
    userInfoI
}

export {  
    setUserInfo, 
    getUserInfo
}