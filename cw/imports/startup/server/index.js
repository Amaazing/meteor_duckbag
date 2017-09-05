import { Meteor } from 'meteor/meteor';
import { Monogo } from 'meteor/mongo';
import { Products } from '/imports/api/products.js';
import './methods.js';
import './publications.js';

Meteor.startup(function() {

	if (Products.find().count()==0){
		console.log("DATA INSERTED");
		var data = JSON.parse(Assets.getText('test_data_with_more_data.json'));

			_.forEach(data, (val) => {
	            Products.insert(val);
	        });
	}
});