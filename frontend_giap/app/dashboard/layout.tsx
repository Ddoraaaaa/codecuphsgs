"use client";

import NavBar from "./navbar";
import { getUserInfo } from "@/session_storage_api/api";
import { useRouter } from "next/router";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  
    const userInfo = getUserInfo(); 
    return (
        <div className="w-full h-full bg-white">
            <NavBar userInfo={userInfo}></NavBar>
            <div className="w-5/6 h-5/6 m-auto">
                {children}
            </div>
        </div>
  )
}
