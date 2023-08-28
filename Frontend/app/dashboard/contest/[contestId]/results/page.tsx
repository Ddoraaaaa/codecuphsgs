"use client"; 

import { getResult } from "@/backend_api/contests";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useContestDetails from "../contest_details_hook";

export default function ResultPage() { 
    const params = useParams(); 
    const {contestDetails, setContestId} = useContestDetails(parseInt(params.contestId)); 
    const [result, setResult] = useState(null); 
    
    async function callFetchContestResults() { 
        console.log("fetching contest result")
        const _results = await getResult(parseInt(params.contestId)); 
        setResult(_results.results); 
    }
    useEffect( () => { 
        console.log("running effect"); 
        callFetchContestResults();     
    }, []); 

    const onEndContestButtonClicked = () => { 
        if(window.confirm("Are you sure you want to end this contest?")) { 
            
        }
    }

    const onJudgeButtonClicked = () => { 
    }

    if(contestDetails && contestDetails.endDate >= new Date()) { 
        return (
            <div>
                This contest has not ended. &nbsp;
                <button type="submit" onClick={onJudgeButtonClicked}
                    className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                    End this contest
                </button>
            </div>
        );
    }
    else if(result) { 
        if(result.finishedJudging) { 
            return <>{JSON.stringify(result)}</>; 
        }
        else if(result.startedJudging) { 
            return (
                <div>
                    This contest is being judged. &nbsp;
                    <button type="submit" onClick={() => {}}
                        className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        Rejudge
                    </button>
                </div>
            ); 
        }
        else { 
            return (
                <div>
                    This contest has not been judged. &nbsp;
                    <button type="submit" onClick={onJudgeButtonClicked}
                        className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        Judge 
                    </button>
                </div>
            ); 
        }
    }
}