Tracker.autorun(function() {  
  if (Session.get('productsSearch'))
    Meteor.subscribe('products.search', Session.get('productsSearch'));
});