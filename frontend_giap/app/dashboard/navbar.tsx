"use client"; 

import { userInfoI } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import Image from "next/image";
import Link from "next/link";
import NavBarSection from "./navbarSection";
export default function NavBar({
    userInfo
}: { 
    userInfo: userInfoI | null
}): JSX.Element { 
    return (
        <header className=" h-16 w-full mb-2 bg-black text-white">
            <nav className="h-full w-full flex items-center justify-between" aria-label="Global">
                <div className="h-full w-full flex justify-start items-center">
                    <NavBarSection href="/dashboard">
                        <span className="sr-only">Hsgs Code Cup</span>
                        <Image className="h-24 w-auto" src={hsgs_logo} alt=""></Image>
                    </NavBarSection>
                    <div className="h-full w-full flex">
                        <NavBarSection href="/dashboard/contests" >Contests</NavBarSection>
                        <NavBarSection href="/dashboard/games">Games</NavBarSection>
                        {/* <NavBarSection href="/dashboard/ranking">Ranking</NavBarSection> */}
                    </div>
                </div>
                <div className="w-full h-full flex justify-end">
                    {(userInfo != null && 
                        <NavBarSection href="/dashboard/settings">Settings</NavBarSection>)}
                    {(userInfo != null && 
                        <NavBarSection href="/authentication/logout">Log out</NavBarSection>)}
                    {(userInfo == null && 
                        <NavBarSection href="/authentication/login">Log in</NavBarSection>)}
                </div>
            </nav>
        </header>
    )
}