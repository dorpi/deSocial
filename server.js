const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('./config/keys')

const path = require('path');
const cors=require('cors');


// Routes
const user= require('./routes/api/user');
const profile= require('./routes/api/profile');
const post= require('./routes/api/post');



const app= express();



//Cors enable
app.use(cors({
  origin:['https://whispering-dawn-73999.herokuapp.com'],
  methods:['GET','POST','DELETE','PUT'],
  credentials: true // enable set cookie
}));




// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))  //middleware for parsing bodies from URL.
app.use(bodyParser.json());
//  middleware for parsing json objects

//DB config
const dbURI = config.mongoURI

//Sessions store in mongoDB
const store = new MongoDBStore({
    uri:config.mongoURI,
    collection: 'sessions',
    ttl: parseInt(config.SESS_LIFETIME)*100 
  });







// Static folder for images
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile-images', express.static(path.join(__dirname, 'profile-images')));




//connect to mongoDB
mongoose.connect(dbURI)
.then(()=> console.log('MongoDB connected'))
.catch((err)=>console.log(err));

mongoose.set('useFindAndModify', false);


// Session configuration
app.use(session({
    name: config.SESS_NAME,
    secret: config.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store:store,
    cookie: {
      secure:false,
      expires: parseInt(config.SESS_LIFETIME)*100
    }
  })
);





app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user.id)
      .then(user => {
        if (!user) {
          return next();
        }
      
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });


// Use Routes
app.use('/api/users',user);
app.use('/api/profile',profile);
app.use('/api/post',post);




//Server static assets if in production
if (process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static('client/build'))
}

const port = process.env.PORT  || 5000;
app.listen(port,()=> console.log(`Server running on port ${port}`));