Meteor.publish('wells', function(options) {
  return Wells.find({}, options);
});

Meteor.publish('singleWell', function(id) {
  return id && Wells.find(id);
});