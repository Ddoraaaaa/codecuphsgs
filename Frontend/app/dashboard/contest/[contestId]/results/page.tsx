"use client"; 

import { getResult } from "@/backend_api/contests";
import { useEffect, useLayoutEffect, useState } from "react";
import useContestDetails from "../contest_details_hook";
import { useParams } from "next/navigation";

export default function ResultPage() { 
    const params = useParams(); 
    const [results, setResults] = useState([]); 
    
    async function callFetchContestResults() { 
        console.log("fetching contest result")
        const _results = await getResult(parseInt(params.contestId)); 
        setResults(_results); 
    }
    useEffect( () => { 
        console.log("running effect"); 
        callFetchContestResults();     
    }, []); 

    return <>{JSON.stringify(results)}</>; 
}