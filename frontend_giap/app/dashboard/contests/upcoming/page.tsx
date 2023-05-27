"use client"; 

import { contestInfoI } from "@/backend_api/contests"
import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { displayMili } from "../helper"
import { error } from "console";
import { contestsInfoContext } from "../layout";
import assert from "assert";

function UpcomingContest({
    contestInfo
}: { 
    contestInfo: contestInfoI
}): JSX.Element {
    const [beforeStart, setBeforeStart] = useState(displayMili(contestInfo.startDate - (new Date())));
    console.log("contestInfo: ")
    console.log(contestInfo)
    useEffect(() => { 
        console.log(typeof(contestInfo.startDate)); 
        console.log(typeof (new Date())); 
        const interval = setInterval(() => {
            setBeforeStart(displayMili(contestInfo.startDate - new Date()));
        }, 1000);
    
        return () => clearInterval(interval);
    })

    return (
        <div className="min-w-0 flex gap-x-4">
            <Link href={`/dashboard/contests/${contestInfo.contestId}`}
                className="text-sm underline font-semibold leading-6 text-gray-900">
                {contestInfo.contestName}
            </Link>
            <p>Start in {beforeStart}</p>
        </div>
    )
}

export default function UpcomingContests() { 
    const contestsInfo = useContext(contestsInfoContext)
    console.log("contestsInfo: "); 
    console.log(contestsInfo); 
    try {
        assert (contestsInfo != null); 
        console.log(contestsInfo); 
        return (
            <div className="w-full">
                {/* <h2>Upcoming Contests</h2> */}
                <ul className={`divide-y divide-gray-100`}>
                    {contestsInfo.map((contestInfo) => { 
                        if(contestInfo.startDate < new Date()) { 
                            return <></>; 
                        }
                        else { 
                            return <UpcomingContest contestInfo={contestInfo}></UpcomingContest>; 
                        }
                    })}
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

