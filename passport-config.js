const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql2');
var dbconfig= require('./database/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' +dbconfig.database);

module.exports=function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.username);
    });

    passport.deserializeUser(function(username, done){
        connection.query("SELECT * FROM users WHERE username = ? ", [username],
        function(err,rows){
            done(err,rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done){
           // console.log(password);
            connection.query("SELECT * FROM users WHERE username = ? ",
            [username], function(err, rows){
                if(err)
                return done(err);
                if(rows.length){
                    return done(null, false, req.flash('signupMessage', 'That is already taken'));
                }else{
                    //console.log(username);
                    var newUserMysql = {
                        username: username,
                        //fullname:name,
                        password: bcrypt.hashSync(password, null, null)
                        //password: password
                    };
                   // console.log(newUserMysql.password);
                    var insertQuery = "INSERT INTO users (username, password) values(?,?)";
                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],
                        function(err, rows){
                            //console.log(rows);
                            newUserMysql.id= rows.insertID;
                           // console.log(rows);
                            return done(null, newUserMysql);
                        });
                }
            });
        })
    );
    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done){
            connection.query("SELECT * FROM users WHERE username = ? ", [username],
            function(err, rows){
                if (err)
                return done(err);
                if (!rows.length){
                    return done(null, false, req.flash('loginMessage', 'No User found'));
                }
                if(!bcrypt.compareSync(password, rows[0].password))
               // if(password!== rows[0].password)
                return done(null, false, req.flash('loginMessage', 'wrong Password'));

                return done(null, rows[0]);
            });
        })
    );
};

// function initialize(passport, getUserByUsername){
//     const authenticateUser =(username, password, done)=>{
//         const user = getUserByUsername(username);
//         if(user==null){
//             return done(null, false, {message: 'No user with that email'})
//         }
//         try{
//             if (await(password==user.password)){
//                 return done(null, user);
//             } else{
//                 return done(null, false,{message:'password incorrect'});
//             }
//         }catch(err){
//             return done(error);
//         }
//     };
//     passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser));
//     passport.serializeUser((user, done)=>{});
//     passport.deserializerUser((user, done)=>{});
// }
// module.exports=initialize;