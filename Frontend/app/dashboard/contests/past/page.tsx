"use client"; 

import { ContestInfoI } from "@/backend_api/contests"
import { useContext } from "react"
import Link from "next/link"
import { ContestsInfoContext } from "../layout";
import assert from "assert";

function PastContest({
    contestInfo
}: { 
    contestInfo: ContestInfoI
}): JSX.Element {
    return (
        <div className="min-w-0 flex gap-x-4">
            <Link href={`/dashboard/contest/${contestInfo.contestId}`}
                className="text-sm underline font-semibold leading-6 text-gray-900">
                {contestInfo.contestName}
            </Link>
            <p>Ended at {contestInfo.endDate.toString()}</p>
        </div>
    )
}

export default function PastContests() { 
    const contestsInfo = useContext(ContestsInfoContext)
    console.log("contestsInfo: "); 
    console.log(contestsInfo); 
    try {
        assert (contestsInfo != null); 
        console.log(contestsInfo); 
        return (
            <div className="w-full">
                {/* <h2>Past Contests</h2> */}
                <ul className={`divide-y divide-gray-100`}>
                    {
                        contestsInfo
                            .filter(contestsInfo => contestsInfo.endDate < new Date())
                            .map((contestInfo) => 
                                <PastContest key={contestInfo.contestId} contestInfo={contestInfo}></PastContest>)
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

