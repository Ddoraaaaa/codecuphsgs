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
        <div className="w-full bg-white">
            <NavBar userInfo={userInfo}></NavBar>
            <div className="">
                {children}
            </div>
        </div>
  )
}
