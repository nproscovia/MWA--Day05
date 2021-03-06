const mongoose = require("mongoose");


const reviewSchema=new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
  
    review:{
      type: String,
     
    },
    date: {
       type: String, 
      
      },
  });
  
const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    country: String 
});

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
    designer:[String],

    publisher: publisherSchema,
    reviews: [reviewSchema]
});


mongoose.model("Game", gamesSchema, "games");
mongoose.model("Publisher", publisherSchema);
mongoose.model("Review", reviewSchema);