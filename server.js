var express = require('express');
var bodyParser = require('body-parser');
var collections = require('./moduli/mongoose/user');
var passport = require('passport');
var app = express();
var session = require('express-session');


require('./moduli/passport/init')();

//maxAge: 86400000 <--(ms)-- 24 hours
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 86400000 }, resave: true, saveUninitialized: true }));


app.use(express.static('.'));
//app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());
/*
app.get('/', function(req, res) {
    if(req.user){
        console.log("---->"+JSON.stringfy(req.user)+"<------");
        //res.status(201).send({ error: 0, user: user.number });
    }else { //non loggato
        console.log("----->non log<-----");
        res.sendFile("index.html");
    }
}); */
// route to test if the user is logged in or not
// used in server side
var auth = function(req, res, next){ //middleware for private root
    if (!req.user)
        res.send(401);
    else next(); 
};

// route to test if the user is logged in or not
// used in client side
app.get('/isAuthenticate', function(req, res) {
    if(req.user){ //{"_id":"573dc29a5bf391a17e49cc62","number":"3894387666","password":"ciaone"}
        res.status(201).send({ error: 0, number: req.user.number });
    }else {
        res.status(200).send({ error: 1}); 
    }
});




app.get('/logout', function(req, res) {
    
  req.logout();
    res.send({ error: 0});
});



 app.post('/login_result', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }        
        if (!user) {
            return res.status(200).send({ error: 1, message: "Bad User and/or Password" });
        }
        console.log("User " + user.number + " found.");
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            //res.send({ error: 0, user: user.number }, 201); 
            res.status(201).send({ error: 0, user: user.number });
        });
      })(req, res, next);
    });


 app.get('/find_contacts',auth, function(req, res) { 
     //for join in this route needs to be authorized
     collections.all_addressbook.find({owner : req.user.number}, function (err, contacts) {
        res.json(contacts);
    });
    });

 app.post('/add_contacts',auth, function(req, res) {
  
      var new_contact = collections.all_addressbook({
                  owner : req.user.number,
                    name : req.body.name,
                email : req.body.mail,
                phone : req.body.phone
            });
        
    new_contact.save(function(err) {
      if (err) throw err;
        
    collections.all_addressbook.find({owner : req.user.number}, function (err, contacts) {
        res.json(contacts);
    });
    });   
    }); 


 app.post('/update',auth, function(req, res) {
        
    collections.all_addressbook.findOneAndUpdate({_id : req.body._id}, {name : req.body.name, email : req.body.email, phone : req.body.phone }, function(err, user) {
  if (err) throw err;
                collections.all_addressbook.find({owner : req.user.number}, function(err, contacts) {
  if (err) throw err;
         res.json(contacts);
    }); 
});
    });


 app.post('/remove',auth, function(req, res) {
    
    collections.all_addressbook.findOneAndRemove({_id : req.body._id}, function(err, user) {
  if (err) throw err;
                collections.all_addressbook.find({owner : req.user.number}, function(err, contacts) {
  if (err) throw err;
         res.json(contacts);
    }); 
}); 
    });



app.listen(8081);
console.log("App listening on port 8081");
