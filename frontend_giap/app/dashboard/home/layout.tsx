"use client";

import { useEffect, useState } from "react";
import { getUserInfo, userInfoI } from "@/session_storage_api/api";
import NavBar from "./navbar";
import BodyContainer from "./bodyContainer";
// import { getUserInfo } from "@/session_storage_api/api";
import { useRouter } from "next/router";
import SubsectionBodyContainer from "../utils/subsectionBodyContainer";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  
  return (
      <SubsectionBodyContainer>{children}</SubsectionBodyContainer>
  )
}
