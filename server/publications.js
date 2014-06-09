Meteor.publish('wells', function(options) {
  return Wells.find({}, options);
});

Meteor.publish('comments', function(wellId) {
  return Comments.find({wellId: wellId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('singleWell', function(id) {
  return id && Wells.find(id);
});

Meteor.publish('users', function() {
  return Meteor.users.find({}, {fields: {username: 1, profile: 1}});
})