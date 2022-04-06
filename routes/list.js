const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Item = mongoose.model('Item');

const isAuthenticated = (req, res, next) => {
  if(!req.user) {
    res.redirect('/'); 
    console.log('redirecting');
  } else {
    next();
  }
}

router.use(isAuthenticated)

router.get('/', (req, res) => {
	Item.find({user: req.user ? req.user._id : undefined}, (err, lists, count) => {
		res.render('list-all.hbs', {lists:lists});
	});
});

router.post('/', (req, res) => {
    const iname = req.body.name;
    const icost = req.body.cost;
    const idate = req.body.date;
    const icategory = req.body.category;
    if(!req.user.myexpenses){
        req.session.myexpenses = [];
    }

	
    new Item({
		user: req.user._id,
		name: iname,
		price: icost,
		category: icategory,
		date: idate
        //sessionID: req.session.id
	}).save(function(err, ret, count){
		res.redirect('back');
	});
});



/* router.get('/create', (req, res) => {
  res.render('list-create.hbs');
});

router.post('/create', (req, res) => {
	const {name} = req.body;
	new Item({
    user: req.user._id,
		name: name,
		createdAt: Date.now()
	}).save((err, list, count) => {
		res.redirect(`/`);
	});
}); */

/* router.post('/create', (req, res) => {
	const {name} = req.body;
	new Item({
    user: req.user._id,
		name: name,
		createdAt: Date.now()
	}).save((err, list, count) => {
		res.redirect(`/list/${list.slug}`);
	});
}); */

/* router.get('/:slug', (req, res) => {
	const {slug} = req.params;
	Category.findOne({slug}, (err, list, count) => {
		res.render('list-slug.hbs', {list, displayListItems:list.items.length >= 1});
	});
}); */

module.exports = router;
