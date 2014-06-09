Template.wellSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var well = {
      wellName: $(e.target).find('[name=wellName]').val(),
      county: $(e.target).find('[name=county]').val(),
      state: $(e.target).find('[name=state]').val()
    }

    Meteor.call('post', well, function(error, id) {
      if (error) {
        throwError(error.reason);
        if (error.error === 302) {
          Router.go('wellPage', {_id: error.details})
        }
      } else {
        Router.go('wellPage', {_id: id});
      }
    });
  }
});