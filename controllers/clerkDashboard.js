const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/MealPackages');
var mealpackage = mongoose.model("mmeal_package", schema);

const NavModel = require ('../models/Nav');

function ensureLogin(req, res, next) {
    if (!req.session.email) {
      res.redirect("/login");
    } else {
      next();
    }
}

router.get('/', ensureLogin, function(req, res) {
    var welcome = req.session.first_name + " " + req.session.last_name + ", welcome!"
    mealpackage.find({}).lean()
    .exec()
    .then((result) => {
        var mp = [];
        mp = result;
        res.render("clerkdashboard", {
            title: "Meal Packages",
            navitems: NavModel.getNavDatas(),
            welcome: welcome,
            mealPackage: mp
        });
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    });
})

module.exports = router;