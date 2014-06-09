Template.wellItem.helpers({
  ownWell: function() {
    return this.userId == Meteor.userId();
  }
});