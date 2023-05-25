
import Link from "next/link"

interface sectionTabI{ 
    href: string, 
    title: string
}

export default function SectionTab({ 
    sectionTab
}: { 
    sectionTab: sectionTabI
}): JSX.Element { 
    return <Link href={sectionTab.href} className="text-sm underline leading-6 text-gray-900">{sectionTab.title}</Link>
}

export type { 
    sectionTabI
}