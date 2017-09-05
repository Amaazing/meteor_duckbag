import { Meteor } from 'meteor/meteor';

Meteor.methods({

// http://stackoverflow.com/questions/36518635/avoid-a-duplicate-value-when-i-update-array-using-push-on-mongodb
	updateFavourites(id, pid){
		Meteor.users.update(
					{"_id" : id},
					{$addToSet: 
						{"favourites" : 
							{ $each: [pid] }
						}
					}
		);

	},

	removeFavourites(id, pid){
		Meteor.users.update(
			{"_id" : id},
			{$pull : {"favourites" : pid}},
		);
	}
});