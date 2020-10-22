module.exports = (req, res, next) => {
    
    if (!req.session.user) {
        //Redirect to login page
        return res.json("Not login")
    }
    else 
        req.user=req.session.user
   
    next();
}