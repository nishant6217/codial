const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mogoose');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayout);
// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router from routes index .js
app.use('/' , require('./routes'))


// set up the view enjine,
app.set('view engine' , 'ejs');
app.set('views' ,'./views');




app.listen(port , function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on ${port}`);
});