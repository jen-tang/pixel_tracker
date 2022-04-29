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


	if(req.query.delname){
		
		Item.findOneAndDelete({user: req.user._id, name: req.query.delname }, function (err) {
			if(err) {
				console.log(err);}
			else{
				console.log("Successful deletion");
				Item.find({user: req.user ? req.user._id : undefined}, (err, lists, count) => {
					res.render('expenses.hbs', {lists:lists});
				});
			}
			
	});}
	else if(req.query.category){
		Item.find({user: req.user._id, category: req.query.category}, function(err, ret, count) {
            res.render('expenses.hbs', {lists: ret});
            //console.log(varToStoreResult); // <---- variable contains found documents!
            });
	}
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



router.get('/visualization', (req, res) => {
	//const data = [100, 50, 300, 40, 350, 250]; // assuming this is coming from the database
  	
	Item.find({user: req.user ? req.user._id : undefined}, (err, lists, count) => {
		
		
	var result = lists.reduce(function (acc, obj) { return acc + obj.price; }, 0);


	let categorytotals = Object.values(
    lists.reduce(
      (r, { category, price }) => (
        (r[category] = {
          category,
          totalSum: ((r[category]?.totalSum || 0) + +price),
        }),
        r
      ),
      {}
    )
  );


		
		categorytotals = categorytotals.map(r => {
			return {category: r.category, totalSum: r.totalSum.toFixed(2)};
		
		});


		let finalcategorytotals = {};
		finalcategorytotals = categorytotals.map(r=>{
			finalcategorytotals[r.category] = r.totalSum;
			return finalcategorytotals;
		})
		console.log(finalcategorytotals)
	let maxprice = lists.reduce(function(prev, current) {
		return (prev.price > current.price) ? prev : current
	})
	//maxprice = maxprice.name;
	

	res.render('visualization.hbs', {lists:lists, result: result, category: categorytotals, item: maxprice, graph: JSON.stringify(finalcategorytotals[0])});
	});
	
});

router.post('/visualization', (req, res) => {
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
