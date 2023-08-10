"use client"; 

import { ReactNode } from "react";
import SectionHeader from "../../utils/section_header";
import { useParams, usePathname } from "next/navigation";
import SubsectionBodyContainer from "../../utils/subsectionBodyContainer";
export default function ContestDetailsLayout({
    children
}: { 
    children: ReactNode
}) { 
    const params = useParams(); // wait is this even possible
    // so useParams is different from useSearchParams. 
    const path = "/dashboard/contest/" + params.contestId

    const sectionTabs = [
        { 
            title: "Overview", 
            href: path + "/overview",
            adminRequired: false, 
            
        }, 
        { 
            title: "Statement", 
            href: path + "/statement",
            adminRequired: false, 
        }, 
        { 
            title: "Submit", 
            href: path + "/submit",
            adminRequired: false, 
        }, 
        { 
            title: "Results", 
            href: path + "/results",
            adminRequired: false, 
        }, 
        { 
            title: "Update", 
            href: path + "/update",
            adminRequired: true, 
        }
    ]; 
    
    return (
        <div className="w-full">
            <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
            <SubsectionBodyContainer>{children}</SubsectionBodyContainer>
        </div>
    )
}