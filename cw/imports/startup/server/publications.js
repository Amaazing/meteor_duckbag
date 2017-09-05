import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/products.js';
import './products_publications.js';

Meteor.publish('userData', function () {

	if (this.userId) {
		return Meteor.users.find( { _id: this.userId } );
	} else {
    	this.ready();
	}

});

Meteor.publish('userFavourites', function(){
	return Meteor.users.find( {_id: this.userId} ).favourites;
})