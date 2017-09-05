// not used old version of products
// code is a complete cluster fuck :D

// import { Template } from 'meteor/templating';
// import { Meteor 	} from 'meteor/meteor';
// import { Products } from '/imports/api/products.js';
// import { Tracker 	} from 'meteor/tracker';
// import { FlowRouter } from 'meteor/kadira:flow-router';

// import './products.html';

// var dep = new Tracker.Dependency;
// var totalCount;
// var maxPage;
// var pages = [];
// var handle;
// var category = "";
// var itemsResults;

// Template.productsViewTemplate.onCreated(function(){
// 	var instance = Template.instance();	
// 	instance.autorun(function(){
// 		handle = Meteor.subscribe("products");
// 		// if (!category) handle = Meteor.subscribe("products");
// 		// else handle = Meteor.subscribe("products.category", category);
// 		if(handle.ready()){
// 			totalCount = Products.find().count();
// 			if (totalCount == 0) category = "";
// 			maxPage = Math.ceil(totalCount/6);
// 		}
// 		//var page = getPage();
// 		//Meteor.subscribe("products.page", page);
// 		//Products_results = Products.find();
// 	});
// });

// Template.productsViewTemplate.onRendered(function(){
// 	var next = $("#mobile-pagination .next");
// 	var previous = $("#mobile-pagination .previous");
// 	$('body').bind('touchmove', function(e) { 
// 		if (this.scrollTop > 450) {
// 			next.addClass("fixed-next");
// 			previous.addClass("fixed-previous");
// 		} else {
// 			next.removeClass("fixed-next");
// 			previous.removeClass("fixed-previous");
// 		}
// 	});	
// })

// Template.productsViewTemplate.helpers({
// 	products(){
// 		category = FlowRouter.getParam('category');
// 		var page = getPage();
// 		regex = category ? RegExp.category(RegExp.escape2(category)) : ""
// 		itemsResults =  Products.find({
// 			category: {
// 				$regex: regex,
// 				$options: 'i'
// 			}
// 		},
// 		{
// 			skip: (page - 1) * 6,
// 			limit: 6
// 		});
// 		dep.changed();
// 		return itemsResults;
// 	},

// 	category(){
// 		handle.ready();
// 		if (totalCount== 0) return "";
// 		return FlowRouter.getParam('category');
// 	},

// 	pages(){
// 		var ready = handle.ready(); // needed for reactivity
// 		var page = getPage();
// 		var total_pages = maxPage;
// 		var pages_window = [];
// 		var pages_window_length = 5;
// 		var pages_window_start = 1;
// 		var pages_window_end = 5;

// 		if (page <= pages_window_length){
// 			pages_window_start = 1;
// 			pages_window_end = pages_window_length;

// 		} else if (page > (total_pages - pages_window_length)){
// 			pages_window_start = total_pages - pages_window_length + 1;
// 			pages_window_end = total_pages;

// 		} else {
// 			pages_window_start = page - 2;
// 			pages_window_end = page + 2;
// 		}

// 		for (var i = pages_window_start; i <= pages_window_end; i++){
// 			var v = page == i;
// 			pages_window.push({
// 				pageNumber: i,
// 				activePage: v
// 			});
// 		}

// 		return pages_window;
// 	},

// 	firstPage(){
// 		return getPage() == 1;
// 	},

// 	lastPage(){
// 		var ready = handle.ready(); // needed for reactivity
// 		return getPage() == maxPage;
// 	},

// 	productsRangeL(){
// 		handle.ready()
// 		if (totalCount==0) return 0;
// 		return 6 * getPage() - 5;
// 	},

// 	productsRangeH(){
// 		var ready = handle.ready(); // needed for reactivity
// 		// if (totalCount==0) return 0;
// 		// if (getPage() == maxPage) return totalCount;
// 		// else return 6 * getPage();
// 		dep.depend();
// 		return itemsResults ? itemsResults.count() + (getPage()-1)*6 : "";

// 	},

// 	totalProducts(){
// 		var ready = handle.ready(); // needed for reactivity
// 		// return totalCount
// 		dep.depend();
// 		return itemsResults ? itemsResults.count() : "";
// 	}
// });

// Template.productsViewTemplate.events({
// 	'click .next'(event){
//         var currentPage = getPage();
//         var nextPage = currentPage + 1;
//         FlowRouter.setQueryParams({page: nextPage});
//         // pageDep.changed();
//    	},

//    	'click .previous'(event, template){
//         var currentPage = getPage();
//         var previousPage = currentPage - 1;
//         if (previousPage <= 0) previousPage = 1;
//         FlowRouter.setQueryParams({page: previousPage});
//    	},

//    	'click .product-item'(event){
//    		var pathDef = "/products/item/:pid";
// 		var params = {pid: event.target.id};
// 		var path = FlowRouter.path(pathDef, params);
// 		FlowRouter.go(path);
//    	}
// });

// function getPage(){
	
// 	var page = FlowRouter.getQueryParam("page");
// 	if (page == undefined) page = getParameterByName("page");
// 	page = parseInt(page);
// 	if (!page > 0) page = 1;
// 	return page;
// }

// /*
// * this is a dirty hack i know. yes i do hate myself. need this because having the # at the end of the url
// * prevents getQueryParam from returning the query parameters i.e. /products?page=2#top will not work
// * http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
// */
// function getParameterByName(name) {
//   	url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }