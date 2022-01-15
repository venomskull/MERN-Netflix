const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => { // here user we given because in auth.js, const accessToken we give _id and isAdmin of user
            if (err) res.status(403).json('Token is not valid');
            req.user = user;
            next(); // go to the next/actual router
        });
    } else {
        res.status(401).json('You are not authenticated. No token provided');
    }
}

module.exports = verify;

