const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  // username, password
  categories:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

const Item = new mongoose.Schema({
	name: {type: String, required: true},
	price: {type: Number, min: 0, required: true},
}, {
	_id: true
});


const Category = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  name: {type: String, required: true},
	createdAt: {type: Date, required: true},
	items: [Item]
});


User.plugin(passportLocalMongoose);
List.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Category', Category);
mongoose.model('Item', Item);
mongoose.connect('mongodb://localhost/grocerydb');
