var http = require("http"),
  express = require("express"),
  cors = require("cors"),
  errorhandler = require("errorhandler"),
  db = require('./db');
  bodyParser = require('body-parser'),
  passport = require('passport');


// Create global app object
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors());
// support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));
app.use(errorhandler());

// require('./models/User');
// require('./models/Article');
// require('./models/Comment');
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(require("./routes"));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  console.log(err.stack);

  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: err
    }
  });
});

// finally, let's start our server...
var server = app.listen(process.env.PORT || 3001, function() {
  console.log("Listening on port " + server.address().port);
});
