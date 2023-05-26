"use client"; 

import { contestInfoI } from "@/backend_api/contests"
import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { displayMili } from "../helper"
import { error } from "console";
import { contestsInfoContext } from "../layout";
import assert from "assert";

function PastContest({
    contestInfo
}: { 
    contestInfo: contestInfoI
}): JSX.Element {

    return (
        <div className="min-w-0 flex gap-x-4">
            <Link href={`/dashboard/contests/${contestInfo.contestId}`}
                className="text-sm font-semibold leading-6 text-gray-900">
                {contestInfo.contestName}
            </Link>
            <p>Ended at {contestInfo.endDate.toString()}</p>
        </div>
    )
}

export default function PastContests() { 
    const contestsInfo = useContext(contestsInfoContext)
    console.log("contestsInfo: "); 
    console.log(contestsInfo); 
    try {
        assert (contestsInfo != null); 
        console.log(contestsInfo); 
        return (
            <div className="w-full">
                <h2>Past Contests</h2>
                <ul className={`divide-y divide-gray-100`}>
                    {contestsInfo.map((contestInfo) => { 
                        if(contestInfo.endDate >= new Date()) { 
                            return <></>; 
                        }
                        else { 
                            return <PastContest contestInfo={contestInfo}></PastContest>; 
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

