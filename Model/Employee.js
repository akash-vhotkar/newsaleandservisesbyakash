const mongoose = require('mongoose');
const employeschema = mongoose.Schema({
    emp_name: {
        type: String,
        required: false
    },
    emp_email: {
        type: String,
        required: false
    },
    emp_mobile: {
        type: String,
        required: false
    },
    emp_deptid: {
        type: String,
        required: false
    },
    emp_type: {
        type: String,
        required: false
    },
    emp_code: {
        type: String,
        required: false
    }

})
const model = mongoose.model("Employee", employeschema);
module.exports = model;