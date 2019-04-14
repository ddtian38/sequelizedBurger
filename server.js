const express = require("express");
// const path = require("path");

const app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars")

var routes = require("./controllers/burgers_controller.js")


app.use(routes)

app.listen(PORT, function(){
    console.log("Listening on http://localhost:"+PORT)
})