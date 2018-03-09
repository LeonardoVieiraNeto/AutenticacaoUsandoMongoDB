var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//console.log('Aqui 1');

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://teste:teste@cluster0-shard-00-00-pz9ja.mongodb.net:27017,cluster0-shard-00-01-pz9ja.mongodb.net:27017,cluster0-shard-00-02-pz9ja.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
  console.log('Dentro do método connect');
  if (err) {
  	console.log('Dentro do erro');
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});


//console.log('Aqui 2');

// mongoose.connect('mongodb://<USERNAME>:<PASSWORD>@cluster0-shard-00-00-pz9ja.mongodb.net:27017,cluster0-shard-00-01-pz9ja.mongodb.net:27017,cluster0-shard-00-02-pz9ja.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

// var db = mongoose.connection;

// // User Schema
// var UserSchema = mongoose.Schema({
// 	username: {
// 		type: String,
// 		index: true
// 	},
// 	password: {
// 		type: String
// 	},
// 	email: {
// 		type: String
// 	},
// 	name: {
// 		type: String
// 	},
// 	profileimage:{
// 		type: String
// 	}
// });

// var User = module.exports = mongoose.model('User', UserSchema);

// module.exports.getUserById = function(id, callback){
// 	User.findById(id, callback);
// }

// module.exports.getUserByUsername = function(username, callback){
// 	var query = {username: username};
// 	User.findOne(query, callback);
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     	callback(null, isMatch);
// 	});
// }

// module.exports.createUser = function(newUser, callback){
// 	bcrypt.genSalt(10, function(err, salt) {
//     	bcrypt.hash(newUser.password, salt, function(err, hash) {
//    			newUser.password = hash;
//    			newUser.save(callback);
//     	});
// 	});
// }