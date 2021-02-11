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
app.set("port",process.env.PORT || 4000)
app.listen(app.get("port"), ()=>{
    console.log("Application started Listenng on Port", app.get("port"))
});
module.exports = app;