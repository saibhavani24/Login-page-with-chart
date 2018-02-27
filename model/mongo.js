var express= require('express');
var mongoose    =   require("mongoose");
//var mongoOp     =   require("./model/mongo");
var app=express();
mongoose.connect('mongodb://localhost:27017/sensor');
console.log("Connected to server");
// create instance of Schema
var mongoSchema =   mongoose.Schema;

// create schema
 var RegSchema = mongoose.Schema({
        Name: String,
        UserName: String,
        Password: String                
    }, { collection: 'sensoruser' });

var UserReg= mongoose.model('UserReg',RegSchema);

 app.post('/',function(req,res){
 var UserAdd = new UserReg({
        Name: req.body.name,
        UserName: req.body.UserName,
        Password: req.body.Password        
    });
 
 UserAdd.save(function (err, fluffy) {
        if (err) return console.error(err);
    });
});	

// create model if not exists.
module.exports = mongoose.model('UserReg',RegSchema);