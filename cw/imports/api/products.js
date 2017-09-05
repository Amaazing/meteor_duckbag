import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

Products.search = function(query, page) {
	// query is a String[]
	var limit;
	var q_ = '.*';
	if (query == undefined) query = "";
	if (page == undefined){
		page = 1;
		limit = 0;
	} else {
		limit = 6;
	}

	for ( i = 0; i < query.length; i++ ){
		query[i] = RegExp.escape2(query[i]);
		q_ = query[i] + '.*';
	}

	query_regex = new RegExp(q_);

	return Products.find(
						{
							name: {
								$regex: query_regex	,
								$options: 'i'
							}
						},
						{
							skip: (page - 1) * 6,
							limit: limit
						}
					);
};

Products.search_category = function(category, page) {
	var limit;
	if (page == undefined){
		page = 1;
		limit = 0;
	} else {
		limit = 6;
	}
	var category_regex = RegExp.category(category);
	return Products.find(
						{
							category: {
								$regex: category_regex,
								$options: 'i'
							}
						},
						{
							skip: (page - 1) * 6,
							limit: limit
						}
					);
};

Products.search_item = function(query){
	console.log(query);
	return Products.find({
		"_id" : query
	});
}