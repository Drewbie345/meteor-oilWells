Template.users.helpers({
  users: function() {
    return Meteor.users.find();
  }
});

Template.users.rendered = function() {
  var currentWellId = Session.get('wellId');
  var currentWell = Wells.findOne({_id: currentWellId});
  $('#' + currentWell.landman).prop('selected', true);
}