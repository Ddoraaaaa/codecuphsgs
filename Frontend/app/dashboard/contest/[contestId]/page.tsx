"use client"; 

import { redirect } from "next/navigation";

export default function contestDetailPage({params}: {params: {contestId: string}}) { 
    // const searchParams = useSearchParams(); // this can be helpful in the future. 
    redirect(`/dashboard/contest/${params.contestId}/overview`);
}