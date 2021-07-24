const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getAllReviews = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = {
            status: 200,
            message: game

        }
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = { "message": "Game Id not found " + gameId };
        } else {
            response.message = game.review;
        }
        res.status(response.status).json(response.message);

    });
};

const _addReview = function (req, res, games) {
    
    game.save(function (err, updatedGame) {
        const response = {
            status: 200,
            message: games
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

module.exports.addOneReview = function (req, res) {
    
    const gameId = req.params.gameId;
    Game.findById(gameId).select("review").exec(function (err, game) {
        const response = {
            status: 201,
            message: game
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
           
            response.status = 404;;
            response.message = { "message": "Game not found" + gameId };
        }

        if (game) {
            _addReview(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }

    });

};

module.exports.reviewsFullUpdate = function (req, res) {
  
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("review").exec(function (err, game) {
        
        const response = {
            status: 204,
            message: game
          };
          if (err) {
            response.status = 500;
            response.message = err;
      
          } else if (!game) {
           
            response.status = 500;
            response.message = { "message": "Game ID not found" };
          }
          if (response.status != 204) {
            res.status(response.status).json(response.message);
      
          } else {
           
            _updateReview(req, res, game);
      
          }

    });
};

const _updateReview = function (req, res, game) {

    Game.updateOne(gameId).exec(function (err, updatedGame) {
        const response = {
            status: 204,
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


module.exports.deleteOneReview = function (req, res) {
   
    const gameId = req.params.gameId;

    Game.findById(gameId).select("review").exec(function (err, game) {
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
            _deleteReview(req, res, game);

        }

    });
};
const _deleteReview = function (req, res, game) {
    const reviewId = req.params.reviewId;
    const review = game.review.id(reviewId);

    review.remove();
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


}