const express = require("express");

const app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require("./models")

//Setting up handlebars engine
const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars")

//Importing routes
var routes = require("./controllers/burgers_controller.js")

//Routes
app.use(routes)


//Syncing burger models and then starting express server
db.sequelize.sync({force: false}).then(function(){

    app.listen(PORT, function(){
        console.log("Listening on http://localhost:"+PORT)
    });

    
})

