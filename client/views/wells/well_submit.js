Template.wellSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var well = {
      wellName: $(e.target).find('[name=wellName]').val(),
      county: $(e.target).find('[name=county]').val(),
      state: $(e.target).find('[name=state]').val(),
      lat: $(e.target).find('[name=lat]').val(),
      long: $(e.target).find('[name=long]').val(),
      rigName: $(e.target).find('[name=rigName]').val(),
      landman: $(e.target).find('[name=landman]').val()
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