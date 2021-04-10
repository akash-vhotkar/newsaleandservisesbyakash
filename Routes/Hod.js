const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const departmentSchema = require('../Model/dept');
const employeeSchema = require('../Model/Employee');
const hodcontroller = require('../Controller/Hod');
router.use((req, res, next) => {
    if (req.session.empid && req.session.empcode) {
        if (req.session.empcode == "2222")
            next();
    }
    else {
        res.send("You didnt have access to this page <a href='/auth/login'>login</a> ");

    }
})
router.get('/', (req, res) => {
    hodcontroller.gethodhashboard(req, res);



})
router.get('/Assign/:leadid', (req, res) => {
    hodcontroller.getAssignlead(req, res, req.params.leadid);

})
router.post('/Assign/:leadid', (req, res) => {
    hodcontroller.handelAssignled(req, res, req.params.leadid)

})
router.post('/close', (req, res) => {
    hodcontroller.handelcloselead(req, res);
})
router.get('/calldesc/:leadid', (req, res) => {
    hodcontroller.getcalldesc(req, res, req.params.leadid);

})
router.post('/calldesc/:leadid', (req, res) => {
    hodcontroller.addcall(req, res, req.params.leadid);

})


module.exports = router;