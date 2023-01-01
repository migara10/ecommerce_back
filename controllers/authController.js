const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');

module.exports.registerUser = async (req,res) => {
    const user = authModel(req.body);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, async function(err, hash) {
            const newUser = await authModel.create(user)
            res.send(user)
        });
    });
}