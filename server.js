var express = require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var app = express();
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mittens');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
app.use(express.static('public')); 
var Meow = mongoose.model('Meow', {
 text: String
  });//comment1
app.get('/meows',function(req,res,next){
Meow.find({},function(err,meows){
return res.json(meows);
});
});
app.post('/meows', function(req, res, next){	
		var newMeow = new Meow({
			text: req.body.newMeow		
		});
		newMeow.save(function(err){
			return res.send("Added Successfully");
	});	
});
var User=mongoose.model('User', { 
username: String, password: String  });
var bcrypt = require('bcryptjs');
app.post('/users', function(req, res, next){	
	bcrypt.genSalt(10, function(err,salt){
		bcrypt.hash(req.body.password,salt,function(err,hash){
			console.log(hash);
			var newUser= new User({
				username: req.body.username,
				password: hash
			});
			newUser.save( function(err){
			return res.send();
	});
		});
	}) ;
});