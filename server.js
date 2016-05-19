var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('.'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.set('superSecret', "stringa_segreta");

app.get('/', function(req, res) {
  res.sendFile("index.html");
});


app.post("/login_result",function (req,res){
    var user =  {
        "number" : req.body.number,
        "password" : req.body.password
    };
   console.log(user);
    res.send(user);
});


app.listen(8081);
console.log("App listening on port 8081");
