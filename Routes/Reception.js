const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const departmentSchema = require('../Model/dept');
const employeeSchema = require('../Model/Employee');
router.use((req, res, next) => {
    if (req.session.empid && req.session.empcode) {
        if (req.session.empcode == "3333")
            next();
    }
    else {
        res.send("You didnt have access to this page ");

    }
})
router.get('/', (req, res, next) => {
    next();



})

module.exports = router;