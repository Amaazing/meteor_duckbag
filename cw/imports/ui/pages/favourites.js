import { Meteor } from 'meteor/meteor';
import { Template} from 'meteor/templating';
import { Products } from '/imports/api/products.js';

import './favourites.html';

Template.favourites.helpers({
	products(){
		if (!(Meteor.users.findOne() == undefined)){
			favourites_list = [];
			var favourites = Meteor.users.findOne().favourites;
			for	(i = 0; i < favourites.length; i++){
				var	pid = favourites[i];
				Meteor.subscribe('products.item', pid);
				favourites_list.push(Products.findOne( {_id : pid} ));
			}
			return favourites_list;
		}
	},

	favouritesExist(){
		if (Meteor.users.findOne() != undefined && Meteor.users.findOne().favourites != undefined){
			return Meteor.users.findOne().favourites.length > 0;
		}
	}
});