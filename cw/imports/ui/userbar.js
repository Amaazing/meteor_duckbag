import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './userbar.html';

// 0 == login
// 1 == register
var modal_state = new ReactiveVar(0);

Template.userbar.helpers({
	modalState(){
		console.log(modal_state.get());
		return modal_state.get() ? "signUp" : "signIn";
	}
});

Template.userbar.onRendered(function(){
// https://www.w3schools.com/howto/howto_css_modals.aspl
	if(!Meteor.user()){
		var modal = document.getElementById('modal');
		var login = document.getElementById('login');
		var register = document.getElementById('register')
		var close = document.getElementsByClassName("close")[0];

		modal_display_block = function() {modal.style.display = "block";}


		register.onclick = function(){
			modal_state.set(1);
			modal_display_block();
		}

		login.onclick = function() {
			modal_state.set(0);
			modal_display_block();
		}

		close.onclick = function() {
		    modal.style.display = "none";
		}

		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
	}
});

Template.userbar.events({
	'click #logout'(event){
		Meteor.logout();
	}
});