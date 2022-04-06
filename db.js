const mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs'),
  passportLocalMongoose = require('passport-local-mongoose');


const User = new mongoose.Schema({
  // username, password
  items:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const Item = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {type: String, required: true},
	price: {type: Number, min: 0, required: true},
	category: {type: String, required: false},
	date: {type: Date, default: Date.now, required: false}
}, {
	_id: true
});


User.plugin(passportLocalMongoose);
//Category.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Item', Item);
//mongoose.connect('mongodb://localhost/grocerydb');


mongoose.connect('mongodb+srv://user123:pass123@pixeltracker.0fpza.mongodb.net/PixelTracker?retryWrites=true&w=majority');
