require('dotenv').config();
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const clientSessions = require("client-sessions");
const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.mongodbConn, {useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
    if(!err){
        console.log("MongoDB Connection Succeeded!");
    }
    else{
        console.log(err + "<-- ERROR!");
    }
});

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {  
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultlayout: "main"
}));
app.set("view engine", ".hbs");

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}));

app.use(clientSessions({
    cookieName: "session",
    secret: "web322_assignment",
    duration: 30 * 60 * 1000,
    activeDuration: 20 * 60 * 1000
}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
})

const homeController = require('./controllers/home');
const MPController = require('./controllers/MealPackage');
const registrationController = require('./controllers/registration');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logout')
const clerkdashController = require('./controllers/clerkDashboard');
const addController = require('./controllers/addmealpackage');
const selectController = require('./controllers/selectmealpackage');
const updateController = require('./controllers/updatemealpackage');
const userdashController = require('./controllers/userdashboard');
const descController = require('./controllers/mealpackagedesc');
const cartController = require('./controllers/shoppingcart');

app.use('/', homeController);
app.use('/MealPackage', MPController);
app.use("/CustomerRegistration", registrationController);
app.use("/Login", loginController);
app.use('/logout', logoutController);
app.use('/clerkDashboard', clerkdashController);
app.use('/addmealpackage', addController);
app.use('/selectmealpackage', selectController);
app.use('/updatemealpackage', updateController);
app.use('/userdashboard', userdashController);
app.use('/mealpackagedesc', descController);
app.use('/shoppingcart', cartController);

app.set("view engine", '.hbs');
app.listen(HTTP_PORT, onHttpStart);
