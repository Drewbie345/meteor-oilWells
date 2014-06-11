Template.rigs.helpers({
  rigs: function() {
    return Rigs.find();
  }
});

Template.rigs.rendered = function() {
  var currentWellId = Session.get('wellId');
  var currentWell = Wells.findOne({_id: currentWellId});
  console.log(currentWell._id);
  var rig = currentWell.rigName;
  console.log(rig);
  $('#' + rig).prop('selected', true);
}