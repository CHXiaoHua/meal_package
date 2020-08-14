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
        res.render("userdashboard", {
            title: "Meal Package Descreption",
            navitems: NavModel.getNavDatas(),
            mealPackage: mp
        });
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    });
});

router.post("/", ensureLogin, function(req, res){

    mealpackage.findOne({ title: req.body.button})
    .exec()
    .then((mp) => {
        res.render("mealpackagedesc", {
            title: mp.title,
            navitems: NavModel.getNavDatas(),
            path: mp.path,
            mptitle: mp.title,
            price: mp.price,
            number: mp.number,
            desc: mp.desc
        })
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    }); 
});

module.exports = router;