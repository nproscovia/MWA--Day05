const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year:Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price:Number,
    minPlayer: {
        type: Number,
        min:1,
        max:10
    },
    maxPlayers: {
        type: Number,
        min:1,
        max: 10,
    },
    minAge: {
        type: Number,
        min: 4
    },
    designer:String
});


mongoose.model("Game", gamesSchema, "games");