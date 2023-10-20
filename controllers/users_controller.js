const User=require('../models/users');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signUp = (req, res) => {
    return res.render('sign-up');
}

module.exports.signIn = (req, res) => {
    return res.render('sign-in');
}

module.exports.profile=(req,res)=>{
    return res.render('profile');
}

module.exports.create = async (req, res) => {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).send('Passwords do not match.');
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send('User with the same email already exists.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        });

        const savedUser=await newUser.save();
        res.status(200).send(savedUser);
    } catch (err) {
        console.error('Error in user registration:', err);
        return res.status(500).send('Internal Server Error');
    }
}


module.exports.createSession = async function (req, res) {
    console.log('Email:', req.body.email);
    console.log('Password:', req.body.password);

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log('User not found');
            return res.status(422).json({
                message: "Incorrect username or password",
            });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        console.log('Stored Password:', user.password);
        console.log('Provided Password:', req.body.password);

        if (!isPasswordMatch) {
            return res.status(422).json({
                message: "Incorrect username or password",
            });
        }
        const token = jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' });
        return res.status(200).json({
            message: "Sign in successful",
            data: {
                token: token
            }
        });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({
            message: "Internal server Error",
        });
    }
};

module.exports.getUsers=async function(req,res){
    try{
           const userDetails=await User.find({}).exec();
           return res.status(200).json({
            message:"successful",
            users:userDetails,
           });
    }catch(err){
        console.error("Error retrieving data",err);
        return res.status(500).json({
            message:"internal server error",
        })
    }
}

module.exports.destroy = async function(req,res){
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message:"user not found",
            });
        }
        await User.deleteOne({_id:req.params.id});
        return res.status(200).json({
            message:"delete successful",
        });
    }catch(err){
       console.log("error",err);
       return res.status(500).json({
        message:"internal server error"
       })
    }
}
