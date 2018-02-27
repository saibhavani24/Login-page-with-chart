var express=require('express');
var router= express.Router();

router.get('/index',function(req,res,next){
	res.sendfile('login.html');
});

module.exports=router;