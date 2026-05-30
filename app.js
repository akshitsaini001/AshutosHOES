require('dotenv').config();
const express = require("express");

const app = express();
const port = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
app.use(methodOverride('_method'));

//set up ejs route
const path = require("path");
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "/views"));
const ejsMate = require("ejs-mate");
app.engine("ejs" , ejsMate);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const flash = require("connect-flash");
const session = require("express-session");
const sessionOptions = {
    secret:"mysupercode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: new Date(Date.now()+7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());


//set up for css files
app.use(express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, "assets")));

// Logger middleware to debug routes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

//ONE TIME MESSAGE MIDDLEWARE
app.use((req , res , next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


const ExpressError = require("./utils/ExpressError.js");


const Item = require("./models/item.js");
const data = require("./models/data.js");

main()
    .then(()=>{
        console.log("Connected to database.")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shoesshop');
}

//ROUTING

const owner = require('./routes/owner.js');
app.use('/owner' , owner);



app.get("/home",async(req , res)=>{
    const items = await Item.find({});
    res.render("user/home.ejs" , {items})
});


//ERROR HANDLING
app.use((req , res, next)=>{
    next(new ExpressError(404 ,"Page not found."  ))
});


app.use((err , req , res , next)=>{
    let {statusCode = 500 , message = "Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs" , {err ,message});
    
});

app.listen(port , ()=>{
    console.log(`App is listening on the port ${port}.`)
});