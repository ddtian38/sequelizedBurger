const connection = require("./connection.js")
console.log("hi")

class Orm{
    constructor(){

    }

    createQuestionMarks(arr){
        var str = []
        for(var i = 0; i < arr.length; i++){
            str.push("?")
        }
        
        return str.toString();
    }
    selectAll(table, cb){
        var query = "SELECT * FROM ??"
        connection.query(query, [table], function(err, data){
            if(err){throw err}
            // console.log(data);
            cb(data)
        })

    }

    insert(table, cols, vals, cb){
        console.log(vals)
        var query = "INSERT INTO " + table;
        query += "(",
        query += cols.toString();
        query += ") VALUES (";
        query += this.createQuestionMarks(vals)
        query += ");"
     
        console.log(query)
        connection.query(query, vals, function(err, res){
            if(err) throw err;
            // console.log(res);
            cb(res);
        })
        
    }

    updateOne(table, col, val, id, cb){
        var query = "UPDATE ?? SET ?? = ? WHERE id = ?";
        connection.query(query, [table, col, val, id], function(err, res){
            if (err) throw err;
            // console.log(res);
            cb(res);
        })

    }

}

const orm = new Orm()
module.exports = orm;
