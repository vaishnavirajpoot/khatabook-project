const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const cookieparser = require("cookie-parser");

const indexRouter = require("./routes/indexRouter");
const hisaabRouter = require("./routes/hisaabRouter");

const db = require("./config/mongoose-connection")


const flash = require("connect-flash");
const expressSession = require("express-session");

app.use(expressSession({
    secret: 'anmolpandey', // Replace with a secure key
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieparser());




app.use("/", indexRouter)
app.use("/hisaab",hisaabRouter);
    



app.listen(3000);