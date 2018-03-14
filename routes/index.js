var express = require('express');
var router = express.Router();

//console.log('Log 1 dentro do index.js');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  //console.log('Dentro do GET do index.js');
  res.render('index', { title: 'Members' });
});

//console.log('Log 2 dentro do index.js');

function ensureAuthenticated(req, res, next){
	//console.log('Dentro da function ensureAuthenticated');
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
