var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var assert=require('assert');
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({ extended:true });
var url='mongodb://localhost:27017/test';

var app= express();
app.use(urlencodedParser);

//login user
router.get('/login',function(req,res){
	var loginarray=[];
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		db.collection('RegisteredUser').find({"username":{$exists:true}}).toArray(function(err,doc){
			//assert.equal(null,err);
			//loginarray.push(doc);
			console.log(doc);
			console.log('logged in successfully');
			
		});
		});
		res.redirect('/highchart.html');
	});

 
//registered user
router.post('/register', urlencodedParser, function(req,res, next) {
	var user=(req.body);
	
	req.check();

	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		db.collection('RegisteredUser').insertOne(user, function(err,result){
			assert.equal(null,err);
			console.log('user inserted');
			
			db.close();
		});
		res.redirect('/login.html');
});
});	

router.get('/getdata',function(req, res){
	var resultArray=[];
	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		var cursor= db.collection('insertsensordata').find();
		cursor.forEach(function(doc,err){
			assert.equal(null,err);
			resultArray.push(doc);
		},function(){
			db.close();
			res.send(resultArray);
		});
		db.close();
	});
});


router.post('/insert', function(req,res, next) {
	var item=(req.body);
		mongo.connect(url,function(err,db){
		assert.equal(null,err);
		db.collection('insertsensordata').insertOne(item, function(err,result){
			assert.equal(null,err);
			console.log('item inserted');
			db.close();
		});
		res.redirect('/getdata');
});
	

});

module.exports = router;
