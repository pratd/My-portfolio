var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const initializePassport = require('../passport-config');
//initializePassport(passport, username );
var users=[];
/* GET home page. */
router.get('/register', function(req, res) {
    res.render('register', { title: 'Register', message: req.flash('signupMessage') });
});
// router.post('/addUser', function(req, res) {
//     try{
//         const hashedPassword = bcrypt.hash(req.body.password, 8);
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.username,
//             password: req.body.password
//         });
//         //console.log(users);
//         res.redirect('/login');
//     } catch(error) {
//         console.log(error);
//         res.redirect('/register');
//     }
// });
router.post('/addUser', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect:'/signup',
    failureFlash: true
}));
router.get('/profile', isLoggedIn, function(req,res){
    res.render('profile', {
        user:req.user
    });
});
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})
function isLoggedIn(req,res, next){
    if(req.isAuthenticated())
    return next();

    res.redirect('/');
}
module.exports = router;