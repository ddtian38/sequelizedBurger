const express = require("express");

const db = require("../models")
console.log(db.Burger)
var router = express.Router();

router.get("/api/burgers", function(req, res){
    db.Burger.findAll({
        include:[
            {model: db.Customer}
        ]
    }).then(function(dbBurger){
        res.json(dbBurger);
    })
})

router.get("/api/burgers/:id", function(req, res){
    db.Burger.findAll({
        where: {id: req.params.id},
        
        include:[
            {model: db.Customer}
        ]
    }).then(function(dbBurger){
        res.json(dbBurger);
    })
})

router.post("/api/burgers/", function(req, res){

    //Giving default image if not image URL link is provided
    if(req.body.img_link === ""){
        req.body.img_link = "/img/hamburger.png"
    }
    db.Burger.create({
        burger_name: req.body.burger,
        img_link: req.body.img_link
    }).then(function(results){
        console.log(results)
        return res.json(results);
    })
   

})

router.put("/api/burgers/:id", function(req, res){
    console.log(req.body)
    var customerName = req.body.customer;
    console.log(customerName);
    //Putting customer name into Customer table
    db.Customer.create({
        customer_name: customerName,
    }).then(function(results){
        console.log("results");
        console.log(results);
        //Adding customer_id column to Burgers Table
        db.Burger.update({
            CustomerId: results.id,
            devoured: req.body.devoured
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(){
            return res.redirect("/")
        })

    })

})

router.get("/", function(req, res){

    console.log("going to home route")
    db.Burger.findAll({
        include:[
            {model: db.Customer}
        ]
    }).then(function(dbBurger){
        console.log(dbBurger)
        res.render("index", {burgers: dbBurger})
    })
    

})

module.exports = router;
