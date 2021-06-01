const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField :'email'
},
function(email,password,done){
    User.findOne({email : email} , function(err , user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('invalid username / password');
            return done(null , false);
        }
        return done(null , user);
    });

}
));



// serialising the user which key is be kept in the cookies
passport.serializeUser(function(user,done){

    done(null, user.id);



});

// deserialize the user
passport.deserializeUser(function(id,done){
    User.findById(id , function(err , user){
        if(err){
            console.log('error in finding the user ');
        }
        return done(null,user);
    });
    
});



//check the user if authenticated or not 
passport.checkAuthentication = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}




module.exports = passport;