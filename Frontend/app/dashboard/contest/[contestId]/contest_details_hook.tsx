import { ContestDetailsI, getContestDetails } from "@/backend_api/contests";
import { useEffect, useState } from "react";
import assert from "assert";
import alertBackendAPIError from "@/app/utils/alertSystem/alertBackendAPIError";
export default function useContestDetails(initialContestId: number){ 
    const [contestId, setContestId] = useState(initialContestId); 
    const [contestDetails, setContestDetails] = useState<ContestDetailsI | null>(); 
   
    async function updateContestDetails() {
        try { 
            const contestDetails = await getContestDetails(initialContestId); 

            await setContestDetails(contestDetails); 
        } catch(error: any) { 
            alertBackendAPIError(error, "updating contest details"); 
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