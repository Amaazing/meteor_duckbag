import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Basket = new Mongo.Collection('basket', {connection: null});

var basketObserver = new PersistentMinimongo(Basket);

// Basket.insert(
// 		{
// 			item: "8fRBcAcNFMss9RhSZ",
// 			colour: "red",
// 			size: "22"
// 		}
// );

// Basket.insert(
// 		{
// 			item: "EEa3fd8j9Pe995Pre",
// 			colour: "aaa",
// 			size: "222"
// 		}
// );


Basket.getItems = function(){
	return Basket.find({});
}

Basket.add = function(pid, colour, size){
	if (colour === undefined) colour = null;
	if (size === undefined) size = null;
	console.log(Basket.find({"item":pid}).count());
	var checkDup = Basket.find({"item":pid});
	if (checkDup.count() > 0){
		Basket.update(
			{item: pid},
			{ $inc : {quantity: 1}}
		);
		return;
	}

	Basket.insert({
		item: pid,
		colour: colour,
		size: size,
		quantity: 1
	});	
}

Basket.removeItem = function(pid){
	pid = String(pid);
	Basket.remove({"item": pid});
}

Basket.empty = function(){
	Basket.remove({});
}