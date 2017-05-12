var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Most of this is similar to the author model — we've declared a schema with a number of string fields and a virtual for getting the URL of specific book records, and we've exported the model.
//The main difference here is that we've created two references to other models (highlighted in bold above):
// author is a reference to a single Author model object, and is required.
// genre is a reference to an array of Genre model objects. We haven't declared this object yet!

var BookSchema = Schema({
  title: {type: String, required: true},
  author: {type: Schema.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  isbn: {type: String, required: true},
  genre: [{type: Schema.ObjectId, ref: 'Genre'}]
});

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);
