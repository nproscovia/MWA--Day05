const express = require("express");
const gamesController = require("../controllers/games.controllers");

console.log("here")
const router = express.Router();

router.route("/games")
     .get(gamesController.getallgames )
     .post(gamesController.addOneGame);

     router.route("/games/:gameId")
           .get(gamesController.getOneGame)
           .put(gamesController.gamesFullUpdateOne)
           .patch(gamesController.gamesPartialUpdateOne)
           .delete(gamesController.deleteOneGame);


 
module.exports= router;
