const express = require('express');
const router =  express.Router();


// @route GET api/users/test
// @ desc Tests user route
// @access public

router.get('/test',(req,res)=> res.json({msg:"Users Works"}));  //output json


module.exports= router;