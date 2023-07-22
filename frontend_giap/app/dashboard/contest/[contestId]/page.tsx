"use client"; 

import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function contestDetailPage({params}: {params: {contestId: string}}) { 
    // const searchParams = useSearchParams(); // this can be helpful in the future. 
    redirect(`/dashboard/contest/${params.contestId}/overview`);
}