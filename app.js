const express = require("express");
const firebase = require("firebase");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const path = require("path");
const session = require("express-session")
const flash = require("connect-flash");
const app = express();

// app.use(session({
//     secret: "doyouknowtheway",
//     resave = true,
//     saveUninitialized = true
// }));

// app.use(flash());

// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash("sucess_msg");
//     res.locals.error_msg = req.flash("error_msg");
//     next();
// })

app.engine('handlebars', handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json);
app.use(express.static(path.join(__dirname, "public")));
var firebaseConfig = {
    apiKey: "AIzaSyDUgNIppirC2FaaulNgi9DMjaqelMfew_E",
    authDomain: "lotofacillokao.firebaseapp.com",
    databaseURL: "https://lotofacillokao.firebaseio.com",
    projectId: "lotofacillokao",
    storageBucket: "lotofacillokao.appspot.com",
    messagingSenderId: "745809442885",
    appId: "1:745809442885:web:2ea2d5855e78003afa8b2c",
    measurementId: "G-1CGNVKZWDQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/html/login.html");
});
app.get("/home", function(req, res) {
    res.sendFile(__dirname + "/public/html/home.html");
});
app.get("/salvar", function(req, res) {
    res.sendFile(__dirname + "/public/html/salvos.html");
});
app.get("/cadastrar", function(req, res) {
    res.sendFile(__dirname + "/public/html/cadastrarUsuario.html");
});
app.get("/adm", function(req, res) {
    res.sendFile(__dirname + "/public/html/adm.html");
});
app.listen(8990, function() {
    console.log("ta indo");
});