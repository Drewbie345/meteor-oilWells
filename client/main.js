Meteor.subscribe('wells');
Meteor.subscribe('users');
Meteor.subscribe('rigs');

UI.registerHelper('setId', function() {
  return Session.set('wellId', this._id)
});