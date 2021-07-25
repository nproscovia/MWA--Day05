const express = require("express");
const gamesController = require("../controllers/games.controllers");
const publisherController= require("../controllers/publisher.controllers");
const reviewController = require("../controllers/review.controllers");

console.log("here")
const router = express.Router();
//GAME ROUTES

router.route("/games")
     .get(gamesController.getallgames )
     .post(gamesController.addOneGame);

     router.route("/games/:gameId")
           .get(gamesController.getOneGame)
           .put(gamesController.gamesFullUpdateOne)
           .patch(gamesController.gamesPartialUpdateOne)
           .delete(gamesController.deleteOneGame);


  //REVIEW ROUTES
     router.route("/games/:gameId/reviews")
      .get(reviewController.getAllReviews)
      .post(reviewController.addOneReview)

router.route("/games/:gameId/reviews/:reviewId")
      
      .put(reviewController.reviewsFullUpdate)
      .delete(reviewController.deleteOneReview);


           
module.exports= router;
