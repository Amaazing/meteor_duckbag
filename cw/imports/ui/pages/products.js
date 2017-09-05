import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/products.js';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './products.html';

var totalItemCount = new ReactiveVar(0);
var displayItemCount = new ReactiveVar(0);
var searchOrProducts = new ReactiveVar();

// ======================= PRODUCTS TEMPLATE =======================

Template.products.onCreated(function(){
	Template.instance().autorun(function(){
		if 			(FlowRouter.getRouteName() == "products")	searchOrProducts.set("productsViewTemplate");
		else if 	(FlowRouter.getRouteName() == "search")		searchOrProducts.set("searchResultsTemplate");
	});

});

Template.products.onRendered(function(){
	var next = $("#mobile-pagination .next");
	var previous = $("#mobile-pagination .previous");
	$('body').bind('touchmove', function(e) { 

		reference_top	=	function(){return document.getElementsByClassName("products-display-text")[0].getBoundingClientRect().top}
		next_top		=	function(){return document.getElementById("mobile-next").getBoundingClientRect().top}
		previous_top	=	function(){return document.getElementById("mobile-previous").getBoundingClientRect().top}

		if (!next.hasClass("fixed-next") && reference_top() <= 0) {
			next.addClass("fixed-next");
			previous.addClass("fixed-previous");
		} else if (next.hasClass("fixed-next") && reference_top() > 0){
			next.removeClass("fixed-next");
			previous.removeClass("fixed-previous");
		}

	});	
});

Template.products.helpers({
	searchOrProducts(){
		return searchOrProducts.get();
	}
});

Template.products.events({
	'click .next'(event){
        var currentPage = getPage();
        var nextPage = currentPage + 1;
        FlowRouter.setQueryParams({page: nextPage});
   	},
   	'click .previous'(event){
        var currentPage = getPage();
        var previousPage = currentPage - 1;
        if (previousPage <= 0) previousPage = 1;
        FlowRouter.setQueryParams({page: previousPage});
   	}
});

Template.products.onDestroyed(function(){
	$('body').unbind('touchmove');
});

// ======================= PRODUCTS VIEW TEMPLATE =======================

Template.productsViewTemplate.onCreated(function(){
	var instance = Template.instance();	
	instance.autorun(function(){
		handle = Meteor.subscribe("products.category", getCategory());	
	});
});

Template.productsViewTemplate.helpers({
	products(){
		var page = getPage();
		var category = getCategory();

		totalItemCount.set(Products.search_category(category).count());

		var productsToDisplay = Products.search_category(category, page);

		displayItemCount.set(productsToDisplay.count());

		return productsToDisplay;
	},

	category(){
		categories = [];

		if (_.isEmpty(getCategory())) return categories[0] = [{active: false, category:"all"}];

		for (i = 0; i < getCategory().length; i++){
			categ = {};
			categ['category'] = getCategory()[i];
			categ['active'] =  (i == (getCategory().length - 1) );
			categories.push(categ);
		}

		return categories;
	}

});

Template.registerHelper("isFavourite", function(){
	if (Meteor.user() && Meteor.users.findOne() != undefined &&  Meteor.users.findOne().favourites != undefined && Meteor.users.findOne().favourites.length > 0){
		var favourites = Meteor.users.findOne().favourites;
		return _.contains(favourites, this._id);
	}
});

// this is a BODY event, applies to not the productsViewTemplate, but everything under body
// using gwendall:body-events
Template.body.events({

   	'click .product-item > *:not(.heart)' (event){
   		var pathDef = "/products/item/:pid";
   		var id = $(event.target).parent().attr("id");
		var params = {pid: id};
		var path = FlowRouter.path(pathDef, params);
		FlowRouter.go(path);
   	},

   	'click .heart-path'(event){
   		// addClass doesn't work with SVG's
   		// http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
   		
   		var target = $(event.currentTarget).parent();
   		console.log(event.target);
		var heartSelected = $.inArray("heart-selected", $(target).attr("class").split(' '));
		var pid = target.parent().attr('id');

		if (heartSelected == -1){
			// selected
   			
   			target.attr("class", "heart heart-selected animated bounce");

			if (Meteor.user()){
				// logged in
				Meteor.call("updateFavourites", Meteor.userId(), pid);
			} else {
				// logged out
			}

		} else if (heartSelected == 1){
			// deselected

   			target.attr("class", "heart heart-deselected");

			if (Meteor.user()){
				// logged in
	   			Meteor.call("removeFavourites", Meteor.userId(), pid);
			} else {
				// logged out
			}
		}

   	},

   	'mouseleave .product-item'(event){
   		var target = $(event.currentTarget).find("> .heart");
   		if (target[0] == undefined) return;
		var heartDeselected = _.contains($(target).attr("class").split(' '), "heart-deselected");
   		if (heartDeselected == 1)
   			target.attr("class", "heart");
   	}

});

