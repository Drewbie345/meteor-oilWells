Template.rigEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentRigId = this._id;
    var currentRig = Rigs.findOne({_id: this._id});

    var rigProperties = {
      rigName: $(e.target).find('[name=wellName]').val(),
      status: $(e.target).find('[name=statusOptions]').val()
    }

    Rigs.update(currentRigId, {$set: rigProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('rigPage', {_id: currentRigId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this Rig?")) {
      var currentRigId = this._id;
      Rigs.remove(currentRigId);
      Router.go('wellsList');
    }
  }
});


