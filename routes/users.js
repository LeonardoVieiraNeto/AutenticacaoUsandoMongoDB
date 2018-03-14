var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//console.log('Log 1 dentro do user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respondendo a solicitação.');
});

router.get('/register', function(req, res, next) {
  res.render('register',{title:'Registrar'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Usuário ou senha inválido'}),
  function(req, res) {
   req.flash('success', 'Você está logado!!!');
   res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Usuário não existente.'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Senha inválida'});
      }
    });
  });
}));

router.post('/register', upload.single('profileimage') ,function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file){
  	//console.log('Uploading File...');
  	var profileimage = req.file.filename;
  } else {
  	//console.log('No File Uploaded...');
  	var profileimage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name','Nome é obrigatório.').notEmpty();
  req.checkBody('email','Email é obrigatório.').notEmpty();
  req.checkBody('email','Email é não válido.').isEmail();
  req.checkBody('username','Username é obrigatório').notEmpty();
  req.checkBody('password','Senha é obrigatório.').notEmpty();
  req.checkBody('password2','As senhas não são iguais.').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else{
  	var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      //console.log(user);
    });

    req.flash('success', 'Você está cadastrado e pronto para logar!!');

    res.location('/');
    res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Você não está logado!!!');
  res.redirect('/users/login');
});

module.exports = router;
