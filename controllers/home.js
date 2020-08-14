const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/MealPackages');
var mealpackage = mongoose.model("mmeal_package", schema);

const NavModel = require ('../models/Nav');
const contentModel = require ('../models/contents');

router.get("/", function(req, res){
    mealpackage.find({istopmeal : true}).lean()
    .exec()
    .then((result) => {
        var mp = [];
        mp = result;
        res.render('Home', {
            title: "Home",
            navitems: NavModel.getNavDatas(),
            contentitems: contentModel.getContents(),
            topmealitems: mp
        });
    })
    .catch((err) => {
        console.log(`There was an error:${err}`);
    });
});

module.exports = router;