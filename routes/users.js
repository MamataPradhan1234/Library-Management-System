const express=require('express');
const router=express.Router();
const passport=require('passport');
const middleware =require('../config/middleware');
const uploadAvatar=middleware.uploadAvatar;

const userController=require('../controllers/users_controller');

router.post('/create',uploadAvatar,userController.create);
router.post('/login',userController.createSession);
router.get('/get-users',passport.authenticate('jwt',{session:false}),userController.getUsers);
router.delete('/delete-users/:id',passport.authenticate('jwt',{session:false}),userController.destroy);


module.exports=router;