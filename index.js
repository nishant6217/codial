const express = require('express');
const app = express();

const port = 8000;

// use express router from routes index .js
app.use('/' , require('./routes'))


// set up the view enjine,
app.set('view enjine' , 'ejs');
app.set('views' ,'./views');




app.listen(port , function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on ${port}`);
});