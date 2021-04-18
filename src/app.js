require('dotenv').config()
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require ("body-parser");
const compression = require("compression");
const logger = require("morgan");
const mainRoutes = require("./backend/routes/routes"); 
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const app = express();
const multer = require('multer');
const userController = require('./backend/controllers/userController');
const doctorController = require('./backend/controllers/doctorController');
const hospitalController = require('./backend/controllers/hospitalController.js'); 
const authenticationController = require("./backend/controllers/authenticationController");
app.use(cookieParser());



app.use(session({
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: null
    } 
}));

app.use(express.static(path.join(__dirname,"client")));
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("views",__dirname+"/client/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine","ejs");
app.use(logger("dev"));
app.use("/",mainRoutes);
app.set("port",process.env.PORT || 5000)

let mongoose = require('mongoose');

const uri = "mongodb+srv://Tvastra:sgoc.2030@cluster0.w2dnb.mongodb.net/Tvastra?retryWrites=true&w=majority";

mongoose.connect(uri, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => {console.log('DB Connection Established')});;

app.listen(app.get("port"), ()=>{
    console.log("Application started Listenng on ", app.get("port"))
});



app.get('/', authenticationController.redirectLogin2, authenticationController.checkOnboarding, authenticationController.redirectAdmin, (req, res) => {
	res.render('index.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
});

// Authentication Routes
app.get('/email-login', authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('email-login.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType });
});

app.post('/email-login', authenticationController.redirectToRespectiveHome, authenticationController.emailLogin);


app.get('/phone-login', authenticationController.checkCancel, authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('phone-login.ejs', {error: req.session.error || '', session: req.session, errorType: req.session.errorType});
	req.session.error = "";
});

app.post('/phone-login', authenticationController.redirectToRespectiveHome, authenticationController.phoneLogin);


app.get('/signup', authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('signup.ejs', {session: req.session});
});

 
app.post('/signup', authenticationController.redirectToRespectiveHome, authenticationController.signUp);
 
app.get('/doctor-onboarding', authenticationController.onBoardingDone, (req, res) => {
	res.render('doctor_onboarding.ejs', { session: req.session, error: req.session.error, errorType: req.session.errorType });
});

app.get('/otp', (req, res) => {
	res.render('otp.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType});
})

app.post('/otp', authenticationController.checkOTP, authenticationController.redirectToRespectiveHome);

app.put('/resend-otp', authenticationController.cancelOldOTP);



app.post('/forgot-password', authenticationController.checkIfUserExists, authenticationController.phoneLogin)

app.get('/create-new-password', authenticationController.redirectToRespectiveHome, (req, res) => {
	res.render('create_new_password.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType});
})

app.post('/create-new-password', authenticationController.changePassword);

app.get('/logout', authenticationController.logout);

app.get('/autoCompleteHospital', hospitalController.autoCompleteHospitals);

app.post('/', authenticationController.redirectLogin2, authenticationController.redirectAdmin, userController.addDoctorDetails);

app.put('/disable-error', authenticationController.clearError);


//nav to pages


app.get('/doctors', authenticationController.redirectLogin, (req, res) => {
	res.render('doctor.ejs', {dateFromServer: res.locals.currentDate, currentDay: res.locals.currentDay , doctors : res.locals.doctors, session: req.session, filter: req.session.filters ?  req.session.filters : '', sort: req.session.sortBy ?  req.session.sortBy : '', filters: res.locals.allFilters});
});

app.get('/hospitals', authenticationController.redirectLogin, hospitalController.getAllHospitals, (req, res) => {
	res.render('hospital.ejs', {hospital : res.locals.hospitals, session: req.session});
});

app.get('/about', authenticationController.redirectLogin, (req, res) => {
	res.render('aboutus.ejs', {session: req.session});
});

app.get('/treatments', authenticationController.redirectLogin, (req, res) => {
	res.render('dentistry.ejs', {session: req.session});
});


app.get('/contact-us', authenticationController.redirectLogin, (req, res) => {
	res.render('contactus.ejs', {session: req.session});
});


app.get('/hospital-details', (req, res) => {
	res.render('about-hospital.ejs', {session: req.session});
});



app.post('/add-filters', doctorController.doctorFilters);




module.exports = app;
