
/*const MealPackages = {
    fakeDB: [],
    initMP(){
        this.fakeDB.push({path: "images/topmeal1.jpg",title: "Fried Chicken with Spicy Sauce(12pcs)",price: 30,category: "Fried Chicken",desc: "Cayenne pepper, organic chickens, garlic powder, onion.",istopmeal: true});
        this.fakeDB.push({path: "images/topmeal2.jpg",title: "California Sushi Rolls (8pcs)",price: 15,category: "Sushi",desc: "Cups sushi rice, black sesame seeds, soy sauce, avocado.",istopmeal: true});
        this.fakeDB.push({path: "images/mealpackage1.jpg",title: "Hawaiian Pizz (8pcs)",price: 15,category: "Pizza",desc: "Canadian bacon, homemade pizza crust, pizza sauce.",istopmeal: false});
        this.fakeDB.push({path: "images/topmeal3.jpg",title: "Mandarin Orange Salad",price: 15,category: "Salad",desc: "Mandarin oranges, red wine vinegar, orange juice, poppy.",istopmeal: true});
        this.fakeDB.push({path: "images/topmeal4.jpg",title: "Creamy Tomato and Spinach Pasta",price: 15,category: "Pasta",desc: "Cream cheese, penne pasta, tomato paste, red pepper.",istopmeal: true});
        this.fakeDB.push({path: "images/mealpackage2.jpg",title: "Manhattan Seafood Chowder",price: 19,category: "Seafood Soup",desc: "Salmon, white wine, tomato juice, parsnips, chorizo sausage.",istopmeal: false});
    },
    getMPDatas(){
        return this.fakeDB;
    }
}
MealPackages.initMP();
console.log(MealPackages.fakeDB);
module.exports=MealPackages;*/

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mealpackageSchema = new Schema({
    "path": String,
    "title": String,
    "price": Number,
    "category": String,
    "number": Number,
    "desc": String,
    "istopmeal": Boolean
})

module.exports = mealpackageSchema;