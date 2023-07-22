import { Bracket } from "../models/bracket.model";

async function createBracket(contestId, player1, player2) { 
    const bracket = new Bracket({ 
        id: await Bracket.count() + 1, 
        contestId, 
        player1, 
        player2
    }); 
    bracket.save(); 
}

export { 
    createBracket
}