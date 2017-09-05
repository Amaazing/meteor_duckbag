import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Products } from '/imports/api/products.js';
import { Check } from 'meteor/check';

import './test.html';

Tracker.autorun(function() {  
  if (Session.get('productsSearch'))
    Meteor.subscribe('products.search', Session.get('productsSearch'));
});

Template.testLayout.events({  
  'keyup [type=text]': function(event, template) {
  	if (event.keyCode == 13)
    Session.set('productsSearch', event.target.value);
  },

  'submit .navbar-form'(event){
    event.preventDefault();
    console.log(event.target.butt.value);
  }
});

Template.testLayout.helpers({  
  searchResults: function() {
    return Products.search(Session.get('productsSearch'));
  },
  productsSearch: function() {
    return Session.get('productsSearch');
  }
});