// config express & mongodb
var express = require("express");
var mongo = require('mongodb');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var app=express();


var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('sensor', server);


//open connection of db

db.open(function(err,db){
				if(!err)
				{
					console.log(" connected to 'sensor' db");
					
					db.collection('sensor',{strict:true},function (err,collection)
										{
											if(err)
											{
												console.log("The 'sensor' collection unavilable..!");
											}
										});


				}
			});

exports.addInfo = function (req, res) {
    var sensorRecord = req.body;
    db.collection('sensor', function (err, collection) {
        collection.insert(sensorRecord, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send("Successfully Add sensorRecord");
                console.log("Add Record");
            }
        });
    });
}