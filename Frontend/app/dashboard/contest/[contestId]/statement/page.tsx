"use client"; 

import { useParams } from "next/navigation";
import useContestDetails from "../contest_details_hook"

export default function ContestStatement() { 
    const params = useParams(); 
    const {contestDetails, setContestId} = useContestDetails(parseInt(params.contestId)); 

    return <div className="">You can read the statement <a className="underline" href={contestDetails?.gameStatementUrl}>here</a></div>
}