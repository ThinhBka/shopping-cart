// app.js
require('dotenv').config();
// require dependencies
const bodyParser = require('body-parser');
const app = require('express')();
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/user.model');
const productRoute = require('./api/product');
const categoryRoute = require('./api/categories');
const authLoginRoute = require('./router/auth.router');
const forgotRoute = require('./router/forgot.router');
const checkTokenRoute = require('./router/checkToken.route');
const userRoute = require('./api/user');

// mongo key
const mongoURI = `mongodb+srv://Product:giadinhlaso1@cluster0-kvgbc.mongodb.net/shop?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
}

// Tạo kết nối tới database
mongoose.connect(mongoURI, options)
    .then(
        () => console.log('Database connection established'),
        err => console.log('Database connection unestablied, error occurred')
    )

// use middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/check', authLoginRoute);

app.use('/checkToken', checkTokenRoute);

app.use('/forgotPassword', forgotRoute)


app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/users', userRoute);

app.listen(9080, () => console.log('Server is starting'));