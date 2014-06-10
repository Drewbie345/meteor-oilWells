Meteor.subscribe('wells');
Meteor.subscribe('users');

UI.registerHelper('setId', function() {
  return Session.set('wellId', this._id)
});