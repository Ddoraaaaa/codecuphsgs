"use client";

import { GameInfoI, getAllGamesInfo } from "@/backend_api/games";
import assert from "assert";
import { useEffect, useState } from "react";

 

export default function GameListPage() {

    const [gameInfos, setGameInfos] = useState<null | Array<GameInfoI> >(null); 

    async function fetchGameInfo() {
        const fetchResult = await getAllGamesInfo(); 
        if(fetchResult.success) { 
            const gamesInfo = fetchResult.gamesInfo; 
            assert(gamesInfo != undefined); 
            setGameInfos(gamesInfo);
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