import { contestInfoI } from "@/backend_api/contests"
import Link from "next/link"
export default function ContestCard({ 
    currentDate, 
    contestInfo
}: { 
    currentDate: Date, 
    contestInfo: contestInfoI
}) { 
    return( 
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> */}
                {/* </img> */}
                <div className="min-w-0 flex-auto">
                    <Link href={`/dashboard/contests/${contestInfo.contestId}`}
                        className="text-sm font-semibold leading-6 text-gray-900">
                        {contestInfo.contestName}
                    </Link>
                    {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p> */}
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
                {/* <p className="text-sm leading-6 text-gray-900"> {contestInfo.startDate.toString()} - {contestInfo.endDate.toString()}</p> */}
                {/* <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p> */}
            </div>
        </li>
    )
}