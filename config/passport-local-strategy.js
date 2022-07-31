const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/sign-Up');

passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if (err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        if (!user || user.password != password){
            console.log('Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    });
}))


// serialisation of cookie


passport.serializeUser(function(user,done){
    done(null,user.id);
})


// deserialisation of cookie

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("error in finding user");
            return done(err,user);
        }

        return done(null,user);
    })
})


module.exports=passport;