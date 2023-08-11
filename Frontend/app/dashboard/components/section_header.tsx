"use client"; 

import { getUserInfo, userInfoI } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import SectionTab from "./section_tab";
import { sectionTabI } from "./section_tab";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SectionHeader({
    sectionTabs
}: { 
    sectionTabs: sectionTabI[]
}): JSX.Element { 
    const pathname = usePathname(); 
    const userInfo = getUserInfo(); 

    const [selectedIndex, setSelectedIndex] = useState(0); 

    const sectionTabFiltered = sectionTabs.filter(sectionTab => !sectionTab.adminRequired || (userInfo && userInfo.userIsAdmin)); 
    console.log(sectionTabFiltered); 

    return (
            // {/* If length is not converted to String -> lead to bug, I do not reall know why */}
        <nav className={`h-10 w-full grid grid-cols-12 items-center bg-gray-400`}>            
            {
                sectionTabFiltered.map((sectionTab, index) => 
                    <SectionTab 
                        key={index}
                        selected={pathname === sectionTab.href} 
                        sectionTab={sectionTab}>
                    </SectionTab>
                )
            }
        </nav>
    )
}