Template.wellsList.helpers({
  wells: function() {
    return Wells.find({}, {sort: {submitted: -1}});
  }
});