import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../layouts/base-layout.js';
import '../../ui/header.js';
import '../../ui/footer.js';
import '../../ui/pages/home.js';
import '../../ui/pages/products.js';
import '../../ui/pages/productItem.js';
import '../../ui/pages/checkout.js';
import '../../ui/pages/profile.js';
import '../../ui/pages/favourites.js';
import '../../ui/pages/test.js';

FlowRouter.route('/',{
	name: "home",
	action: function(){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'home',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/search',{
	name: "search",
	action: function(params, queryParams){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'products',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/products',{
	name: "products",
	action: function(params, queryParams){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'products',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/products/:category_gender',{
	name: "products",
	action: function(){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'products',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/products/item/:pid',{
	name: "products",
	action: function(){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'productItem',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/products/:category_gender/:category_type',{
	name: "products",
	action: function(){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'products',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/products/:category_gender/:category_type/:category_type_sub',{
	name: "products",
	action: function(){
		BlazeLayout.render('base-layout',{
			header: 'header',
			content: 'products',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/checkout',{
	name: "checkout",
	action: function(){
		BlazeLayout.render('base-layout', {
			header: 'header',
			content: 'checkout',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/profile',{
	name: "profile",
	action: function(){
		BlazeLayout.render('base-layout', {
			header: 'header',
			content: 'profile',
			footer: 'footer'
		});
	}
});

FlowRouter.route('/profile/favourites',{
	name: "favourites",
	action: function(){
		BlazeLayout.render('base-layout', {
			header: 'header',
			content: 'favourites',
			footer: 'footer'
		});
	}
});

// this was for internal tests
FlowRouter.route('/test',{
	name: "test",
	action: function(){
		BlazeLayout.render('testLayout');
	}
});