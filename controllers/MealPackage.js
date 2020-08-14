const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/MealPackages');
var mealpackage = mongoose.model("mmeal_package", schema);

const NavModel = require ('../models/Nav');

router.get("/", function(req, res){
    mealpackage.find({}).lean()
    .exec()
    .then((result) => {
        var mp = [];
        mp = result;
        res.render('MealPackage',{
            title: "Meal Packages",
            navitems: NavModel.getNavDatas(),
            mealPackage: mp
        });
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    });
});

module.exports = router;