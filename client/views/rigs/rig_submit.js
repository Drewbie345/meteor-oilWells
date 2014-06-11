Template.rigSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var rig = {
      rigName: $(e.target).find('[name=rigName]').val()
    }

    Meteor.call('postRig', rig, function(error, id) {
      if (error) {
        throwError(error.reason);
        if (error.error === 302) {
          Router.go('rigPage', {_id: error.details})
        }
      } else {
        Router.go('rigPage', {_id: id});
      }
    });
  }
});