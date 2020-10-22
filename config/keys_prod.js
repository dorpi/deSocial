module.exports = {
    mongoURI:process.env.MONGO_URI,
    secretOrKey:process.env.SECRET_OR_KEY,
    SESS_NAME:process.env.SESS_NAME,
    SESS_SECRET = process.env.SESS_SECRET,
    SESS_LIFETIME = process.env.SESS_LIFETIME
}