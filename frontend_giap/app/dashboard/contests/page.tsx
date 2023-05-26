"use client"; 

import Image from "next/image"
import Headers from "./headers"
import { redirect } from "next/navigation";
import { contestInfoI, getAllContests } from "@/backend_api/contests";
import { useEffect, useState } from "react";
import assert from "assert";
import UpcomingContests from "./upcoming/page";
export default function ContestsPage() { 
    redirect("/dashboard/contests/upcoming"); 
}