var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const db = require("../db");

passport.use(
  new LocalStrategy({ 
    usernameField: 'email',   
    passwordField: 'password'
  },function(email, password, done) {
    console.log("using passport");
    db.one({
      text: 'SELECT * FROM "User" WHERE "Email" = $1', // can also be a QueryFile object
      values: [email]
    })
      .then(user => {
        return done(null, user);
      })
      .catch(error => {
        console.error("did not find user", error);
      });
    //   User.findOne({email: email}).then(function(user){
    //     if(!user || !user.validPassword(password)){
    //       return done(null, false, {errors: {'email or password': 'is invalid'}});
    //     }

    //     return done(null, user);
    //   }).catch(done);
  })
);
