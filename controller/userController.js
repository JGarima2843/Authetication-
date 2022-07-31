const User=require('../models/sign-Up');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secretKey="NOTESAPI";

module.exports.signUp=function(req,res){

   return res.render('sign-up',{
        title:"authFree | Sign-Up"
    })


}


module.exports.signIn=function(req,res){
   return res.render('sign-in',{
        title:"authFree | Sign-In"
    })
}

module.exports.create= async function(req,res){

    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    else{

    const {email,location,url,password}=req.body;

    try{

        const existingUser= await User.findOne({email:email,url:url});
        if(existingUser){
            return res.status(400).json({message:"User Allready Exists"});
        }

        const hashPassword=await bcrypt.hash(password,10);

        const result=User.create({
            email:email,
            location:location,
            url:url,
            password:hashPassword
        })

        const token=jwt.sign({email:email,id:result._id},secretKey);
        return res.status(201).render('sign-in',{
            title:"AuthFree | SignIn"});
        // return res.render('sign-in',{
        //     title:"AuthFree | SignIn"
        // });

        

    }
    catch(err){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}



    // if(req.body.password!=req.body.confirm_password){
    //     return res.redirect('back');
    // }
    // else{
    //     User.findOne({email:req.body.email},function(err,user){
    //         if(err){
    //             console.log("error in finding the user in database ",err);
    //             return;
    //         }
    //         if(user){
    //             console.log("allready a email exists");
    //             return res.render('back')
    //         }
    //         else{
    //             User.findOne({url:req.body.url},function(err,user){
    //                 if(err){
    //                     console.log("error in finding the user in database ",err);
    //                     return;
    //                 }

    //                 if(user){
    //                     console.log("allready a url exists");
    //                     return res.render('back')
    //                 }

    //                 else{
    //                     User.create(req.body,function(err,user){
    //                         if(err){
    //                             console.log("error in making the database ",err);
    //                             return ;
    //                         }
    //                         else{
    //                             return res.redirect('/user/sign-in');
    //                         }
    //                     })
    //                 }

    //             })

    //         }
    //     })

    // }
   
}


module.exports.createSession=async function(req,res){

    const {email:email,password:password}=req.body;

    try{
        const existingUser=await User.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User Not Found"});
        }

        const matchPassword=await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const token=jwt.sign({email:email,id:existingUser._id},secretKey);
        res.status(201).render('home',{
                title:"AuthFree | HOME"
                });
    }

    catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }

   
}