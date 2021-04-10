const departmentmodel = require('../Model/dept');
const leaddescmodel = require('../Model/LeadDesc');
const empmodel = require('../Model/Employee');
module.exports = {
    getempdashboard: function (req, res) {
        leaddescmodel.find({ forworded_to_emp_id: req.session.empid, lead_status: false }).then(cust => {
            const messages = req.session.Empmessages
            res.render("EmployeeDashboard", { messages, cust })

        })

    }
}