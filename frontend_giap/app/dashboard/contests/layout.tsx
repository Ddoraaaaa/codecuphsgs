"use client"; 

import { ReactNode } from "react";
import Headers from "./headers";
import SectionHeader from "../section_header";
import { title } from "process";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { contestInfoI, getAllContests } from "@/backend_api/contests";
import assert from "assert";

const sectionTabs = [
    {
        href:"/dashboard/contests/upcoming", 
        title:"Upcoming", 
        adminRequired:false, 
    }, 
    {
        href:"/dashboard/contests/ongoing" , 
        title:"Ongoing", 
        adminRequired:false, 
    }, 
    {
        href:"/dashboard/contests/past", 
        title:"Past", 
        adminRequired:false, 
    }, 
    {
        href:"/dashboard/contests/create", 
        title:"Create", 
        adminRequired:true, 
    }
]

const contestsInfoContext = createContext<contestInfoI[] | null>(null); 

export default function ContestsLayout({
    children
}: { 
    children: ReactNode
}) { 

    /* put the contestsInfo here to reduce the number of fetch request. 
    Persist until rerender contest page / reload */
    const [contestsInfo, setContestsInfo] = useState<contestInfoI[] | null> (null); 

    async function refetchContestsInfo() { 
        try { 
            let fetchResult = await getAllContests(); 
            if(fetchResult.success) { 
                assert(fetchResult.contestsInfo); 
                console.log(typeof(fetchResult.contestsInfo[0].startDate))
                setContestsInfo(fetchResult.contestsInfo); 
            }
            else { 
                alert(fetchResult.msg); 
            }
        } catch(error) { 
            console.log(error); 
        }
    }

    useEffect(() => { 
        try { 
            refetchContestsInfo(); 
        } catch(error) { 
            alert(error); 
        }
    }, []); 

    return (
        <contestsInfoContext.Provider value={contestsInfo}>
            <div className="w-5/6 h-5/6 m-auto">
                <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
                <div className="w-full text-sm p-6">{children}</div>
            </div>
        </contestsInfoContext.Provider>
    )
}

export { 
    contestsInfoContext
}