const express = require('express');
const cookieParser = require('cookie-parser');
const {isLoggedIn} = require('./validation/authValidator')
// const User = require('./schema/userSchema')
// const bodyParser = require('body-parser');
const serverCongif = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute'); 
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const uploader = require('./middleware/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
// import fs module for file system operations
const fs = require('fs');
const productRouter = require('./routes/productRoute');

const app = express();
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.text()); // Middleware to parse text bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

//routing middleware
app.use('/users', userRouter);
app.use('/carts', cartRouter);  
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/ping', isLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({
        message: 'pong'
    })
});

app.post('/photo', uploader.single('IncomingFile'), async (req, res) => {
    console.log(req.file);
    //upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)
console.log('Result from cloudinary:', result);
    //delete the file from local storage
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully');
        }
    });
    return res.json({
        message: 'Photo uploaded successfully'
    });
})

app.listen(serverCongif.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverCongif.PORT}`);
});



