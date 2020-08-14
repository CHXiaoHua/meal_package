const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/MealPackages');
var mealpackage = mongoose.model("mmeal_package", schema);

function ensureLogin(req, res, next) {
    if (!req.session.email) {
      res.redirect("/login");
    } else {
      next();
    }
}

const NavModel = require ('../models/Nav');

router.get("/", ensureLogin, function(req, res){
    mealpackage.find({}).lean()
    .exec()
    .then((result) => {
        var mp = [];
        mp = result;
        res.render("selectmealpackage", {
            title: "Select Meal Package",
            navitems: NavModel.getNavDatas(),
            mealpackage: mp
        });
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    });
});

router.post("/", function(req, res){
    res.render("updatemealpackage", {
        title: req.body.title,
        selected: req.body.title,
        navitems: NavModel.getNavDatas(),
    });
});

module.exports = router;