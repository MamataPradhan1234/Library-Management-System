const express=require('express');
const port=8000;
const app=express();

require('./config/mongoose');
require('./config/passport-jwt-strategy')
app.use(express.urlencoded({ extended: false }));

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error is running on server:${err}`);
    }
    console.log(`server is running on port:${port}`);
})
