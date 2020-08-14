const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
var schema = require('../models/MealPackages');
var mealpackage = mongoose.model("mmeal_package", schema);

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
});

function ensureLogin(req, res, next) {
    if (!req.session.email) {
      res.redirect("/login");
    } else {
      next();
    }
}

const NavModel = require ('../models/Nav');

router.get("/", ensureLogin, function(req, res){
    res.render('addmealpackage', {
        title: "Login",
        navitems: NavModel.getNavDatas()
    });
});

router.post("/", upload.single('photo'), function(req, res){
    var tlerr;
    var prerr;
    var dcerr;
    var caterr;
    var numerr;
    var fileerr;
    var tltri = false;
    var prtri = false;
    var dctri = false;
    var cattri = false;
    var numtri = false;
    var filetri = false;

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
    if(req.file == undefined){
        fileerr = "Picture can not be empty!";
        filetri = true;
    }
    else{
        var extention = path.extname(req.file.originalname);
        if(extention != ".png" && extention != ".gif" && extention != ".jpg"){
            fileerr = "Only accept .png, .gif and .jpg format!";
            filetri = true;
        }
    }

    if(tltri == true || prtri == true || dctri == true || cattri == true || numtri == true || filetri == true){
        res.render('addmealpackage', {
            title: "Add Meal Package",
            navitems: NavModel.getNavDatas(),
            tlerr: tlerr,
            dcerr: dcerr,
            prerr: prerr,
            caterr: caterr,
            numerr: numerr,
            fileerr: fileerr,
            tltri: tltri,
            prtri: prtri,
            dctri: dctri,
            cattri: cattri,
            numtri: numtri,
            filetri: filetri
        });
    }
    else{
        res.redirect("clerkDashboard");
        var istop = false;
        if(req.body.istopmeal === "y"){
            istop = true;
        }
        var newMP = new mealpackage({
            path: "images/" + req.file.filename,
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            number: req.body.number,
            desc: req.body.desc,
            istopmeal: istop
        });
        newMP.save((err)=> {
            if(err) {
                console.log(err + "<--Error!");
            }
            else {
                console.log("New Meal Package Saved!");
            }
        });
    }
});

module.exports = router;