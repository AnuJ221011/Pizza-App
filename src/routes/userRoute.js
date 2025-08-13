// Resource - User
// /users

const express = require('express');
const { createUser } = require('../controllers/userController');

// We have to initialise a router object to add routes in new file
// Routers are used to seggregate routes in different modules
const userRouter = express.Router(); 

userRouter.post('/', createUser) // This is a route registration

module.exports = userRouter; // Exporting the router object to use in app.js