



// Models
const Profile = require('../models/Profile');

//Validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

const isEmpty =require('../validation/is-empty')


const multer = require('multer');
const User = require('../models/User');
const MAX_SIZE = 3 * 1024 * 1024;



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "profile-images");
    },
    filename: (req, file, cb) => {
        cb(null, req.user.email+'.png')
    },
  });
  
const upload = multer({
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'),false);
        }
    },
    storage: storage,
  }).single('avatar')
  
  
  




// @route   GET api/profile
// @desc    Get current users profile
// @access  Private


exports.getCurrentUserProfile =  (req, res) => {
    const errors = {};
    
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
       
        if (!profile) {
          errors.profile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(500).json(err));
  }

  exports.getAllProfiles = (req, res) => {
    const errors = {};
  
    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.profile = 'There are no profiles';
          return res.status(404).json(errors);
        }
        
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  }

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
  exports.getProfileByHandle = (req, res) => {
    const errors = {};
  
    Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.profile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
  exports.getProfileById = (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.profile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err =>
        {
        res.status(404).json({profile: 'There is no profile for this user'} )
        }
      );
  }


  
// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

exports.createOrEditProfile = (req, res) => {
    upload(req,res,err=>{
      const {errors,isValid} = validateProfileInput(req.body);
      if (err){
        errors.avatar = err.message
        isValid=false;
      }
      if (!isValid ) {
        return res.status(400).json(errors);
      }

      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;
      
      if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
      }
  
     
      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
     
      if (req.file)
          User.findOneAndUpdate(
            {email:req.user.email},
            {$set:{"avatar": `/profile-images/${req.user.email}.png`}},
            ).then(user=>{
            if (user){
                console.log("The user changed: "+user);
            }
            else{
              console.log("user not found")
            }
          }).catch(err=>res.json(err))
         
    
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
      
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } 
      else {
       
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });    
    })
  }

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private

  exports.addExperience =  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }



// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
  exports.addEducation =(req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }



  exports.deleteExperience = (req, res) => {
    Profile.findOne({ user: req.user.id })
    .populate('user',['name','avatar'])
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }


  exports.deleteEducation = (req, res) => {
    Profile.findOne({ user: req.user.id })
    .populate('user',['name','avatar'])
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }