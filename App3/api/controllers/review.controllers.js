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
            response.message = "Game id not found"
        } else {
            response.message = game.review;
        }
        res.status(response.status).json(response.message);

    });
};

const _addReview = function (req, res, game) {

       const newReview = {
           name: req.body.name,
           review: req.body.review,
           date: req.body.date
       }
    game.reviews.push(newReview);
    game.save(function (err, updatedGame) {
        const response = {
            status: 201,
            message: updatedGame
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
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = {
            status: 201,
            message: game
        };
        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!game) {
           
            response.status = 404;;
            response.message = "Game id not found"
        }

       else if (game) {
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
           
            response.status = 404;
            response.message ="Game id not found"
          }
          if (response.status != 204) {
            res.status(response.status).json(response.message);
            return;
      
          } else {
                    
                    const reviewUpdate = game.reviews.id(reviewId);
                   
                    if(req.body.name){
                        reviewUpdate .name = req.body.name;
                    }
                    if(req.body.review){
                        reviewUpdate.review = req.body.review;
                    }
                    if(req.body.date){
                        reviewUpdate.date = req.body.date;
                    } 
                    _updateReview(req, res, game)          
          }

    });
};

const _updateReview = function (req, res, game) {

    const gameId = req.params.gameId;

    Game.updateOne(gameId).exec(function (err, updatedGame) {
        const response = {
            status: 204,
            message: game
        };
        if (err) {
            response.status = 500;
            response.message = err;

        } else {
            response.message = game.reviews;

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
            response.message = "Game id not found"
        }
        if (response.status != 204) {
            res.status(response.status).json(response.message);

        } else {
            _deleteReview(req, res, game);

        }

    });
};
const _deleteReview = function (req, res, game) {

    console.log("yesssss")
    const reviewId = req.params.reviewId;
     console.log(game)
    console.log("game before")
    const review = game.review.id(reviewId);

    console.log(game)
    console.log("gameeees")

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