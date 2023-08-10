"use client"; 

import { ReactNode } from "react";
import Headers from "./headers";
import SectionHeader from "../utils/section_header";
import { title } from "process";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { ContestInfoI, getAllContests } from "@/backend_api/contests";
import assert from "assert";

export default function GamesLayout({
    children
}: { 
    children: ReactNode
}) { 
    const sectionTabs = [
        {
            href:"/dashboard/games/list", 
            title:"List", 
            adminRequired:true, 
        }, 
        {
            href:"/dashboard/games/create" , 
            title:"Create", 
            adminRequired:true, 
        }
    ]
    /* put the contestsInfo here to reduce the number of fetch request. 
    Persist until rerender contest page / reload */
    // for ... in iterates through the keys, not the values


    return (
        <div className="w-full h-full">
            <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
            <div className="w-full h-full text-sm p-6">{children}</div>
        </div>
    )
}