
import { getUserInfo } from "@/session_storage_api/api"
import Link from "next/link"

interface sectionTabI{ 
    href: string, 
    title: string, 
    adminRequired: boolean
}

export default function SectionTab({ 
    sectionTab, 
}: { 
    sectionTab: sectionTabI
}): JSX.Element { 
    return (

        <div className="h-full flex items-center justify-center hover:bg-gray-100 hover:border-b-2 hover:border-zinc-900">
            <Link href={sectionTab.href} className="text-lg text-gray-900">{sectionTab.title}</Link>
        </div>
    )
}

export type { 
    sectionTabI
}