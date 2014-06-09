Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createCommentNotification = function(comment) {
  var well = Wells.findOne(comment.wellId);
  if (comment.userId !== well.userId) {
    Notifications.insert({
      userId: well.userId,
      wellId: well._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};