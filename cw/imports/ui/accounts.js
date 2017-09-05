import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './accounts.html';

Template.accountsTemplate.helpers({
	userId(){
		return Meteor.userId();
	}
});

Template.accountsTemplate.events({
	'click #logout'(event){
		Meteor.logout();
	}
})