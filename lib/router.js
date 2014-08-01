Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [Meteor.subscribe('notifications'), Meteor.subscribe('rigs')];

  }
});

WellsListController = RouteController.extend({
  template: 'wellsList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.wellsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('wells', this.findOptions());
  },
  wells: function() {
    return Wells.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.wells().count() === this.limit();
    var nextPath = this.route.path({wellsLimit: this.limit() + this.increment})
    return {
      wells: this.wells(),
      nextPath: hasMore ? nextPath : null
    };
  }
});

Router.map(function() {
  this.route('wellPage', {
    path: '/wells/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleWell', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Wells.findOne(this.params._id); }
  });
  
  this.route('wellEdit', {
    path: '/wells/:_id/edit',
    waitOn: function() {
      return [
        Meteor.subscribe('singleWell', this.params._id)
      ];
    },
    data: function() { return Wells.findOne(this.params._id); }
  });
  
  this.route('wellSubmit', {
    path: '/submit',
    disableProgress: true
  });

  this.route('rigSubmit', {
    path: '/rigsubmit',
    disableProgress: true
  });

  this.route('rigPage', {
    path: '/rigs/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleRig', this.params._id)
      ];
    },
    data: function() { return Rigs.findOne(this.params._id); }
  });

  this.route('rigEdit', {
    path: '/rigs/:_id/edit',
    waitOn: function() {
      return [
        Meteor.subscribe('singleRig', this.params._id)
      ];
    },
    data: function() { return Rigs.findOne(this.params._id); }
  });

  this.route('wellsList', {
    path: '/:wellsLimit?',
    controller: WellsListController
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
Router.onBeforeAction(requireLogin, {only: 'wellSubmit', 'rigSubmit');
Router.onBeforeAction(function() { clearErrors() })