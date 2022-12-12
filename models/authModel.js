const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    username: {
        type: String,
        require: true,
    },

    password:{
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'editor'],
        dafault: 'editor',
    }
})

const Auth = mongoose.model('user', userSchema); // save user in db
module.exports = Auth;