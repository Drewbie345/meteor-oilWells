Template.wellPage.helpers({
  comments: function() {
    return Comments.find({wellId: this._id})
  }
});
