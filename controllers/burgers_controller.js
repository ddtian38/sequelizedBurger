const express = require("express");

const db = require("../models")
console.log(db.Burger)
var router = express.Router();


router.post("/api/burgers/", function(req, res){
    console.log(req.body)
    //Giving default image if not image URL link is provided
    if(req.body.img_link === ""){
        req.body.img_link = "/img/hamburger.png"
    }
    db.Burger.create({
        burger_name: req.body.burger,
        img_link: req.body.img_link
    }).then(function(results){
        console.log(results)
        res.json(results);
    })
   

})

router.put("/api/burgers/:id", function(req, res){
    console.log(req.body)

    db.Burger.update({
        devoured: req.body.devoured}, 
        {
        where:{
            id: req.body.burgerID
        }
    }).then(function(results){
        res.json(results)
    })
        
})

router.get("/", function(req, res){

    db.Burger.findAll({}).then(function(dbburger){
        res.render("index", {burgers: dbburger})
    })
})

module.exports = router;