Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var well = Wells.findOne(commentAttributes.wellId);

    if (!user) {
      throw new Meteor.Error(401, "You need to log in to comment");
    }

    if (!commentAttributes.body) {
      throw new Meteor.Error(422, "Please write some content.");
    }

    if (!well) {
      throw new Meteor.Error(422, 'You must comment on a well.');
    }

    comment = _.extend(_.pick(commentAttributes, 'wellId', 'body'), { 
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    Wells.update(comment.wellId, {$inc: {commentsCount: 1}});

    comment._id = Comments.insert(comment);

    createCommentNotification(comment);
    
    return comment._id;
  }
});