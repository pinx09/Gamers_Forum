var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var gameModel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/post', function(req, res, next) {
  res.render('post');
});

router.get('/review', function(req, res, next) {
  gameModel.find()
  .then(function(gameData){
    console.log(gameData);
    res.render('review', {gameData});
  })
});

router.post("/submit", function(req, res, next) {
  const review = req.body.review;
  let content = `${review}`;
  gameModel.create({
    gameName: req.body.gamename,
    gameReview: req.body.review
  })
  .then(function(addedReview){
    console.log(addedReview);
    res.redirect("/review")
  })
  // fs.writeFile(path.join(__dirname, "../reviews.txt"), content, function(err) {
  //   if (err) {
  //     console.log(err);
  //   };
  // });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  gameModel.findById(id)
  .then(function(game) {
    res.render("edit", {game});
  });
});

router.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.body.gamename);
  gameModel.findByIdAndUpdate(id, {
    gameName: req.body.gamename,
    gameReview: req.body.review
  }, err => {
    if (err) {
      res.send(err);
    }
    else {
      res.redirect('/review');
    };
  });
});

router.get('/remove/:id', (req, res) => {
  const id = req.params.id;
  gameModel.findByIdAndRemove(id, err => {
    if (err) {
      res.send(err);
    }
    else {
      res.redirect('/review');
    };
  });
});

module.exports = router;
