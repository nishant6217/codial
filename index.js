const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mogoose');

// used for session cookies 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require ('./config/passport-local-strategy');

const MongoStore = require('connect-mongodb-session')(session);




app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayout);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up the view enjine,
app.set('view engine' , 'ejs');
app.set('views' ,'./views');

// mongo store is used to save the session cookie in mongo db 





app.use(session({
    name:'codial',
    // todo change the secret before daeployment in production mode 
    secret : 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store : new MongoStore({
        
            mongooseConnection : db,
            autoRemove :'disables'
        
    },
    function(err){
        console.log(err || 'coonect-mongo-db ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router from routes index .js
app.use('/' , require('./routes'));




app.listen(port , function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on ${port}`);
});