const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const departmentSchema = require('../Model/dept');
const employeeSchema = require('../Model/Employee');
const employeecontrolelr = require('../Controller/Employee');
router.use((req, res, next) => {
    if (req.session.empid && req.session.empcode) {
        if (req.session.empcode == "4444")
            next();
    }
    else {
        res.send("You didnt have access to this page<a href='/auth/login' >login</a> ");

    }
})
router.get('/', (req, res) => {
    employeecontrolelr.getempdashboard(req, res);



})
router.post('/close', (req, res) => {
    employeecontrolelr.handelcloselead(req, res);

})
router.get('/closeleads', (req, res) => {
    employeecontrolelr.getcloseleads(req, res);

})
router.get('/calldesc/:leadid', (req, res) => {
    console.log("call desc emp", req.params);
    employeecontrolelr.getcalldesc(req, res, req.params.leadid)
})
router.post('/calldesc/addcall', (req, res) => {
    employeecontrolelr.addcall(req, res);

})
module.exports = router;