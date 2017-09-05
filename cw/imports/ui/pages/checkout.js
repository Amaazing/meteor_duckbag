import { Template } from 'meteor/templating';
import { Products } from '/imports/api/products.js';
import { Basket } from '/imports/api/basket.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './checkout.html'

var currentItem;

Template.checkout.helpers({
	items(){
		return Basket.getItems();
	},

	total(){
		var items = Basket.getItems();
		var total = 0;
		_.forEach(items.fetch(), function(i){
		    try{
		    	total += Products.findOne({"_id" : i.item }).price;
		    } catch (err){}
		});
		return total;
	}
})

Template.checkout.events({
	'click #checkout'(event){
		FlowRouter.go("/");
		Basket.empty();
		
	}
});


// TEMPLATE CHECKOUTITEM HELPERS
/*
*
* Hahaha yea I know this is disgusting 😂😂😂
*
*/

Template.checkoutItem.helpers({
	checkoutProductName(){
		setCurrentItem();
		return currentItem ? currentItem.name : "";
	},

	checkoutProductPrice(){
		setCurrentItem();
		return currentItem ? currentItem.price : "";
	},

	checkoutProductImage(){
		setCurrentItem();
		return currentItem ? currentItem.img_path : "";
	}
})

Template.checkoutItem.events({
	'click .glyphicon-trash'(event){
		var item = Template.currentData().item;
		Meteor.defer(function(){
			Basket.removeItem(item);
		});		
	}
})

function setCurrentItem(){
	if (Template.currentData().item === undefined) return null;		
	currentItem = Products.findOne({"_id":Template.currentData().item});
};