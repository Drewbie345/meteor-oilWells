Template.wellEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentWellId = this._id;

    var wellProperties = {
      wellName: $(e.target).find('[name=wellName]').val(),
      county: $(e.target).find('[name=county]').val(),
      state: $(e.target).find('[name=state]').val()
    }

    Wells.update(currentWellId, {$set: postProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('wellPage', {_id: currentWellId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentWellId = this._id;
      Wells.remove(currentWellId);
      Router.go('wellsList');
    }
  }
});