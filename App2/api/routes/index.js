const express = require("express");
const gamesController = require("../controllers/games.controllers");
const publisherController= require("../controllers/publisher.controllers");

console.log("here")
const router = express.Router();

router.route("/games/:gameId/publishers")
     .post(publisherController.addOnePublisher)
     
router.route("/games/:gameId/publishers/:publisherId")
      .get(publisherController.getOnePublisher)
      .put(publisherController.publisherFullUpdate)
       .delete(publisherController.deleteOnePublisher)  
      
module.exports= router;
