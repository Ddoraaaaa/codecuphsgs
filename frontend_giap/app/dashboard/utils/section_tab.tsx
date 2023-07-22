
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
    const userInfo = getUserInfo();
    return (

        <div>
            {( !sectionTab.adminRequired || (userInfo && userInfo.userIsAdmin)) && <Link href={sectionTab.href} className="text-sm underline leading-6 text-gray-900">{sectionTab.title}</Link>}
        </div>
    )
}

export type { 
    sectionTabI
}