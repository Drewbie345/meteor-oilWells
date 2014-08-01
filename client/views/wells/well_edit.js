Template.wellEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentWellId = this._id;
    var currentWell = Wells.findOne({_id: this._id});

    var wellProperties = {
      wellName: $(e.target).find('[name=wellName]').val(),
      county: $(e.target).find('[name=county]').val(),
      state: $(e.target).find('[name=state]').val(),
      lat: $(e.target).find('[name=lat]').val(),
      long: $(e.target).find('[name=long]').val(),
      rigName: $(e.target).find('[name=rigName]').val(),
      landman: $(e.target).find('[name=landman]').val()
    }

    Wells.update(currentWellId, {$set: wellProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('wellPage', {_id: currentWellId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this well?")) {
      var currentWellId = this._id;
      Wells.remove(currentWellId);
      Router.go('wellsList');
    }
  }
});


