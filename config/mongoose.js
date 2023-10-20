const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user-details');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error is connecting to DB'));
db.once('open',function(){
    console.log('successfully connected to DB');
})