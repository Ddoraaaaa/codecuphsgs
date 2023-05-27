"use client"; 

import { ReactNode } from "react";
import Headers from "./headers";
import SectionHeader from "../section_header";
import { title } from "process";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { contestInfoI, getAllContests } from "@/backend_api/contests";
import assert from "assert";
import Section from "../section";

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
        <div className="w-5/6 h-5/6 m-auto">
            <SectionHeader sectionTabs={sectionTabs}></SectionHeader>
            <Section>
                {children}
            </Section>
        </div>
    )
}