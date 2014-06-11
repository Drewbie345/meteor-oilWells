Wells = new Meteor.Collection('wells');

Wells.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Wells.deny({
  update: function(userId, well, fieldNames) {
    return (_.without(fieldNames, 'wellName', 'county', 'state', 'lat', 'long', 'rigName', 'rigId', 'landman').length > 0);
  }
});

Meteor.methods({
  post: function(wellAttributes) {
    var user = Meteor.user(),
        wellWithSameLink = Wells.findOne({wellName: wellAttributes.wellName});

    if (!user) {
      throw new Meteor.Error(401, "You need to login to create new wells");
    }

    if (!wellAttributes.wellName) {
      throw new Meteor.Error(422, 'Please fill in a well name');
    }

    if (wellAttributes.wellName && wellWithSameLink) {
      throw new Meteor.Error(302, 
        'This well has already been created', 
        wellWithSameLink._id);
    }

    var well = _.extend(_.pick(wellAttributes, 'wellName', 'county', 'state', 'lat', 'long', 'rigName', 'landman'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0
    });

    var wellId = Wells.insert(well);

    return wellId;
  }
});