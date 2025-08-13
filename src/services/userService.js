const { findUser, createUser } = require("../repositories/userRepository");


    async function registerUser(userDetails) {
        console.log("Hitting the user service registerUser method");
        // It will create a new user in the database

        // 1. We need to check if the user with the same email and mobile number already exists or not
        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        // 2. If exists, we will throw an error
        if(user) {
            throw {
                reason :'User with this email and mobile number already exists',
                statusCode: 400
            };
        }
        // . If not exists, we will create a new user in the db
        const newUser = await createUser({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber,
            password: userDetails.password
        });

        if(!newUser) {
            throw {
                reason: 'Something went wrong, user creation failed',
                statusCode: 500
            };
        }

        // 4. We will return the details of the created user

        return newUser;
    }

    module.exports = {
        registerUser
    }