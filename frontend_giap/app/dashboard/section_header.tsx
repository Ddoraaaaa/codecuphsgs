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
    return (
        <header className="bg-white">
            <nav className="flex items-center justify-start pr-6 gap-x-6" aria-label="Global">            
                {sectionTabs.map(sectionTab => <SectionTab sectionTab={sectionTab}></SectionTab>)}
            </nav>
        </header>
    )
}