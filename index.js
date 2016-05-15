var express = require('express');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

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


app.get("/qua",function (req,res){
    
    var user = { 
    name : "carlo",
    psw : "ciao2"
    };
    
    var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
});


app.listen(8081);
console.log("App listening on port 8081");
