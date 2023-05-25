"use client"; 

import { ReactNode } from "react";
import Headers from "./headers";
export default function ContestsLayout({
    children
}: { 
    children: ReactNode
}) { 
    return (
        <div className="w-5/6 h-5/6 m-auto">
            {/* <Headers></Headers> */}
            {children}
        </div>
    )
}