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

module.exports = router;