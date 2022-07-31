const express=require('express');

const router=express.Router();

const passport=require('passport');

const userController=require('../controller/userController');

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);


router.post('/create',userController.create);
router.post('/create-session',userController.createSession)

module.exports=router;