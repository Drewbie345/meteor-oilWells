var initialize = function(element, lat, long) {
  var map = L.map(element).setView([lat, long], 12);
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/drewbie0307.ifl8ja7g/{z}/{x}/{y}.png', {opacity: .5}).addTo(map);
}

var addMarker = function(lat, long, map) {
  var marker = L.marker([lat, long]).addTo(map)
}

Template.map.rendered = function() {
  var wellId = Session.get('wellId');
  var well = Wells.findOne({_id: wellId});

  $(window).resize(function() {
    var h = $(window).height(), offsetTop = 90;
    $mc = $('#map-canvas');
    $mc.css('height', (h - offsetTop));
  }).resize();

  initialize('map-canvas', well.lat, well.long);
}