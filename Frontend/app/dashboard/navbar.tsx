"use client"; 

import { UserInfo } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import Image from "next/image";
import Link from "next/link";
import NavBarSection from "./navbarSection";
export default function NavBar({
    userInfo
}: { 
    userInfo: UserInfo | null
}): JSX.Element { 
    return (
        <nav className="h-full w-full flex-col items-center justify-start text-white text-sm bg-black overflow-hidden" >
            <NavBarSection href="/dashboard">
                <span className="sr-only">Hsgs Code Cup</span>
                <Image className="h-24 w-full" src={hsgs_logo} alt=""></Image>
            </NavBarSection>
            <NavBarSection href="/dashboard/contests" >Contests</NavBarSection>
            <NavBarSection href="/dashboard/games">Games</NavBarSection>
            {(userInfo != null && 
                <NavBarSection href="/dashboard/settings">Settings</NavBarSection>)}
            {(userInfo != null && 
                <NavBarSection href="/authentication/logout">Logout</NavBarSection>)}
            {(userInfo == null && 
                <NavBarSection href="/authentication/login">Login</NavBarSection>)}
        </nav>
    )
}