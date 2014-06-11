var initialize = function(element, lat, long) {
  var map = L.map(element).setView([lat, long], 12);
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/drewbie0307.ifl8ja7g/{z}/{x}/{y}.png', {opacity: .5}).addTo(map);
  return map;
}

var addMarker = function(lat, long, map) {
  var myIcon = L.icon({
    iconSize: [32, 32],
    iconUrl: '../img/arrow.png'
  });
  var marker = L.marker([lat, long], {icon: myIcon}).addTo(map)
  
}

Template.map.rendered = function() {
  var wellId = Session.get('wellId');
  var well = Wells.findOne({_id: wellId});

  $(window).resize(function() {
    var h = $(window).height(), offsetTop = 90;
    $mc = $('#map-canvas');
    $mc.css('height', (h - offsetTop));
    $mc.css('width', (h - offsetTop));
  }).resize();

  var myMap = initialize('map-canvas', well.lat, well.long);
  addMarker(well.lat, well.long, myMap);
}