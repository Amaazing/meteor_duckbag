import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/products.js';

// ============================== PRODUCTS PUBLICATIONS ==============================

// returns all products
Meteor.publish('products', function () {
	return Products.find({});
});

//not used
Meteor.publish('products.page', function (page) {
	limit = 6;
	skip = (page - 1) * limit;
	console.log("SKIP = " + skip);
	return Products.find({}, {
		skip: parseInt(skip),
		limit: 6
	});
});

Meteor.publish('products.search', function(query) {  
	// check(query, String);
	// if (_.isEmpty(query)) return null;
	return Products.search(query);
});

Meteor.publish('products.category', function(category) {
	category = RegExp.category(category);
	check(category, String); 
	return Products.search_category(category);
});

Meteor.publish('products.item', function(pid) {  
  check(pid, String);
  return Products.search_item(pid);
}); 