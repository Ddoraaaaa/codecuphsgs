import { contestDetailsI, getContestDetails } from "@/backend_api/contests";
import { useEffect, useState } from "react";
import assert from "assert";
export default function useContestDetails(initialContestId: number){ 
    const [contestId, setContestId] = useState(initialContestId); 
    const [contestDetails, setContestDetails] = useState<contestDetailsI | null>(); 
   
    async function updateContestDetails() {
        let fetchResult = await getContestDetails(initialContestId); 
        if(fetchResult.success === false) { 
            setContestDetails(null); 
            console.log(fetchResult.msg); 
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
            console.log(error); 
        }
    }, [])

    return { 
        contestDetails, 
        setContestId
    }
}