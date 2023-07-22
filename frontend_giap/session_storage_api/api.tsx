import { ContestDetailsI, ContestInfoI } from "@/backend_api/contests";
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

function setContestsInfo(contestsInfo: ContestInfoI[] | null) { 
    sessionStorage.setItem('contestsInfo', JSON.stringify(contestsInfo)); 
}

function getContestsInfo(): ContestInfoI[] | null { 
    let contestsInfoString = sessionStorage.getItem("contestsInfo"); 
    if(contestsInfoString == null) { 
        return null; 
    }
    return JSON.parse(contestsInfoString); 
}

function setContestDetails(contestDetails: ContestDetailsI | null) { 
    sessionStorage.setItem("contestDetails", JSON.stringify(contestDetails)); 
}

function getContestDetails(): ContestDetailsI | null { 
    let contestDetailsString = sessionStorage.getItem("contestDetails"); 
    if(contestDetailsString == null) { 
        return null; 
    }
    return JSON.parse(contestDetailsString);
}

export type { 
    userInfoI
}

export {  
    setUserInfo, 
    getUserInfo
}