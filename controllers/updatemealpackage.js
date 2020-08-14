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

router.post("/", ensureLogin, function(req, res){
    var tlerr;
    var prerr;
    var dcerr;
    var caterr;
    var numerr;
    var tltri = false;
    var prtri = false;
    var dctri = false;
    var cattri = false;
    var numtri = false;

    if(req.body.title == ""){
        tlerr = "Title can not be empty!";
        tltri = true;
    }
    if(req.body.price == ""){
        prerr = "Price can not be empty!";
        prtri = true;
    }
    if(req.body.desc == ""){
        dcerr = "Description can not be empty!";
        dctri = true;
    }
    if(req.body.category == ""){
        caterr = "Category can not be empty!";
        cattri = true;
    }
    if(req.body.number == ""){
        numerr = "Number can not be empty!";
        numtri = true;
    }

    if(tltri == true || prtri == true || dctri == true || cattri == true || numtri == true){
        res.render('updatemealpackage', {
            title: "Update Meal Package",
            navitems: NavModel.getNavDatas(),
            tlerr: tlerr,
            dcerr: dcerr,
            prerr: prerr,
            caterr: caterr,
            numerr: numerr,
            tltri: tltri,
            prtri: prtri,
            dctri: dctri,
            cattri: cattri,
            numtri: numtri,
        });
    }
    else{
        res.redirect("clerkDashboard");
        var istop = false;
        if(req.body.nistopmeal === "y"){
            istop = true;
        }
        console.log
        mealpackage.updateOne(
            {title: req.body.oldtitle},
            {$set: {
                title: req.body.ntitle, 
                price: req.body.nprice, 
                category: req.body.ncategory, 
                number: req.body.nnumber,
                desc: req.body.ndesc, 
                istopmeal: istop
            }})
        .exec();     
    }
});

module.exports = router;