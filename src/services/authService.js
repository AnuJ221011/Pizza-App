const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/serverConfig");

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. check if there is a register user with the given email
    const user = await findUser({email});

    console.log(user)

    if (!user) {
        throw {
            message: "No user found with this email",
            statusCode: 404
        };
    }
       
    // 2. If the user is found, then we need to compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);

    if (!isPasswordValid) {
        throw {
            message: "Invalid password, please try again",
            statusCode: 401
        };
    }

    // 3. If the password is valid, then we can return the user details
    const token = jwt.sign({
       id: user._id,
       email: user.email
    }, JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
}

module.exports = {
    loginUser
}