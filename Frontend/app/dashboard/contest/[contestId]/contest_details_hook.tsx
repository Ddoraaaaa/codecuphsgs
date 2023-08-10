import { ContestDetailsI, getContestDetails } from "@/backend_api/contests";
import { useEffect, useState } from "react";
import assert from "assert";
export default function useContestDetails(initialContestId: number){ 
    const [contestId, setContestId] = useState(initialContestId); 
    const [contestDetails, setContestDetails] = useState<ContestDetailsI | null>(); 
   
    async function updateContestDetails() {
        let fetchResult = await getContestDetails(initialContestId); 
        if(fetchResult.success === false) { 
            setContestDetails(null); 
            alert(fetchResult.msg); 
        }
        else { 
            assert(fetchResult.contestDetails != undefined); 
            setContestDetails(fetchResult.contestDetails); 
        }
    }
    
    useEffect(() => { 
        try { 
            updateContestDetails(); 
        }
        catch(error) { 
            alert(error); 
        }
    }, [])

    return { 
        contestDetails, 
        setContestId
    }
}