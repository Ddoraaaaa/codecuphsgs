"use client"; 

import { userInfoI } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import Image from "next/image";
import Link from "next/link";
export default function NavBar({
    userInfo
}: { 
    userInfo: userInfoI | null
}): JSX.Element { 
    return (
        <header className="bg-white">
            <nav className="flex items-center justify-between" aria-label="Global">
                <div className="flex justify-start items-center">
                    <div className="flex">
                        <Link href="/dashboard" className="">
                            <span className="sr-only">Hsgs Code Cup</span>
                            <Image className="h-24 w-auto" src={hsgs_logo} alt=""></Image>
                        </Link>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <Link href="/dashboard/contests" className="font-semibold leading-6 text-gray-950">Contests</Link>
                        <Link href="/dashboard/ranking" className="font-semibold leading-6 text-gray-950">Ranking</Link>
                    </div>
                </div>
                <div className="hidden pr-6 lg:flex lg:flex-1 lg:justify-end gap-x-12">
                    {(userInfo != null && 
                        <Link href="/dashboard/settings" className="font-semibold leading-6 text-gray-950">Settings</Link>)}
                    {(userInfo != null && 
                        <Link href="/authentication/logout" className="font-semibold leading-6 text-gray-950">Log out</Link>)}
                    {(userInfo == null && 
                        <Link href="/authentication/login" className="font-semibold leading-6 text-gray-950">Log in</Link>)}
                </div>
            </nav>
        </header>
    )
}