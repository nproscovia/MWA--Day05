const express = require("express");
const gamesController = require("../controllers/games.controllers");
const publisherController= require("../controllers/publisher.controllers");

console.log("here")
const router = express.Router();

//GAMES ROUTES:

router.route("/games")
     .get(gamesController.getallgames )
     .post(gamesController.addOneGame);

     router.route("/games/:gameId")
           .get(gamesController.getOneGame)
           .put(gamesController.gamesFullUpdateOne)
           .patch(gamesController.gamesPartialUpdateOne)
           .delete(gamesController.deleteOneGame);

//PUBLISHER ROUTES

router.route("/games/:gameId/publishers")
     .post(publisherController.addOnePublisher)
    
router.route("/games/:gameId/publishers/:publisherId")
      .get(publisherController.getOnePublisher)
      .put(publisherController.publisherFullUpdate)
      .patch(publisherController.publisherPartialUpdate)
       .delete(publisherController.deleteOnePublisher)  
      
module.exports= router;
