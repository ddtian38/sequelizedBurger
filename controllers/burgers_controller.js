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
    //Putting customer name into Customer table
    db.Customer.create({
        customer_name: req.body.customer,
    }).then(function(results){
        //Adding customer_id column to Burgers Table
        db.Customer.findAll({
            attributes: ["id"]
        },
            {
                where: {
                    customer_name : req.body.customer}
            })
            .then(function(result){
                console.log("aaaaa")
                var customerID = result[0].dataValues.id;
                db.Burger.update({
                    CustomerId: customerID
                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(function(){
                    db.Burger.findOne({
                        where: {
                            id: req.params.id
                        },
                        include:[
                            {model: db.Customer}
                        ]
                    }).then(function(dbBurger){
                        console.log(dbBurger)
                        res.json(dbBurger)
                    })
                })
            })

    })

})

router.get("/", function(req, res){

    db.Burger.findAll({}).then(function(dbburger){
        res.render("index", {burgers: dbburger})
    })
})

module.exports = router;