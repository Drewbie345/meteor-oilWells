Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('wells'); }
});

Router.map(function() {
  this.route('wellsList', {path: '/'});
  
  this.route('wellPage', {
    path: '/wells/:_id',
    data: function() { return Wells.findOne(this.params._id); }
  });
  
  this.route('wellEdit', {
    path: '/wells/:_id/edit',
    data: function() { return Wells.findOne(this.params._id); }
  });
  
  this.route('wellSubmit', {
    path: '/submit'
  });
});

var requireLogin = function(pause) {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() { clearErrors() })