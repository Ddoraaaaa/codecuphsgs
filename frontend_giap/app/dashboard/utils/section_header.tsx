"use client"; 

import { getUserInfo, userInfoI } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import SectionTab from "./section_tab";
import { sectionTabI } from "./section_tab";

export default function SectionHeader({
    sectionTabs
}: { 
    sectionTabs: sectionTabI[]
}): JSX.Element { 
    const userInfo = getUserInfo(); 

    const sectionTabFiltered = sectionTabs.filter(sectionTab => !sectionTab.adminRequired || (userInfo && userInfo.userIsAdmin)); 
    console.log(sectionTabFiltered); 

    return (
        <header className="h-12 w-full text-black">
            {/* If length is not converted to String -> lead to bug, I do not reall know why */}
            <nav className={`h-full w-full grid grid-cols-${sectionTabFiltered.length.toString()} items-center`}>            
                {sectionTabFiltered.map((sectionTab, index) => <SectionTab key={index} sectionTab={sectionTab}></SectionTab>)}
            </nav>
        </header>
    )
}