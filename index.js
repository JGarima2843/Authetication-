const express=require('express');
const cookieParser = require('cookie-parser');

// const port=8000 ;
const app=express();
app.use(express.urlencoded());

app.use(express.json());

// app.use(express.urlencoded());

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// we need this so that the user info remains even when it reloads
const mongoStore = require('connect-mongo');

// configuring mongoose
const db=require('./config/mongoose');

// acquiring the path of the files
const path=require('path');
app.use(cookieParser());





// configurig the assets files
app.use(express.static(path.join(__dirname,'assets')));

// acquiring the views-ejs files
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(session({
    name:"social",
    secret:'garimajain',
    // if the user is not log in but even he wants to view his profile so should i allow NOO
    saveUninitialized:false,
    // if any previous data i there in session cookie do i wnat to remove it NOO
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: mongoStore.create(
        {
           mongoUrl:'mongodb://localhost/authFree',
            autoRemove:'disabled'
        },function(err){
            console.log(err||'connection problem with mongostore in setup');
        }
    )

}))


// routing the paths

        // app.get('/',function(req,res){
        //     return res.render('home');
        // })

// using the middilewares for routing the paths

app.use('/',require('./routes'));


const port=8000 ;
app.listen(port,function(err){
    if(err){
        console.log("error in server ",err);
    }

    console.log(`Hurray !! server is up and runing over ${port}`);
})