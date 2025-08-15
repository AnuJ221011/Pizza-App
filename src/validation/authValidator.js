const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnauthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req, res, next) {
    const token = req.cookies['authToken'];

    if (!token) {
        return res.status(401).json({
            message: "No auth token provided",
            success: false,
            data: {},
            error: "Not authenticated"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded) {
            throw new UnauthorisedError();
        }
    
        // If reached here, user is authenticated and allow them to access the api
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }
    
        next();
    } catch(error) {
        return res.status(401).json({
                message: "Invalid auth token provided",
                success: false,
                data: {},
                error: error
            });
    }


}

//This middleware is used to check if the authenticated user is an admin
// Because we will call the Admin after isLoggedIn, thats why we will receive the user details
async function isAdmin(req, res, next){
    const loggedInUser = req.user;

    if(loggedInUser.role === 'ADMIN') {
        next();
    }
    else{
        return res.status(401).json({
            message: "You are not authorized to perform this action",
            success: false,
            data: {},
            error: {
                reason: "Unauthorized user",
                statusCode: 401
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}