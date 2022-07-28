var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/GameReviews')
.then(function(){
  console.log("Database had been successfully connected");
})
.catch(function(error){
  console.log(error);
});

let gameSchema = mongoose.Schema({
  gameName: String,
  gameReview: String
});

module.exports = mongoose.model('game', gameSchema);