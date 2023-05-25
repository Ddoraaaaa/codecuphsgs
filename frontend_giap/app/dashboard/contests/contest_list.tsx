import { contestInfoI } from "@/backend_api/contests";
import ContestCard from "./contest_card";
import { useEffect } from "react";
import assert from "assert";

export default function ContestList({
    listTitle, 
    contestsInfo, 
    startDateRange, 
    endDateRange, 
    currentDate
}: { 
    listTitle: string, 
    contestsInfo: contestInfoI[], 
    startDateRange: [Date | null, Date | null], 
    endDateRange: [Date | null, Date | null], 
    currentDate: Date
}) { 
    useEffect(() => { 
        console.log("contestInfo")
        console.log(contestsInfo); 
        // assert(contestsInfo != null); 
    })
    try {
        return (
            <div className="w-full">
                <h2>{listTitle}</h2>
                <ul role="list" className="divide-y divide-gray-100">
                    {contestsInfo.map(contestInfo=> <ContestCard contestInfo={contestInfo} currentDate={currentDate}></ContestCard>)}
                </ul>
            </div>
        )
    }
    catch { 
        return "failed"; 
    }
}