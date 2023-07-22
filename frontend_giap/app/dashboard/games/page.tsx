import { redirect } from "next/navigation";

export default function GamesPage() { 
    redirect("/dashboard/games/list"); 
}