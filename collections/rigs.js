Rigs = new Meteor.Collection('rigs');

Meteor.methods({
  postRig: function(rigAttributes) {
    var user = Meteor.user(),
        rigWithSameLink = Rigs.findOne({rigName: rigAttributes.rigName});

    if (!user) {
      throw new Meteor.Error(401, "You need to login to create new wells");
    }

    if (!rigAttributes.rigName) {
      throw new Meteor.Error(422, 'Please fill in a well name');
    }

    if (rigAttributes.rigName && rigWithSameLink) {
      throw new Meteor.Error(302, 
        'This well has already been created', 
        rigWithSameLink._id);
    }

    var rig = _.extend(_.pick(rigAttributes, 'rigName'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
    });

    var rigId = Rigs.insert(rig);

    return rigId;
  }
});