var express = require('express');
var router = express.Router();
const passport = require('passport');
const initializePassport = require('../passport-config');
var flash = require('connect-flash');
initializePassport(passport, username=>users.find() );
/* GET home page. */
router.post('/login', function(req, res) {
    res.render('authentication', { title: 'My Login', message:'' });
});
router.get('/login', function(req, res) {
    res.render('authentication', { title: 'My Login' , message:flash('loginMessage')});
});
router.post('/add', passport.authenticate('local-login', {
    sucessRedirect:'\profile',
    failureRedirect: '\login',
    failureFlash: true
}),
function(req,res){
    if(req.body.remember){
        req.session.cookie.maxAge = 1000 * 60 * 3;
    }else{
        req.session.cookie.expires = false;
    }
    res.redirect('/');
});
module.exports = router;