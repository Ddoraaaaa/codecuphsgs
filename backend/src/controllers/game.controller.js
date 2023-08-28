import GameModel from "../models/game.model";

async function createGame(req, res, next) { 
    if(!req.session.userId || !req.session.isAdmin) { 
        return res.status(403).send({msg: "User is not admin"}); 
    }

    console.log(req.body); 

    const game = await GameModel.create({
        id: await GameModel.count() + 1, 
        name: req.body.name, 
        statementUrl: req.body.statementUrl, 
        renderUrl: req.body.renderUrl
    })

    if(!game) { 
        return res.status(409).send({msg: "Create game failed"}); 
    }

    return res.status(200).send({msg: "created game"}); 
}

function gameInfoRestrictedView(game) { 
    console.log(game); 
    return { 
        id: game.id, 
        name: game.name, 
        statementUrl: game.statementUrl, 
        judgeUrl: game.judgeUrl, 
        renderUrl: game.renderUrl
    }
}

function gameInfoUnrestrictedView(game) { 
    console.log(game); 
    return { 
        id: game.id, 
        name: game.name, 
        statementUrl: game.statementUrl, 
        judgeUrl: game.judgeUrl, 
        renderUrl: game.renderUrl
    }
}

async function getAllGames(req, res, next) { 
    const games = await GameModel.find(); 
    if(!req.session.userId || !req.session.isAdmin) { 
        return res.status(200).send({
            games: games.map(game => gameInfoRestrictedView(game)), 
            msg: "fetched game. user not admin"
        }); 
    }
    else { 
        return res.status(200).send({
            games: games.map(game => gameInfoUnrestrictedView(game)), 
            msg: "fetched game"
        }); 
    }
}

async function getGame(req, res, next) { 
    let gameId = req.params.gameId; 

    if(!gameId) { 
        return res.status(400).send({msg: "GameId missing"}); 
    }

    console.log("Game ID: " + gameId)

    const game = await GameModel.findOne({
        id: gameId
    })


    if(!game) { 
        return res.status(409).send({msg: "No such game"}); 
    }
    
    if(!req.session.userId || !req.session.isAdmin) { 
        console.log(gameInfoRestrictedView(game)); 
        return res.status(200).send({
            game: gameInfoRestrictedView(game), 
            msg: "fetched game"
        }); 
    }
    else { 
        console.log(gameInfoUnrestrictedView(game))
        return res.status(200).send({
            game: gameInfoUnrestrictedView(game), 
            msg: "fetched game"
        }); 
    }

}

export { 
    getAllGames, 
    getGame,
    createGame, 
}