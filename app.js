var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator= require('express-validator');
var expressSession= require('express-session');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');
var urlencodedParser=bodyParser.urlencoded({ extended:true });


var router = express.Router();
app.use(bodyParser());
var mongoose    =   require("mongoose");
mongoose.Promise= global.Promise;
//connecting with mongoose
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  if(err) throw err;
  console.log("Connected correctly to server.");
  db.close();
});

var nameSchema = new mongoose.Schema({
 name: String,
 username: String,
 pass: String
});
var User = mongoose.model("User", nameSchema);



//getting homepage
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/login.html'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//here navigating to signup page
app.use(express.static(path.join(__dirname,'/views')));	

app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3001);
console.log("Running at port 3001");
module.exports = app;
