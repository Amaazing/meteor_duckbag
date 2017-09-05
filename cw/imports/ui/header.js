import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import './header.html';
import './nav.js';
import './userbar.js';
import './accounts.js';

Tracker.autorun(function(){
	if (Meteor.user()){
		Meteor.subscribe("userData");
	};
});