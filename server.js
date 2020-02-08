const express = require('express');
const moongoose = require('mongoose');
const users= require('./routes/api/users')
const profile= require('./routes/api/profile')
const posts= require('./routes/api/posts')

//DB config
const db = require('./config/keys').mongoURI


//connect to mongoDB
moongoose.connect(db)
.then(()=> console.log('MongoDB connected'))
.catch((err)=>console.log(err));

const app= express();

app.get ('/',(req,res)=> res.send("hello shit"));

// Use Routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);



const port = process.env.PORT  || 5000;

app.listen(port,()=> console.log(`Server running on port ${port}`));