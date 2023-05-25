import Image from "next/image"
import Link from "next/link"
export default function Headers() { 
    return (
        <header className="bg-white w-full">
            <nav className="flex items-center justify-between lg:gap-x-12" aria-label="Global">
                <Link href="/dashboard/contests/upcoming" className="text-sm font-semibold leading-6 text-gray-900">Upcoming contests</Link>
                <Link href="/dashboard/contests/ongoing" className="text-sm font-semibold leading-6 text-gray-900">Ongoing contests</Link>
                <Link href="/dashboard/contests/past" className="text-sm font-semibold leading-6 text-gray-900">Past contests</Link>
            </nav>
        </header>
    )
}