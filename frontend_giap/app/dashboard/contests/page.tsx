"use client"; 

import Image from "next/image"
import Headers from "./headers"
import { redirect } from "next/navigation";
import { contestInfoI, getAllContests } from "@/backend_api/contests";
import { useEffect, useState } from "react";
import assert from "assert";
import UpcomingContests from "./upcoming_contests";
export default function ContestsPage() { 
    const [contestsInfo, setContestsInfo] = useState<contestInfoI[] | null> (null); 
    const [currentDate, setCurrentDate] = useState<Date>(new Date()); 

    async function updateContestsInfo() { 
        try { 
            let fetchResult = await getAllContests(); 
            if(fetchResult.success) { 
                assert(fetchResult.contestsInfo); 
                setContestsInfo(fetchResult.contestsInfo); 
            }
            else { 
                console.log(fetchResult.msg); 
            }
        } catch(error) { 
            console.log(error); 
        }
    }

    function updateCurrentDate() { 
        setCurrentDate(new Date());     
    }

    useEffect(() => { 
        try { 
            updateContestsInfo(); 
            updateCurrentDate(); 
        } catch(error) { 
            console.log(error); 
        }
    }, []); 

    return (
        <UpcomingContests contestsInfo={contestsInfo} currentDate={currentDate}></UpcomingContests>
        // <OngoingContests contestsInfo={contestsInfo}></OngoingContests>
        // <PastContests contestsInfo={contestsInfo}></PastContests>
    )
            {/* <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                    </img>
                    <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>
                </div>
                </li>
            </ul> */}
}