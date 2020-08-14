const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/shoppingcart');
var cart = mongoose.model("shopping_cart", schema);

const nodemailer = require('nodemailer');
const config = require('../config/email');
const transporter = nodemailer.createTransport(config);

function ensureLogin(req, res, next) {
    if (!req.session.email) {
      res.redirect("/login");
    } else {
      next();
    }
}

const NavModel = require ('../models/Nav');

var mp = [];

router.get('/', ensureLogin, function(req, res) {
    cart.find({}).lean()
    .exec()
    .then((result) => {
        mp = result;
        var total = 0;
        for(var i in mp){
            total = total + mp[i].price;
        }
        res.render("shoppingcart", {
            title: "Shopping Cart",
            navitems: NavModel.getNavDatas(),
            mealPackage: mp,
            total: total
        });
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    });
})

router.post("/", ensureLogin, function(req, res){
    res.redirect('userdashboard');
    cart.deleteMany({})
    .exec()
    .then(() => {
        console.log("removed shopping cart");
      })
    .catch((err) => {
        console.log(err);
    });
    var list = req.body.mealPackage;
    var emailtext = 'Order Placed successfully! Yor order detail: ';
    for(var i in mp){
        emailtext = emailtext + mp[i].title + ", Quantity: " + mp[i].number + ", $" + mp[i].price + ". ";
        console.log(mp[i].title);
    }
    emailtext = emailtext + "Total: $" + req.body.total + ". ";
    console.log(req.session.email);
    var e = req.session.email
    var mailinfo = {
        from: 'lzhxiaohua66@gmail.com',
        to: req.session.email,
        subject: 'Order Placed',
        text: emailtext
    }
    transporter.sendMail(mailinfo,(err,info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('email sent to ' + req.session.email)
        }
    })

});

module.exports = router;