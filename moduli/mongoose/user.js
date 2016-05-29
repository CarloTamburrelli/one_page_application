// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rubrica');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  number : String,
  password : String
});

var all_addressbookSchema = new Schema({
  owner : String,
  name : String,
  email : String,
  phone : String
});
/*VOLENDO SI PUò AGGIUNGERE IL RIFERIMENTO ALLA COLLEZIONE AGGIUNGENDO UN PARAMETRO ALLA CLASSE SCHEMA: TIPO COSì:({
  owner : String,
  name : String,
  email : String,
  phone : String
}, {collection: 'nome_collezione'});
*/



// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema);

var all_addressbook = mongoose.model('all_addressbook', all_addressbookSchema,'all_addressbook');
//IL TERZO ARGMENTO INDICA SU QUALE ESISTENTE COLLEZIONE SI VUOLE ASSEGNARE LO SCHEMA


// make this available to our users in our Node applications
module.exports = {
    users : User,
    all_addressbook : all_addressbook
};