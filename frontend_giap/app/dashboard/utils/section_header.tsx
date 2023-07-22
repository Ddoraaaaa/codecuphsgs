"use client"; 

import { userInfoI } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import SectionTab from "./section_tab";
import { sectionTabI } from "./section_tab";

export default function SectionHeader({
    sectionTabs
}: { 
    sectionTabs: sectionTabI[]
}): JSX.Element { 
    for(const i in sectionTabs) { 
        console.log("section tab: "); 
        console.log(sectionTabs[i]); 
    }
    return (
        <header className="text-black">
            <nav className="flex items-center justify-start pr-6 gap-x-6" aria-label="Global">            
                {sectionTabs.map((sectionTab, index) => <SectionTab key={index} sectionTab={sectionTab}></SectionTab>) /* using index as key, will need to be fixed later. */}
            </nav>
        </header>
    )
}