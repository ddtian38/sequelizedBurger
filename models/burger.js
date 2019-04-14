var orm = require("../config/orm.js");

class Burger {
    constructor(){

    }
    all(cb){
        orm.selectAll("burgers", function(res){
            cb(res)
            console.log("Receiving data.")
        })
    }

    insert(cols, vals, cb){
        orm.insert("burgers", cols , vals, function(res){
            cb(res)
            console.log("Inserting data.")
        })
    }

    update(val, id, cb){
        
        orm.updateOne("burgers", "devoured", val, id, function(res){
            cb(res)
            console.log("Updating data.")
        })
    }
}

var burger = new Burger();
module.exports = burger;