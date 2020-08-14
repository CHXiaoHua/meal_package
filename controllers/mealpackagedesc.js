const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/shoppingcart');
var cart = mongoose.model("shopping_cart", schema);

function ensureLogin(req, res, next) {
    if (!req.session.email) {
      res.redirect("/login");
    } else {
      next();
    }
}

const NavModel = require ('../models/Nav');

router.post("/", ensureLogin, function(req, res){
    console.log(req.body.title);
    console.log(req.body.price);
    console.log(req.body.number);
    res.redirect('userdashboard');
    var newcart = new cart({
        title: req.body.title,
        price: req.body.price,
        number: req.body.number
    });
    newcart.save((err)=> {
        if(err) {
            console.log(err + "<--Error!");
        }
        else {
            console.log("New Meal Shopping Cart Item Saved!");
        }
    });
});

module.exports = router;