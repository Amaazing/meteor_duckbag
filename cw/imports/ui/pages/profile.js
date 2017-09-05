import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.profile.helpers({
	userEmail(){
		if (Meteor.users.findOne() != undefined) // not a very nice solution but w/e i don't have time to look for a better one
			return Meteor.users.findOne().emails[0].address;
	},

	userName(){
		if (Meteor.users.findOne() != undefined)
			return Meteor.users.findOne().profile.name;
	}
});