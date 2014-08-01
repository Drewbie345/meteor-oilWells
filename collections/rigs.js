Rigs = new Meteor.Collection('rigs');

Rigs.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Rigs.deny({
  update: function(userId, rig, fieldNames) {
    return (_.without(fieldNames, 'rigName', 'status').length > 0);
  }
});

Meteor.methods({
  postRig: function(rigAttributes) {
    var user = Meteor.user(),
        rigWithSameLink = Rigs.findOne({rigName: rigAttributes.rigName});

    if (!user) {
      throw new Meteor.Error(401, "You need to login to create new rigs");
    }

    if (!rigAttributes.rigName) {
      throw new Meteor.Error(422, 'Please fill in a rig name');
    }

    if (rigAttributes.rigName && rigWithSameLink) {
      throw new Meteor.Error(302, 
        'This rig has already been created', 
        rigWithSameLink._id);
    }

    var rig = _.extend(_.pick(rigAttributes, 'rigName', 'status'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var rigId = Rigs.insert(rig);

    return rigId;
  }
});