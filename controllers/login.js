const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var schema = require('../models/accounts');
var account = mongoose.model("customer_accounts", schema);

const NavModel = require ('../models/Nav');

router.get("/", function(req, res){
    res.render('Login', {
        title: "Login",
        navitems: NavModel.getNavDatas()
    });
});

router.post("/", function(req, res){
    var emerr;
    var pwerr;
    var emtri = false;
    var pwtri = false;
    account.findOne({ email: req.body.email})
    .exec()
    .then((account) => {
        if(req.body.email == ""){
            emerr = "Email can not be empty!";
            emtri = true;
        }
        else{
            if(!account){
                emerr = "Sorry, you entered the wrong email"
                emtri = true;
                res.render('Login', {
                    title: "Login",
                    navitems: NavModel.getNavDatas(),
                    emerr: emerr,
                    emtri: emtri,
                });
            }
            else{
                bcrypt.compare(req.body.password, account.password).then((result) => {
                    if(result === false){
                        pwerr = "Sorry, you entered the wrong password";
                        pwtri = true;
                        console.log("i am here");
                    }        
                    if(req.body.password == ""){
                        pwerr = "Password can not be empty!";
                        pwtri = true;
                    }
                    if(emtri == true || pwtri == true){
                        console.log("iamhere");
                        res.render('Login', {
                            title: "Login",
                            navitems: NavModel.getNavDatas(),
                            emerr: emerr,
                            pwerr: pwerr,
                            emtri: emtri,
                            pwtri: pwtri
                        });
                    }
                    else{
                        //res.("/");
                        req.session.email = req.body.email;
                        req.session.first_name = account.first_name;
                        req.session.last_name = account.last_name;
                        console.log(req.session.last_name);
                        if(account.clerk === true){
                            res.redirect("clerkDashboard");
                        }
                        else{
                            res.redirect("userdashboard");
                        }
                    }
                })
            } 
        }   
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    }); 
});

module.exports = router;