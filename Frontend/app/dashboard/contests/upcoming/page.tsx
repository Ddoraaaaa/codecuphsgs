"use client"; 

import { ContestInfo } from "@/backend_api/contests"
import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { displayMili } from "../helper"
import { ContestsInfoContext } from "../layout";
import assert from "assert";

function UpcomingContest({
    contestInfo
}: { 
    contestInfo: ContestInfo
}): JSX.Element {
    const [beforeStart, setBeforeStart] = useState(displayMili(contestInfo.startDate.getTime() - (new Date().getTime())));
    useEffect(() => { 
        const interval = setInterval(() => {
            setBeforeStart(displayMili(contestInfo.startDate.getTime() - new Date().getTime()));
        }, 1000);
    
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="min-w-0 flex gap-x-4">
            <Link href={`/dashboard/contest/${contestInfo.contestId}`}
                className="text-sm underline font-semibold leading-6 text-gray-900">
                {contestInfo.contestName}
            </Link>
            <p>Start in {beforeStart}</p>
        </div>
    )
}

export default function UpcomingContests() { 
    const contestsInfo = useContext(ContestsInfoContext)
    console.log("contestsInfo: "); 
    console.log(contestsInfo); 
    try {
        assert (contestsInfo != null); 
        console.log(contestsInfo); 
        return (
            <div className="w-full">
                {/* <h2>Upcoming Contests</h2> */}
                <ul className={`divide-y divide-gray-100`}>
                    {
                        contestsInfo
                            .filter(contestsInfo => contestsInfo.startDate >= new Date())
                            .map((contestInfo) => 
                                <UpcomingContest key={contestInfo.contestId} contestInfo={contestInfo}></UpcomingContest>)
                    }
                </ul>
            </div>
        )
    }
    catch (error) { 
        console.log(contestsInfo)
        console.log(error); 
        return <>Loading...</>; 
    }
}

