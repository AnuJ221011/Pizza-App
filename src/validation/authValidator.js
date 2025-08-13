const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

async function isloggedIn(req, res, next) {
    const token = req.cookies['authToken'];

    if (!token) {
        return res.status(401).json({
            message: "No auth token provided",
            success: false,
            data: {},
            error: "Not authenticated"
        });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({
            message: "Invalid auth token",
            success: false,
            data: {},
            error: "Not authenticated"
        });
    }

    // If reached here, user is authenticated and allow them to access the api
    req.user = {
        id: decoded.id,
        email: decoded.email
    }

    next();
}

module.exports = {
    isloggedIn
}