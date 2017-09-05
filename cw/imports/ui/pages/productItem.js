import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/products.js';
import { Basket } from '/imports/api/basket.js';
import { Session } from 'meteor/session';


import "./productItem.html";

var handle;

Template.productItem.onCreated(function(){
	var instance = Template.instance();

	instance.autorun(function(){
		pid = FlowRouter.getParam('pid');
		handle = Meteor.subscribe("products.item", pid);
	})
});

Template.productItem.events({
	'click .colours-buttons > .button' (event){
		Session.set("colour", event.target.id)
	},

	'click .size-buttons > .button' (event){
		Session.set("size", event.target.id)
	},

	'click .add-to-cart' (event) {
		Basket.add(FlowRouter.getParam("pid"), Session.get("colour"), Session.get("size"));
	}

});

Template.productItem.helpers({
	product(){
		return Products.findOne({"_id":FlowRouter.getParam("pid")});
	}
})

Template.productItem.onDestroyed(function(){
	Session.set("colour", null);
	Session.set("size", null);
});