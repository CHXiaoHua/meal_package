const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
var schema = require('../models/accounts');

var account = mongoose.model("customer_accounts", schema);

const NavModel = require ('../models/Nav');
const config = require('../config/email');

const transporter = nodemailer.createTransport(config);

router.get("/", function(req, res){
    res.render('CustomerRegistration',{
        title: "Sign Up",
        navitems: NavModel.getNavDatas()
    });
});

router.post("/", async(req, res)=> {
    var fnerr = "";
    var lnerr = "";
    var emerr = "";
    var pwerr = "";
    var fntri = false;
    var lntri = false;
    var emtri = false;
    var pwtri = false;

    account.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
        if(req.body.firstname == ""){
            fnerr = "The first name can not be empty!";
            fntri = true;
        }
        else{
            var allAlpha = true;
            var fn = req.body.firstname.trim();
            fn = fn.toUpperCase();
            for(var i = 0; i < fn.length; i++){
                if(fn.charAt(i)<"A" || fn.charAt(i)>"Z"){
                    allAlpha = false;
                    break;
                }
            }
            if(!allAlpha){
                fnerr = "Please enter alphabet letters only!";
                fntri = true;
            }
        }
        if(req.body.lastname == ""){
            lnerr = "The last name can not be empty!";
            lntri = true;
        }
        else{
            var allAlpha = true;
            var ln = req.body.lastname.trim();
            ln = ln.toUpperCase();
            for(var i = 0; i < ln.length; i++){
                if(ln.charAt(i)<"A" || ln.charAt(i)>"Z"){
                    allAlpha = false;
                    break;
                }
            }
            if(!allAlpha){
                lnerr = "Please enter alphabet letters only!";
                lntri = true;
            }
        }
    
        if(req.body.email == ""){
            emerr = "Email can not be empty!";
            emtri = true;
        }
        else{
            if (user) {
                emerr = "This email has already registered.";
                emtri = true;
            }
        }
    
        if(req.body.password == ""){
            pwerr = "Password can not be empty!";
            pwtri = true;
        }
        else{
            var pw = req.body.password.trim();
            var cap = /[A-Z]/;
            var digit = /[0-9]/;
            var upperpw = pw.toUpperCase();
            if(pw.length < 6 || pw.length > 12){
                pwerr = "Password must be 6 characters long";
                pwtri = true;
            }
            else if(upperpw.charAt(0) < "A" || upperpw.charAt(0) > "Z"){
                pwerr = "Password must start with a letter.";
                pwtri = true;
            }
            else if(!cap.test(pw)){
                pwerr = "Password must have at least 1 uppercase.";
                pwtri = true;
            }
            else if(!digit.test(pw)){
                pwerr = "Password must have at least 1 digit.";
                pwtri = true;
            }
            else{
                pwtri = false;
            }
        }
        if(fntri == true || lntri == true || emtri == true || pwtri == true){
            res.render('CustomerRegistration',{
                title: "Sign Up",
                navitems: NavModel.getNavDatas(),
                fnerr: fnerr,
                lnerr: lnerr,
                emerr: emerr,
                pwerr: pwerr,
                fntri: fntri,
                lntri: lntri,
                emtri: emtri,
                pwtri: pwtri
            });
        }
        else{
            res.redirect('userdashboard');
            var mailinfo = {
                from: 'lzhxiaohua66@gmail.com',
                to: req.body.email,
                subject: 'Registration',
                text: 'Account registered successfully!'
            }
            transporter.sendMail(mailinfo,(err,info)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log('email sent to ' + req.body.email)
                }
            })
    
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);;
    
            var customer = new account({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                email: req.body.email,
                clerk: false,
                password: hash
            });
            customer.save((err)=> {
                if(err) {
                    console.log(err + "<--Error!");
                }
                else {
                    console.log("New Customer Account Saved!");
                }
            });
        }
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    }); 
});

module.exports = router;