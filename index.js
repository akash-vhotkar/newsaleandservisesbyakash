const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const ejs = require('ejs');
const session = require('express-session');
const url = require('./config/key').url;
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', "ejs");
app.use(express.static('./public'))

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log("database connected")).catch(err => { console.log(err); })
app.use(session({
    secret: "secreat",
    resave: true,
    saveUninitialized: false
}))


//routes
app.get('', (req, res) => {
    res.render("Home")
})


app.use('/auth', require('./Routes/Authtication'))
app.use('/home', require('./Routes/Home'))
app.use('/admin', require('./Routes/Admin'));



const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("server is running on port 5000");
})