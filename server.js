const express = require('express');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); //authentication module
const path = require('path');
const cors=require('cors');

const user= require('./routes/api/user');
const profile= require('./routes/api/profile');
const post= require('./routes/api/post');


const app= express();

//Cors enable
app.use(cors());





// Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));//middleware for parsing bodies from URL.
app.use(bodyParser.json()); //  middleware for parsing json objects

//DB config
const db = require('./config/keys').mongoURI


//connect to mongoDB
moongoose.connect(db)
.then(()=> console.log('MongoDB connected'))
.catch((err)=>console.log(err));

moongoose.set('useFindAndModify', false);



//Passport middleware for login authentication
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);



// Use Routes
app.use('/api/users',user);
app.use('/api/profile',profile);
app.use('/api/post',post);

//Server static assets if in production
if (process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static('client/build'))
}

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
})


const port = process.env.PORT  || 5000;

app.listen(port,()=> console.log(`Server running on port ${port}`));