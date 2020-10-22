const express = require('express');
const router = express.Router();
const isAuth =require('../../middleware/is-auth')
const userController = require('../../controllers/user')



router.post('/register',userController.registerUser);

router.post('/login', userController.loginUser);



router.delete('/delete',isAuth,userController.deleteUser);


router.post ('/logout',userController.logoutUser);

router.get("/",userController.getLoginUser);

module.exports = router;
