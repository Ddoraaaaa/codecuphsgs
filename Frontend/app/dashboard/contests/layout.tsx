"use client"; 

import { ReactNode } from "react";
import SectionHeader from "../components/section_header";
import { useLayoutEffect, useState } from "react";
import { createContext } from "react";
import { ContestInfoI, getAllContests } from "@/backend_api/contests";
import alertBackendAPIError from "@/app/utils/alertSystem/alertBackendAPIError";

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

const ContestsInfoContext = createContext<ContestInfoI[] | null>(null); 

export default function ContestsLayout({
    children
}: { 
    children: ReactNode
}) { 

    /* put the contestsInfo here to reduce the number of fetch request. 
    Persist until rerender contest page / reload */
    const [contestsInfo, setContestsInfo] = useState<ContestInfoI[] | null> (null); 

    async function refetchContestsInfo() { 
        try { 
            const contestsInfo = await getAllContests(); 
            setContestsInfo(contestsInfo); 
        }
        catch(error) { 
            alertBackendAPIError(error, "contestInfoRefetcher"); 
        }
    }

    useLayoutEffect(() => { 
        try { 
            refetchContestsInfo(); 
        } catch(error) { 
            alert(error); 
        }
    }, []); 

    return (
        <ContestsInfoContext.Provider value={contestsInfo}>
            <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
            {contestsInfo != null && <div className="w-full text-sm p-6">{children}</div>}
            {contestsInfo == null && <div>Loading...</div>}
        </ContestsInfoContext.Provider>
    )
}

export { 
    ContestsInfoContext
}