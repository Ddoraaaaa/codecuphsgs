import { contestDetailsI, contestInfoI } from "@/backend_api/contests";
import { useState } from "react";

interface userInfoI { 
    userId: number, 
    username: string, 
    userIsAdmin: boolean; 
}

function setUserInfo(userInfo: userInfoI | null) { 
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); 
}

function getUserInfo(): userInfoI | null { 
    let userInfoString = sessionStorage.getItem('userInfo'); 
    if(userInfoString == null) { 
        return null; 
    }
    return JSON.parse(userInfoString); 
}

function setContestsInfo(contestsInfo: contestInfoI[] | null) { 
    sessionStorage.setItem('contestsInfo', JSON.stringify(contestsInfo)); 
}

function getContestsInfo(): contestInfoI[] | null { 
    let contestsInfoString = sessionStorage.getItem("contestsInfo"); 
    if(contestsInfoString == null) { 
        return null; 
    }
    return JSON.parse(contestsInfoString); 
}

function setContestDetails(contestDetails: contestDetailsI | null) { 
    sessionStorage.setItem("contestDetails", JSON.stringify(contestDetails)); 
}

function getContestDetails(): contestDetailsI | null { 
    let contestDetailsString = sessionStorage.getItem("contestDetails"); 
    if(contestDetailsString == null) { 
        return null; 
    }
    return JSON.parse(contestDetailsString);
}

// function useUserInfo(): userInfoI | null { 
//     const [userInfo, setUserInfo] = useState(getUserInfo()); 

// }

export type { 
    userInfoI
}

export {  
    setUserInfo, 
    getUserInfo
}