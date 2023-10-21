const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

const userTypeController=require('../controllers/userType_controller');
router.get('/userType',userTypeController.userType);

router.use('/users',require('./users'));
router.use('/userType',require('./userType'));

module.exports=router;