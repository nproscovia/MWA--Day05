const mongoose = require("mongoose");
const Game = mongoose.model("Game");


module.exports.publishersGetAll = function (req, res) {
 
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 200,
      message: ""

    }

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { "message": "Game Id not found " + gameId };
    } else {
      response.message = game.publisher;
    }

    res.status(response.status).json(response.message);

  });
};

const _addPublisher = function (req, res, game) {
 
  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: game
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);

  });
};

module.exports.publishersAddOne = function (req, res) {
 
  const gameId = req.params.gameId;
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    const response = {
      status: 201,
      message: game
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else if (!game) {
   
      response.status = 404;;
      response.message = { "message": "Game id not found: " + gameId };
    }

    if (game) {
      _addPublisher(req, res, game);
    } else {
      res.status(response.status).json(response.message);
    }

  });

};

module.exports.publisherFullUpdate = function (req, res) {
 
  const gameId = req.params.gameId;
 
  console.log("PUT gameId", gameId);
  Game.findById(gameId).select("publisher").exec(function (err, game) {
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
    if (response.status !== 204) {
      res.status(response.status).json(response.message);

    } else {
      _updatePublisher(req, res, game);

    }

  });
};

const _updatePublisher = function (req, res, game) {

  game.publisher.name = req.body.name;
  game.publisher.country = req.body.country;
  game.save(function (err, updatedGame) {
    const response = {
      status: 200,
      message: game
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
};



module.exports.publisherDeleteOne=function(req, res){

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
  game.save(function(err, updatedGame){
    const response = {
      status: 200,
      message:game
    };
    if (err) {
      response.status = 500;
      response.message = err;

    } else {
      response.message = updatedGame;
    }
    res.status(response.status).json(response.message);
  });
}