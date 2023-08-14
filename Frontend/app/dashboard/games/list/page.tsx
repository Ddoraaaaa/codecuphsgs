"use client";

import alertBackendAPIError from "@/app/utils/alertSystem/alertBackendAPIError";
import { GameInfoI, getAllGamesInfo } from "@/backend_api/games";
import { useEffect, useState } from "react";

 

export default function GameListPage() {

    const [gameInfos, setGameInfos] = useState<null | Array<GameInfoI> >(null); 

    async function fetchGameInfo() {
        try { 
            const gamesInfo = await getAllGamesInfo(); 
            
            setGameInfos(gamesInfo);
        } catch(error: any) { 
            alertBackendAPIError(error, "gamesInfoFetcher"); 
        }
    }

    useEffect(() => { 
        fetchGameInfo(); 
    }, []); // run only once when mounted

    return (
        <div>
            {
                gameInfos == null? 
                    "No games found": 
                    <ul>
                        {gameInfos.map((gameInfo, index) => <li key={index}> #{gameInfo.id} <a href={`/dashboard/game/${gameInfo.id}`}> <u>{gameInfo.name}</u></a> </li>)}
                    </ul>
            }
        </div>
    )
}