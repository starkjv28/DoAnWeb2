var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");
var auth = require('./apps/middlewares/auth');

var app = express();
//body parser
app.use(bodyParser.json());

app.set("views", __dirname+"/apps/views");
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

//check login
app.use(auth);

//static folder
app.use("/static", express.static(__dirname+"/public"));

var controllers = require(__dirname+"/apps/controllers");

app.use(controllers);

var port = config.get("server.port") || process.env.PORT;

app.listen(port, () => console.log(`Server listening on port ${port}`));