if (Wells.find().count() === 0) {
  var now = new Date().getTime();

  var drewId = Meteor.users.insert({
    username: 'drew',
    profile: { name: 'Drew Robinson' }
  });
  var drew = Meteor.users.findOne(drewId);

  var phillipId = Meteor.users.insert({
    username: 'phillip',
    profile: { name: 'Phillip Robinson' }
  });
  var phillip = Meteor.users.findOne(phillipId);

  var sampleWellId = Wells.insert({
    wellName: 'Sample Well With Comments',
    author: drew.profile.name,
    userId: drew._id,
    county: 'Travis',
    state: 'Texas',
    lat: 30.28565,
    long: -97.73921,
    rigName: 'Rigger1',
    landman: 'drew',
    submitted: now - 7 * 3600 * 1000,
    commentsCount: 2
  });

  Comments.insert({
    wellId: sampleWellId,
    userId: phillip._id,
    author: phillip.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'This is a sample comment'
  });

  Comments.insert({
    wellId: sampleWellId,
    userId: drew._id,
    author: drew.profile.name,
    submitted: now - 3 * 3600 * 1000,
    body: 'This is another sample comment'
  });

  for (var i = 1; i < 6; i++) {
    Wells.insert({
      wellName: 'Oil Well #' + i,
      author: drew.profile.name,
      userId: drew._id,
      county: 'Dallas',
      state: 'Texas',
      lat: 30.29128,
      long: -97.73858,
      rigName: 'Rigger1',
      landman: 'drew',
      submitted: now - i * 3600 * 1000 + 1, 
      commentsCount: 0
    });
  }

  for (var i = 6; i < 11; i++) {
    Wells.insert({
      wellName: 'My Oil Well #' + i,
      author: phillip.profile.name,
      userId: phillip._id,
      county: 'Tulsa',
      state: 'Oklahoma',
      lat: 35.363556,
      long: 138.730438,
      rigName: 'Rigger2',
      landman: 'phillip',
      submitted: now - i * 3600 * 1000 + 1,
      commentsCount: 0
    });
  }
}