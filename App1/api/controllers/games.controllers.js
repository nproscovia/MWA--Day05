const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getallgames = function(req,res){

    console.log("getall games");
let count =5;
let offset = 0;

if(require.query && require.query.count){
    count = parseInt(req.query.count, 10);

}

if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
}

if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ "message": "Querystring offset " });
    return;
}

Game.find().skip(offset).limit(count).exec(function (err, games) {
    const response = {
        status: 201,
        message: games
    };
    if(err) {
        console.log("Error finding games", err);
       
        response.status = 500;
        response.message = err;
    }    
 
    res.status(response.status).json(response.message);
});
};


module.exports.getOneGame = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
      console.log("GET game  with gameid", gameId);
      res.status(200).json(game);
    });
  };


module.exports.addOneGame = function (req, res) {
    
    const newGame = {
        title: req.body.title,
        year: parseInt(req.body.year),
        rate: parseInt(req.body.rate),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        designers: req.body.designers
        
    };

    Game.create(newGame, function(err, game) {
        const response = {
            status: 201,
            message: game
        };

        if(err) {
            console.log("Error Creating game");
            response.status = 400;
            response.message = err;
        } 
        res.status(response.status).json(response.message);
    });
}



module.exports.gamesFullUpdateOne = function (req, res) {
    console.log("gamesFullUpdateOne requiest recieved")
    const gameId = req.params.gameId;
    

    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = {
            status: 204,
        };

        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { statusMessage: "game not found" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            
           game. title= req.body.title;
        game.year= parseInt(req.body.year);
        game.rate= parseInt(req.body.rate);
        game.price= parseFloat(req.body.price);
        game.minPlayers= parseInt(req.body.minPlayers);
        game.maxPlayers= parseInt(req.body.maxPlayers);
        game.minAge= parseInt(req.body.minAge);
        game.designers= req.body.designers;

            

            game.save(function (err, updatedGame) {
                const response={
                    status:204,
                    message:updatedGame
                }
                if (err) {
                    response.status = 500;
                    response.message = err;
                } 
                res.status(response.status).json(response.message);
            })


        }

    });
};


module.exports.gamesPartialUpdateOne = function (req, res) {
    console.log("gamesFullUpdateOne requiest recieved")
    const gameId = req.params.gameId;
    

    Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
        const response = {
            status: 204,
          
        };

        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 400;
            response.message = { statusMessage: "Game ID not found" };
        }

        if (response.status !== 204) {
            res.status(response.status).json(response.message);
            return;
        } else {
           
            if (req.body.title) {
                game.title = req.body.title;
            }
            
            if (req.body.price) {
                game.price = parseFloat(req.body.price);
            }
             
            if (req.body.year) {
                game.year = parseInt(req.body.year);
            }

            if (req.body.minPlayers) {
                game.minPlayers = parseInt(req.body.minPlayers);
            }

            if (req.body.maxPlayers) {
                game.maxPlayers = parseInt(req.body.maxPlayers);
            }

            if (req.body.minAge) {
                game.minAge = parseInt(req.body.minAge);
            }

            if (req.body.rate) {
                game.rate = parseInt(req.body.rate);
            }

            if (req.body.designers) {
                game.designers = req.body.designers;
            }


            game.save(function (err, updatedGame) {

                if (err) {
                    response.status = 500;
                    response.message = err;
                } 
                res.status(response.status).json(response.message);
            })


        }

    });
};



module.exports.deleteOneGame = function (req, res) {
  
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
      const response = {
        status: 200,
        message: deletedGame
      }
    
      if (err) {
      
        res.status = 500;
        response.message = error;
      } else if (!deletedGame) {
       
        response.status = 404;
        response.message =  "Game ID not found" ;
      }
      res.status(response.status).json({message: "Delete successful"});
    });
  }

