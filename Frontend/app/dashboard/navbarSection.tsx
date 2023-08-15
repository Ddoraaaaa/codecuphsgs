"use client"; 

import { UserInfo } from "@/session_storage_api/api";
import hsgs_logo from "../../public/logo.png"
import Image from "next/image";
import Link from "next/link";
export default function NavBarSection({
    href, children
}: { 
    href: string, 
    children: React.ReactNode
}): JSX.Element { 
    return (
        <div className="h-20 w-full flex flex-row justify-center items-center  leading-6 hover:font-semibold hover:underline hover:underline-offset-8">
            <Link href={href}
            >
                {children}
            </Link>
        </div>
    ); 
}