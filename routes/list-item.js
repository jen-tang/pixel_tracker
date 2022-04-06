const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	Item = mongoose.model('Item');

router.post('/create', (req, res) => {
	const {listSlug, name, quantity}  = req.body;
	const listItem = {name, quantity};

	Item.findOneAndUpdate({slug:listSlug}, {$push: {items: listItem}}, (err, list, count) => {
    console.log(err);
		res.redirect(`/list/${listSlug}`);
	});
});

router.post('/check', (req, res) => {
	const {listSlug, items} = req.body;

	Item.findOne({slug:listSlug}, (err, list, count) => {
    console.log(`items: ${items}, list: ${list}`);
		for (let i = 0; i < list.items.length; i++) {
      console.log(list.items[i]);
			if (items?.includes(list.items[i].name)) {
				list.items[i].checked = true;
			}
		}
		list.markModified('items');
		list.save((err, savedpass, count) => {
      console.log(err);
			res.redirect(`/list/${listSlug}`);
		});
	});
});

module.exports = router;
