const mongoose = require("mongoose");
const Game = mongoose.model("Game");


module.exports.getOnePublisher = function(req, res) {

    const gameId = req.params.gameId;
        Game.findById(gameId).select("publisher").exec(function(err, publisher) {

            const response= {
                status:200,
                message:publisher,
            }
            if(err) {
                response.message= err;
                response.status = 500;
            } else if(!publisher) {
              
                response.message= "Publisher no found";
                response.status = 400;

            }

            res.status(response.status).json(response.message);

        });
}

const _addPublisher = function(req, res, game) {
  game.publisher.country = req.body.country;
  game.publisher.name = req.body.name;

  game.save(function(err, updatedGame) {

      const response= {
          status:204,
          message:updatedGame.publisher
      }
      if(err) {
          response.status=500;
          response.message=err;
         
      } 
      res.status(response.status).json(response.message);
  })
}

module.exports.addOnePublisher = function (req, res) {

  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 204,
      message: game
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!game) {
 
      response.status = 404;
      response.message = { "message": "Game is not found: " + gameId };
    }

    if (game) {
      _addPublisher(req, res, game);
    } else {
      res.status(response.status).json(response.message);
    }

  });

};

const _updatePublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
     
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.status  = 200
      response.message = updatedGame.publisher;
     
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.publisherFullUpdate = function (req, res) {
 
  const gameId = req.params.gameId;

  Game.findById(gameId).exec(function (err, game) {
    const response = {
      status: 204,
      message: game
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;

    } else if (!game) {
     
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    if (response.status != 204) {
      res.status(response.status).json(response.message);

    } else {
      console.log("Game found");
      _updatePublisher(req, res, game);

    }

  });
};

//PATCH
module.exports.publisherPartialUpdate = function(req, res) {
  
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function(err, publisher) {
      const response = {
          status: 204
      };

      if (err) {
          response.status = 500;
          response.message = err;

      } else if (!publisher) {
          response.status = 404;
          response.message = { statusMessage: "game not found!" };
      }
      if (response.status !== 204) {
          res.status(response.status).json(response.message);
          return;
      }

      _partialUpdateIngredients(publisher, req, res);
  });
};

const _partialUpdateIngredients = function(publisher, req, res) {

  if (req.body.name) 
      { dish.ingredients.name = req.body.name; }

  if (req.body.price) 
      { dish.ingredients.price = req.body.price; }
      if (req.body.location) 
      { dish.ingredients.location = req.body.location; }

  
  dish.save(function(err, updatedDish) {
      const response = {
          status: 204,
          message: updatedDish.ingredients
      };

      if (err) {
          response.status = 500;
          response.message = err;
      }
      res.status(response.status).json(response.message)
  });
};

module.exports.deleteOnePublisher=function(req, res){
 
  const gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, games) {
    const response = {
      status: 204,
      message: games
    };
    if (err) {
      
      response.status = 500;
      response.message = err;

    } else if (!game) {
     
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
      

      if (response.status != 204) {
        res.status(response.status).json(response.message);

      } else {
        _deletePublisher(req, res, game);

      }
    
  });
};
const _deletePublisher=function(req, res, game){
  
  game.publisher.remove();
  game.save(function(err, game){
    const response = {
      status: 200,
      message: game
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } 
    res.status(response.status).json(response.message);
  });
}