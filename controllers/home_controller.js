const post = require("../models/post");

module.exports.home = function(req,res){

    // console.log(req.cookies);
    // res.cookie('user_id' , 25);
    // post.find({} , function(err,posts){
    //     return res.render('home',{
    //         title: "Codial || Home",
    //         posts :posts
    //     });


    // });

    // populate the user of wach post
    post.find({}).populate('User').exec(function(err,posts){
        return res.render('home',{
            title: "Codial || Home",
            posts :posts 
    });
})


    
};