const mognoose = require('mongoose');
const userschema = mognoose.Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        typee: String,
        required: false
    }
})
const usermodel = mognoose.model('user', userschema);
module.exports = usermodel;