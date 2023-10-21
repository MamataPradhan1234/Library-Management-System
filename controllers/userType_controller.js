const UserType = require('../models/userType');

module.exports.userType = (req, res) => {
    return res.render('userType');
}

module.exports.create = async (req, res) => {
    try {
        let userTypeDetails = new UserType({
            userType: req.body["user-type"], // Update this line
        });
        const result = await userTypeDetails.save();
        
        const response = {
            message: 'User type has been created successfully.',
            data: result
        };
        
        res.send(response);
    } catch (err) {
        console.error('Error in user registration:', err);
        return res.status(500).send('Internal Server Error');
    }
}

