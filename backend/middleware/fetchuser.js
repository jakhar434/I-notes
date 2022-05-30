const jwt = require('jsonwebtoken');
const router = require('../Routes/auth');
const JWT_secret = 'thisisrajatcode';

const fetchuser = (req, res, next) => {
    // get the user from jwt token and fetch the id
    // get the token from header
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid user" });
    }
    try {

        // then verify the token and secret 
        const data = jwt.verify(token, JWT_secret);
        req.user = data.user;
        // in auth.js file to run the next async function
        next();
    }

    catch (error) {
        res.status(401).send({ error: "please authenticate using valid user" });
    }


}

module.exports = fetchuser;