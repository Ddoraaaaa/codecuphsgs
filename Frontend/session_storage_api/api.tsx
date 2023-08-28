import { ContestDetails, ContestInfo } from "@/backend_api/contests";

interface UserInfo { 
    userId: number, 
    username: string, 
    userIsAdmin: boolean; 
}

function setUserInfo(userInfo: UserInfo | null) { 
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); 
}

function getUserInfo(): UserInfo | null { 
    if(typeof window === "undefined" ) { 
        return null; 
    }
    let userInfoString = sessionStorage.getItem('userInfo'); 
    if(userInfoString == null) { 
        return null; 
    }
    return JSON.parse(userInfoString); 
}

function setContestsInfo(contestsInfo: ContestInfo[] | null) { 
    sessionStorage.setItem('contestsInfo', JSON.stringify(contestsInfo)); 
}

function getContestsInfo(): ContestInfo[] | null { 
    let contestsInfoString = sessionStorage.getItem("contestsInfo"); 
    if(contestsInfoString == null) { 
        return null; 
    }
    return JSON.parse(contestsInfoString); 
}

function setContestDetails(contestDetails: ContestDetails | null) { 
    sessionStorage.setItem("contestDetails", JSON.stringify(contestDetails)); 
}

function getContestDetails(): ContestDetails | null { 
    let contestDetailsString = sessionStorage.getItem("contestDetails"); 
    if(contestDetailsString == null) { 
        return null; 
    }
    return JSON.parse(contestDetailsString);
}

export type { 
    UserInfo
}

export {  
    setUserInfo, 
    getUserInfo
}