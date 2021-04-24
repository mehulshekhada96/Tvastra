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

const appointmentController = require('./backend/controllers/appointmentController');
const slotController = require('./backend/controllers/slotController');
const medicalReportController = require('./backend/controllers/medicalReportController');
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

// Public Folder
app.use(express.static(path.join(__dirname, 'client/public')));

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("views",__dirname + "/client/views");
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

// Admin Routes

app.get('/admin', authenticationController.redirectLogin, authenticationController.checkAdmin, appointmentController.getAppointmentToAdminDashboard, userController.getAllUsers, (req, res) => {
	res.render('dashboard.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType, patients: res.locals.patients, subslots: res.locals.subslots, appointments: res.locals.appointments, users: res.locals.users });
});

app.get('/admin-doctors', authenticationController.redirectLogin, authenticationController.checkAdmin, doctorController.getAllDoctors, (req, res) => {
	res.render('dashboard_doctors.ejs', {session: req.session, doctors: res.locals.doctors, error: req.session.error, errorType: req.session.errorType});
});

app.get('/admin-hospitals', authenticationController.redirectLogin, authenticationController.checkAdmin, hospitalController.getAllHospitalsAdmin, (req, res) => {
	res.render('admin_dashboard_hospitals.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType, hospitals: res.locals.hospitals});
});

app.get('/admin-patients', authenticationController.redirectLogin, authenticationController.checkAdmin, userController.getAllUsers, (req, res) => {
	res.render('admin_dashboard_patients.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType, patients: res.locals.users});
})

app.get('/add-doctors', authenticationController.redirectLogin, authenticationController.checkAdmin, (req, res) => {
	res.render('dashboard_addDoctor.ejs', {session: req.session, error:req.session.error, errorType: req.session.errorType, doctors: res.locals.doctors});
});

app.get('/verify-hospital/:id', authenticationController.redirectLogin, authenticationController.checkAdmin, hospitalController.getVerifyHospital, (req, res) => {
	res.render('dashboard_addHospital.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType, hospital: res.locals.hospital})
});


app.get('/doctor-dashboard', authenticationController.redirectLogin, appointmentController.getAppointmentToDoctorDashboard, (req, res) => {
	res.render('doctor_dashboard.ejs', {session: req.session, error:req.session.error, errorType: req.session.errorType, patients: res.locals.patients, appointments: res.locals.appointments, bookedSlots: res.locals.bookedSlots });
});


app.post('/add-doctors', doctorController.addDoctor);

app.post('/add-hospitals/:id', hospitalController.postVerifyHospital);


app.get('/delete-doctor/:id', doctorController.deleteDoctor);

app.get('/admin-edit-doctor/:id', authenticationController.redirectLogin, authenticationController.checkAdmin, doctorController.getDoctor, (req, res) => {
	res.render('admin_edit_profile_doctor.ejs', { user: res.locals.doctor, session: req.session, error: req.session.error, errorType: req.session.errorType });
})

app.post('/admin-edit-doctor', authenticationController.redirectLogin, authenticationController.checkAdmin, doctorController.adminEditDoctor);

// User Routes

app.get('/', authenticationController.redirectLogin2, authenticationController.checkOnboarding, authenticationController.redirectAdmin, (req, res) => {
	res.render('index.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
});

app.post('/', authenticationController.redirectLogin2, authenticationController.redirectAdmin, userController.addDoctorDetails);

app.put('/disable-error', authenticationController.clearError);

app.get('/doctors', authenticationController.redirectLogin, doctorController.getAllDoctors, (req, res) => {
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
	res.render('hospital_details.ejs', {session: req.session});
});


app.get('/doctor/:id', doctorController.getDoctor, (req, res) => {
	res.render('doctor_details.ejs', {session: req.session, doctor: res.locals.doctor});
});

app.get('/faq', (req, res) => {
	res.render('faq.ejs', {session: req.session});
});

app.get('/tvastra-plus', authenticationController.redirectAdmin ,(req, res) => {
	res.render('tvastra-plus.ejs', {session: req.session});
});

app.get('/submit-your-query', (req, res) => {
	res.render('submit_your_query.ejs', {session: req.session});
});

app.get('/appointment/:id',authenticationController.redirectLogin, authenticationController.redirectAdmin, appointmentController.loadingDataOnAppointmentPage);

app.post('/appointment/:id', appointmentController.createAppointment);

app.get('/appointment-booked/', authenticationController.redirectLogin, authenticationController.redirectAdmin, appointmentController.appointmentBooked, (req, res) => {
	res.render('appointment_booked.ejs', { doctor: res.locals.doctor, patient: res.locals.patient, subslot: res.locals.subslot, session: req.session, appointmentDate: res.locals.appointmentDate, appointment: res.locals.appointment })
});

app.get('/appointment-cancel/:id', authenticationController.redirectLogin, authenticationController.redirectAdmin, appointmentController.getCancelAppointment, (req, res) => {
	res.render('cancel_appointment.ejs', { doctor: res.locals.doctor, patient: res.locals.patient, subslot: res.locals.subslot, session: req.session, appointmentDate: res.locals.appointmentDate, appointment: res.locals.appointment })
});

app.post('/appointment-cancel/:id', authenticationController.redirectLogin, authenticationController.redirectAdmin, appointmentController.postCancelAppointment);

app.post('/appointment-cancel/', authenticationController.redirectLogin, authenticationController.redirectAdmin, appointmentController.postCancelAppointment);

app.get('/reschedule-appointment/:id', appointmentController.getRescheduleAppointment, (req, res) => {
	res.render('reschedule_appointment.ejs', {session: req.session, doctors: res.locals.doctors, appointment: res.locals.appointment, currentDay: res.locals.currentDay, dateFromServer: res.locals.currentDate, subslot: res.locals.subslot});
})

app.post('/reschedule-appointment/:id', appointmentController.postRescheduleAppointment);

app.get('/get-a-quote', authenticationController.redirectLogin, (req, res) => {
	res.render('get-a-quote.ejs', {session: req.session});
})

app.get('/edit-profile', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('edit_profile.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
})

app.post('/change-phone-number', userController.changePhoneNumber);

app.post('/change-phone-number-verify', userController.changePhoneNumberOTPVerify);

app.get('/user-dashboard-appointments', authenticationController.redirectLogin, authenticationController.redirectAdmin, appointmentController.getUserAppointments, (req, res) => {
	res.render('user_dashboard_appointments.ejs', {session: req.session, doctors: res.locals.doctors, slots: res.locals.slots, appointments: res.locals.appointments});
});

app.get('/user-dashboard-medical-records', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render("user_dashboard_medical_records.ejs", { session: req.session, reports : req.session.user.reports, errorType: req.session.errorType, error: req.session.error }); 
})

app.post('/user-dashboard-medical-records', authenticationController.redirectLogin, authenticationController.redirectAdmin, medicalReportController.createMedicalReport);

app.get('/user-dashboard-medicines', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('user_dashboard_medicines.ejs', {session: req.session});
})


app.get('/settings', authenticationController.redirectLogin, (req, res) => {
	res.render('settings.ejs', { session: req.session, error: req.session.error, errorType: req.session.errorType });
})

app.post('/settings', authenticationController.redirectLogin, authenticationController.redirectAdmin, userController.settings);

app.get('/user-dashboard-medical-records/showReport/:id', authenticationController.redirectLogin, authenticationController.redirectAdmin, medicalReportController.showReport);

app.get('/user-dashboard-lab-tests', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('views/user_dashboard_lab_tests.ejs', {session: req.session});
})

app.get('/delete_record', authenticationController.redirectLogin, authenticationController.redirectAdmin, medicalReportController.delete_record);

app.post('/update_record', authenticationController.redirectLogin, authenticationController.redirectAdmin, medicalReportController.update_record);


app.post('/delReport', authenticationController.redirectLogin, authenticationController.redirectAdmin, medicalReportController.delReport);

app.post('/save-changes', userController.editProfile);

app.get('/autoCompleteHospital', hospitalController.autoCompleteHospitals);


app.get('/edit-profile-doctor', authenticationController.redirectLogin, authenticationController.redirectAdmin, (req, res) => {
	res.render('edit_profile_doctor.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType});
})

app.get('/schedule-appointment', authenticationController.redirectLogin, slotController.getSlotsBasedOnDoctor, (req, res) => {
	res.render('schedule_appointment.ejs', {session: req.session, error: req.session.error, errorType: req.session.errorType, slots: res.locals.slots});
})

app.post('/schedule-appointment', authenticationController.redirectLogin, slotController.addSlot);

app.post('/edit-subslots', slotController.editSubSlot);

app.post('/edit-slot', slotController.editSlot)

app.get('/delete-schedule/:id', authenticationController.redirectLogin, slotController.disableSlot);

app.post('/add-filters', doctorController.doctorFilters);

app.post('/sort-by', doctorController.doctorSort);


app.post('/filter_search',doctorController.filter_search);

app.get('/getSearch', authenticationController.redirectLogin, authenticationController.redirectAdmin, doctorController.getSearch);



module.exports = app;
