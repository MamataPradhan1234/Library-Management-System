const express=require('express');
const router=express.Router();

const userTypeController=require('../controllers/userType_controller');

router.post('/create-userType',userTypeController.create);

module.exports=router;