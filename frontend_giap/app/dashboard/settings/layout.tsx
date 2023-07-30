"use client"; 

import { ReactNode } from "react";
import Headers from "./headers";
import SectionHeader from "../utils/section_header";
import { title } from "process";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { ContestInfoI, getAllContests } from "@/backend_api/contests";
import assert from "assert";
import BodyCon from "../section";
import SubsectionBodyContainer from "../utils/subsectionBodyContainer";

const sectionTabs = [
    {
        href:"/dashboard/settings/general", 
        title:"General", 
        adminRequired:false, 
    }
]

export default function SettingsLayout({
    children
}: { 
    children: ReactNode
}) { 

   
    return (
        <div className="w-full h-full">
            <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
            <SubsectionBodyContainer>
                {children}
            </SubsectionBodyContainer>
        </div>
    )
}