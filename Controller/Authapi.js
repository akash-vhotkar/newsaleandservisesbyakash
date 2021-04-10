const UserSchema = require('../Model/Employee');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
module.exports = {
    getlogin: function (req, res) {
        res.render("Login");
    },
    getregister: function (req, res) {
        res.render("Register")
    },
    handellogin: function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        UserSchema.findOne({ emp_username: username }).then(alluserdata => {
            if (alluserdata) {
                bcrypt.compare(password, alluserdata.emp_password, (err, result) => {

                    if (result) {
                        req.session.empid = alluserdata.emp_id;
                        req.session.empname = alluserdata.emp_name;
                        req.session.emptype = alluserdata.emp_type;
                        req.session.empcode = alluserdata.emp_code
                        if (alluserdata.emp_code == "1111") {
                            req.session.Adminmessages = [{ msg: "Login sucssefuly welcome" }];
                            res.redirect('/Admin/')

                        }
                        if (alluserdata.emp_code == "2222") {
                            req.session.Hodmessages = [{ msg: "Login Successfully " }]
                            res.redirect('/Hod/')


                        }
                        if (alluserdata.emp_code == "3333") {
                            req.session.Receptionmessages = [{ msg: "Login Successfully " }]
                            res.redirect('/Reception/')

                        }
                        if (alluserdata.emp_code == "4444") {
                            req.session.Empmessages = [{ msg: "Login Successfully " }]

                            res.redirect('/Emp/')

                        }

                    }
                    else {
                        let messages = [];
                        messages.push({ msg: "Password does not Match !" })
                        res.render("Login", { messages });
                    }
                })



            }
            else {
                let messages = [];
                messages.push({ msg: "User does not  exist !" })
                res.render("Login", { messages });

            }

        }).catch(err => {
            if (err) console.log(err);
        })


    },
    handelregister: function (req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        UserSchema.findOne({ username: username }).then((userdata) => {
            if (userdata) {

                let messages = [];
                messages.push({ msg: "Username already exist !" })
                res.render("Register", { messages });
            }
            else {
                if (password == confirm_password) {
                    bcrypt.hash(password, 10, function (err, hash) {
                        const newuser = {
                            emp_name: name,
                            emp_username: username,
                            emp_email: email,
                            emp_password: hash,
                            emp_type: "Admin",
                            emp_code: "1111",
                            emp_id: shortid.generate()
                        }
                        UserSchema.create(newuser).then(alluserdata => {
                            req.session.empid = newuser.emp_id;
                            req.session.emptype = newuser.emp_type;
                            req.session.empcode = newuser.emp_code;
                            req.session.Adminmessages = [{ msg: "Registred sucssefuly welcome" }];
                            res.redirect('/Admin/')
                        })

                    });


                }
                else {
                    let messages = [];
                    messages.push({ msg: "Password and confirm password does not match !" })
                    res.render("Register", { messages });
                }

            }
        })






    },
    logout: function (req, res) {
        req.session = null;
        let messages = [];
        messages.push({ msg: "Logout Successfully  !" })
        res.render("Login", { messages });


    }
}