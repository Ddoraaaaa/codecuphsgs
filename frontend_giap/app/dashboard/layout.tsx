"use client";

import { useEffect, useState } from "react";
import { getUserInfo, userInfoI } from "@/session_storage_api/api";
import NavBar from "./navbar";
import BodyContainer from "./bodyContainer";
// import { getUserInfo } from "@/session_storage_api/api";
import { useRouter } from "next/router";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  
  // sessionStorage only available after mounting -> useEffect to getUserInfo
  const [userInfo, setUserInfo] = useState<null | userInfoI>(null); 
  useEffect(() => { 
    setUserInfo(getUserInfo()); 
  }, [])
  return (
      <div className="w-full h-full bg-white">
          <NavBar userInfo={userInfo}></NavBar>
          <BodyContainer>
              {children}
          </BodyContainer>
      </div>
  )
}
