const express = require ("express");
const mainController = require("../controllers/mainController");

const authenticationController = require("../controllers/authenticationController");
const router = express.Router();
const app = express();


// app.get('/', authenticationController.redirectLogin2, authenticationController.checkOnboarding, authenticationController.redirectAdmin, (req, res) => {
// 	res.render('index.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
// });

// // Authentication Routes
// app.get('/email-login', authenticationController.redirectToRespectiveHome, (req, res) => {
// 	res.render('email-login.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType });
// });

// app.post('/email-login', authenticationController.redirectToRespectiveHome, authenticationController.emailLogin);


// app.get('/phone-login', authenticationController.checkCancel, authenticationController.redirectToRespectiveHome, (req, res) => {
// 	res.render('phone-login.ejs', {error: req.session.error || '', session: req.session, errorType: req.session.errorType});
// 	req.session.error = "";
// });

// app.post('/phone-login', authenticationController.redirectToRespectiveHome, authenticationController.phoneLogin);


// app.get('/signup', authenticationController.redirectToRespectiveHome, (req, res) => {
// 	res.render('signup.ejs', {session: req.session});
// });

 
// app.post('/signup', authenticationController.redirectToRespectiveHome, authenticationController.signUp);
 
// app.get('/doctor-onboarding', authenticationController.onBoardingDone, (req, res) => {
// 	res.render('views/doctor_onboarding.ejs', { session: req.session, error: req.session.error, errorType: req.session.errorType });
// });

// app.get('/otp', (req, res) => {
// 	res.render('otp.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType});
// })

// app.post('/otp', authenticationController.checkOTP, authenticationController.redirectToRespectiveHome);

// app.put('/resend-otp', authenticationController.cancelOldOTP);



// app.post('/forgot-password', authenticationController.checkIfUserExists, authenticationController.phoneLogin)

// app.get('/create-new-password', authenticationController.redirectToRespectiveHome, (req, res) => {
// 	res.render('create_new_password.ejs', {error: req.session.error, session: req.session, errorType: req.session.errorType});
// })

// app.post('/create-new-password', authenticationController.changePassword);

// app.get('/logout', authenticationController.logout);

module.exports = router;