// ======================= SEARCH RESULTS TEMPLATE =======================

Template.searchResultsTemplate.onCreated(function(){
	var instance = Template.instance();	
	instance.autorun(function(){
		handle = Meteor.subscribe("products.search", getQuery());
	});
});

Template.searchResultsTemplate.helpers({
	query(){
		return getQuery(1);
	},

	products(){
		var page = getPage();
		// get query as array
		var query = getQuery()

		totalItemCount.set(Products.search(query).count());
		var productsToDisplay = Products.search(query, page);
		displayItemCount.set(productsToDisplay.count());

		return productsToDisplay;
	}
})

// ======================= PAGINATOIN =======================

Template.registerHelper('firstPage', function(){
	return getPage() == 1;
});

Template.registerHelper('lastPage', function(){
	return getPage() == Math.ceil(totalItemCount.get()/6);
});

Template.paginationTemplate.helpers({
	pages(){
		var page = getPage();
		var total_pages = Math.ceil(totalItemCount.get() / 6);
		var pages_window = [];
		var pages_window_length = 5;
		var pages_window_start = 1;
		var pages_window_end = 5;

		if (page <= pages_window_length){
			pages_window_start = 1;
			pages_window_end = pages_window_length;

		} else if (page > (total_pages - pages_window_length)){
			pages_window_start = total_pages - pages_window_length + 1;
			pages_window_end = total_pages;

		} else {
			pages_window_start = page - 2;
			pages_window_end = page + 2;
		}

		for (var i = pages_window_start; i <= pages_window_end; i++){
			var v = page == i;
			pages_window.push({
				pageNumber: i,
				activePage: v
			});
		}

		return pages_window;
	},

	totalItemCount(){
		return totalItemCount.get();
	},

	displayedItemCount(){
		return (displayItemCount.get() + ((getPage() - 1) * 6));
	},

});

// ======================= OTHER FUNCTIONS =======================

function getPage(){
	// need this as urls with hashs will stop the reactive update events through API
	FlowRouter.watchPathChange()
	var page;
// getParameterByName will ONLY happen if there is a HASH in the url e.g. .../jeans#snap-top-view
// if there isn't a HASH FlowRouter returns ""
	if (FlowRouter.current().context.hash != "") page = getParameterByName("page");
	else page = FlowRouter.getQueryParam("page");

	page = parseInt(page);
	if (! page > 0) page = 1;
	return page;

}

function getCategory(){
	var category_gender = FlowRouter.getParam("category_gender");
	var category_type = FlowRouter.getParam("category_type");
	var category_type_sub = FlowRouter.getParam("category_type_sub");

	category = [category_gender, category_type, category_type_sub];

// filter to get rid of 'undefined' values
// see common/utils.js -> RegExp.category(s)
	return category.filter(function(n){return n != undefined;});

}

// returns query value as either String[] OR String
// do i think this is good design? 😂
// IT'S BEEN ESCAPED IN NAV.JS DONT WASTE TIME LOOKING FOR IT
function getQuery(flag){
	//flag = 0 -> return array
	//flag = 1 -> return string
	var query;

	if (FlowRouter.current().context.hash != "") query = getParameterByName("q");
	else query = FlowRouter.getQueryParam("q");

	if (query == undefined) return "";
	if (flag == undefined) flag = 0; if (flag == 1) return query;

	// remove white spaces, and split to array
	query = query.replace(/\s\s+/g, ' ').split();

	return query;
}

/*
* this is a dirty hack i know. yes i do hate myself. need this because having the # at the end of the url
* prevents getQueryParam from returning the query parameters i.e. /products?page=2#top will not work
* http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
*/
function getParameterByName(name) {
  	url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}