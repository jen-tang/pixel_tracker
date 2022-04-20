const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Item = mongoose.model('Item');
	hb = require('handlebars');
	moment = require("moment");

hb.registerHelper('dateFormat', function (date, options) {
		const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
		return moment(date).format(formatToUse);
});

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

	if(req.query.delname){
		
		Item.findOneAndDelete({ name: req.query.delname }, function (err) {
			if(err) {
				console.log(err);}
			else{
				console.log("Successful deletion");
				Item.find({user: req.user ? req.user._id : undefined}, (err, lists, count) => {
					res.render('expenses.hbs', {lists:lists});
				});
			}
			
	});}
	else{
		Item.find({user: req.user ? req.user._id : undefined}, (err, lists, count) => {
			res.render('expenses.hbs', {lists:lists});
		});
	}

});

router.post('/', (req, res) => {
    const iname = req.body.name;
    const icost = req.body.cost;
	let idate = req.body.date;
	if(!req.body.date){
		idate = Date.now();
	}
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



router.get('/visualizations', (req, res) => {
  res.render('visualizations.hbs');
});

router.post('/visualizations', (req, res) => {
/* 	const {name} = req.body;
	new Item({
    user: req.user._id,
		name: name,
		createdAt: Date.now()
	}).save((err, list, count) => {
		res.redirect(`/`);
	}); */
}); 

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
