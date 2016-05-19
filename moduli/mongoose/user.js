// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rubrica');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  number : String,
  password : String
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = User;