var express = require('express');
var bodyParser = require('body-parser');
var user_db = require('./moduli/mongoose/user');
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
    
    var user_find =  {
                number : req.body.number,
                password : req.body.password
            };
        
user_db.findOne(user_find, function(err, users) {
  if (err) throw err;
         if(users){
             res.send({ "answer" : "1"});
         }else {
             res.send({ "answer" : "0"})
         }
    });  
});


app.listen(8081);
console.log("App listening on port 8081");
