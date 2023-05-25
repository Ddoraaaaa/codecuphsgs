"use client"; 

import { ReactNode } from "react";
import SectionHeader from "../../section_header";
import { useParams, usePathname } from "next/navigation";
export default function ContestDetailsLayout({
    children
}: { 
    children: ReactNode
}) { 
    const params = useParams(); 
    const path = "/dashboard/contests/" + params.contestId

    const sectionTabs = [
        { 
            title: "Overview", 
            href: path + "/overview"
        }, 
        { 
            title: "Statement", 
            href: path + "/statement"
        }, 
        { 
            title: "Submit", 
            href: path + "/submit", 
        }, 
        { 
            title: "Submissions", 
            href: path + "/submissions"
        }
    ]; 
    
    return (
        <div className="h-full w-full">
            <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
            {children}
        </div>
    )
}