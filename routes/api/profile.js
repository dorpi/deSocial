const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/is-auth')

const profileController = require('../../controllers/profile')
const userController = require('../../controllers/user')





router.get('/all', profileController.getAllProfiles);

router.get('/',
  isAuth,
  profileController.getCurrentUserProfile
);


router.get('/handle/:handle', profileController.getProfileByHandle);


router.get('/:user_id',
  profileController.getProfileById);

router.post('/', isAuth,
  profileController.createOrEditProfile);


router.post(
  '/experience',
  isAuth,
  profileController.addExperience
);

router.post('/education',isAuth,
  profileController.addEducation);

router.delete('/experience/:exp_id',
isAuth,
  profileController.deleteExperience);


router.delete('/education/:edu_id',
isAuth,
  profileController.deleteEducation);


module.exports = router;
