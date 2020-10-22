const bcrypt = require('bcryptjs');
const config = require('../config/keys');
const fs = require('fs');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public

exports.registerUser = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar:'/profile-images/default.png',
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
}



// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
exports.loginUser = (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by email
    User.findOne({ email :req.body.email}).then(user => {
        // Check for user
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        }
        // Check Password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, name: user.name,email:user.email, avatar: user.avatar }; // Create JWT Payload
                req.session.user =payload;
             
                res.json({
                    success:true,
                    user:payload
                    })
           
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        })
        .catch(err=>{
            res.status(401).json(err);
        });
    });
}




exports.deleteUser = (req, res) => {
    //Delete also profile picture
    
    console.log(req.user)
    fs.unlink("./profile-images/"+req.user.email+".png",(err)=>{
        if (err){
            res.status(500).json({"message":"Can't delete user image"})
        }
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>{
                req.session.destroy(err => {
                    res.clearCookie(config.SESS_NAME)
                    res.json("User Deleted");
                  });
            })
            ;
          });
    })
  /*  */
  }

  exports.logoutUser = (req,res)=>{
    req.session.destroy(err => {
        res.clearCookie(config.SESS_NAME)
        //Add alert message to success
        res.json("User Logout");
      });
  }


// @route   GET api/users/
// @desc    Return current user
// @access  Private

  exports.getLoginUser = (req,res)=>{
     
      if (req.session.user)
        res.send(req.session.user);
      else res.send({})
  }

