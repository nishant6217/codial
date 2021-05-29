const User = require('../models/user');


module.exports.user =  function(req,res){
    return res.render('user_file',{
        title:"user profile"
    });
};

// // render the sign in page 
module.exports.signUp = function(req,res){
    return res.render('user_signup',{
       title:"codial | sign up" 
    });
};

// render the sign in page 
module.exports.signIn = function(req,res){
    return res.render('user_signin',{
        title:"codial | sign in"
    });
};

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!= req.body.confirm_pass){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up'); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating profile'); return};

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
    
};


// sign in 
module.exports.createSession =function(req,res){
    // todo later
};