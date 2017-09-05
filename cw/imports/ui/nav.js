import { Meteor } from 'meteor/meteor';
import { Templates } from 'meteor/templating';
import { Basket } from '/imports/api/basket.js';
import { Products } from '/imports/api/products.js';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';



import './nav.html';

/*
* this whole basket implementation is pretty freaking stupid
* i couldn't figure out how to get "Meteor.subcribe(products..." to happen reactivley, on each itteration of 
* basketsItemTemplate
*/

Template.nav.onRendered(function(){

})

Template.nav.helpers({
	/* yes this is hard coded. no it's not a good idea. yes it is stupid.
	* ideally i'd make a collection with the id like "cateogries" then pull the
	* data from there. but i'm slowly losing my mind on this coursework and the
	* two other i have, all due in fourteen days... *sigh*
	*/

	links:[
		{name: "All", path:"/products/"},
		{name: "Men", path:"/products/men"},
		{name: "Women", path:"/products/women"}
	]
});

// ======================= 	SEARCH =======================

Template.nav.events({  
	'keyup [type=text]' (event, template) {
		if (event.keyCode == 13){
			event.preventDefault();
  		}
    },

    'submit .navbar-form' (event) { 
        event.preventDefault();
        var query = event.target.query.value;
		query = RegExp.escape2(query);
    	Session.set('productsSearch', query);
    	FlowRouter.go('/search?q=' + query )
  	}
});

// ======================= 	BASKET =======================

Template.basketTemplate.helpers({
	baksetItemCountText(){
		var count = 0;
		_.forEach(Basket.getItems().fetch(), function(i){
			count += i.quantity;
		});

		var items = count == 1 ? "item" : "items";
		return (count + " - " + items);
	},

	basketItems(){
		return Basket.getItems();
	}
});

var currentItem = "";

Template.basketItemTemaplte.helpers({

	basketGetProductName(){
		setCurrentItem();
		return currentItem.name;
	},

	basketGetProductImage(){
		setCurrentItem();
		return currentItem.img_path;
	},

	basketGetProductPrice(){
		setCurrentItem();
		return currentItem.price;
	}
})

Template.basketItemTemaplte.events({
	'click .remove'(event){
		var item = Template.currentData().item;
		Meteor.defer(function(){
			Basket.removeItem(item);
		});		
	}
})

function setCurrentItem(){
		if (Template.currentData().item === undefined) return null;		
		var handle = Meteor.subscribe("products.item", Template.currentData().item);
		if (handle.ready()) { currentItem = Products.findOne({"_id":Template.currentData().item}); }
}