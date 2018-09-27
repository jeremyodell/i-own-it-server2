var router = require("express").Router();
var passport = require("passport");
var auth = require("../auth");
const db = require('../../db');
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secret = "this is a really bad secret";





function User(first, last, email, pwd) {
  this.firstName = first;
  this.lastName = last;
  this.email = email;
  this.password = pwd;
  this.getInfo = function getInfo() {
    return "A " + this.color + " " + this.desc + ".";
  };

  this.getSaveUser = query = {
    text:
      'INSERT INTO "User"("First_name", "Last_name", "Email", "Password") VALUES($1, $2, $3, $4)',
    values: [this.firstName, this.lastName, this.email, this.password]
  };

  this.getUser = query = {
    text: 'Select * from "User" where "Email" = $1',
    values: [this.email]
  };
}



router.get("/user", function(req, res, next) {
  return res.json({ user: "jodell" });
  //   User.findById(req.payload.id).then(function(user){
  //     if(!user){ return res.sendStatus(401); }

  //     return res.json({user: user.toAuthJSON()});
  //   }).catch(next);
});

router.put("/user", auth.required, function(req, res, next) {
  //   User.findById(req.payload.id).then(function(user){
  //     if(!user){ return res.sendStatus(401); }
  //     // only update fields that were actually passed...
  //     if(typeof req.body.user.username !== 'undefined'){
  //       user.username = req.body.user.username;
  //     }
  //     if(typeof req.body.user.email !== 'undefined'){
  //       user.email = req.body.user.email;
  //     }
  //     if(typeof req.body.user.bio !== 'undefined'){
  //       user.bio = req.body.user.bio;
  //     }
  //     if(typeof req.body.user.image !== 'undefined'){
  //       user.image = req.body.user.image;
  //     }
  //     if(typeof req.body.user.password !== 'undefined'){
  //       user.setPassword(req.body.user.password);
  //     }
  //     return user.save().then(function(){
  //       return res.json({user: user.toAuthJSON()});
  //     });
  //   }).catch(next);
});

router.post("/users/login", function(req, res, next) {
    console.log('logging in');
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate("local", function(err, rv, info) {
    if (err) {
      return next(err);
    }

    if (rv) {
        const token = jwt.sign(rv, auth.secret);
        //const token = jwt.sign(user, 'bad_secret');
        return res.json({rv, token});
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post("/users/register", function(req, res, next) {
  console.log("req boyd", req.body);

  var user = new User(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password
  );

  db
    .query(user.getSaveUser)
    .then(result => {
        const token = jwt.sign(user, auth.secret);
        return res.json({rv, token});
    })
    .catch(e => {
      console.error(e.stack);
      res.json({ message: "unabel to save user", user: user });
      return res.status(500);
    });


});

module.exports = router;
