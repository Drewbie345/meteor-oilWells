if (Wells.find().count() === 0) {
  var now = new Date().getTime();

  var drewId = Meteor.users.insert({
    profile: { name: 'Drew Robinson' }
  });
  var drew = Meteor.users.findOne(drewId);

  var phillipId = Meteor.users.insert({
    profile: { name: 'Phillip Robinson' }
  });
  var phillip = Meteor.users.findOne(phillipId);

  for (var i = 1; i < 6; i++) {
    Wells.insert({
      wellName: 'Oil Well #' + i,
      author: drew.profile.name,
      userId: drew._id,
      county: 'Dallas',
      state: 'Texas',
      submitted: now - i * 3600 * 1000 + 1
    });
  }

  for (var i = 6; i < 11; i++) {
    Wells.insert({
      wellName: 'My Oil Well #' + i,
      author: phillip.profile.name,
      userId: phillip._id,
      county: 'Tulsa',
      state: 'Oklahoma',
      submitted: now - i * 3600 * 1000 + 1
    });
  }
}