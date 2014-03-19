// Class definition
var last_seen = {
  // id for map div (required)
  id: null,
  // Foursquare API token (required)
  token: null,
  // Zoom level for map, default: 9
  zoom: 10,
  // Leaflet map object
  map: null,
  // Leaflet tile layer url, defaults to standard
  tile: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  // Does the marker bounce when placed? default to true
  bounce: true,
  // Marker color, default is random
  marker_color: '',
  // Marker Font-Awesome Icon
  marker_icon: null,

  // render map
  render: function() {
    if (last_seen.id == null) {
      throw new Error('You have not set the id of the map div.');
    }

    lastCheckIn(this.token, function(name, ago, coords, link, location_icon) {
      // Init Leaflet map object
      last_seen.map = L.map(last_seen.id).setView(coords, last_seen.zoom);

      // Add tile layer
      L.tileLayer(last_seen.tile).addTo(last_seen.map);

      // Compute custom marker icon & color
      var icon = computeMarkerIcon(last_seen.marker_icon, location_icon),
          color = computeMarkerColor(last_seen.marker_color),
          // Create custom marker
          marker = L.AwesomeMarkers.icon({
            prefix: 'fa',
            icon: icon,
            markerColor: color
          });

      // Add last location marker
      L.marker(coords, {icon: marker}, {
        bounceOnAdd: last_seen.bounce
      }).addTo(last_seen.map).bindPopup('<a href="' + link + '" target="_blank">' + name + '</a><br>' + ago);
    });
  }
};

// Grabs the last check in from Foursquare and returns params to callback function
var lastCheckIn = function(token, callback) {
  if (token == null) {
    throw new Error('You have not set the Foursquare oAuth Token.');
  }

  var url = 'https://api.foursquare.com/v2/users/self/checkins';
  $.ajax({
    type: 'GET',
    url: url,
    data: {
      limit: '1',
      oauth_token: token,
      v: '20140319'
    },
    dataType: 'json',
    success: function(data) {
      var item = data.response.checkins.items[0],
          name = item.venue.name,
          ago = moment.unix(parseInt(item.createdAt)).fromNow(),
          coords = [item.venue.location.lat, item.venue.location.lng],
          link = 'https://foursquare.com/v/' + item.venue.id,
          location_icon = item.venue.categories[0].shortName.toLowerCase();

      callback(name, ago, coords, link, location_icon);
    },
    error: function(){
      throw new Error('Error retrieving checkins from Foursquare API.');
    }
  })
};

// Computes the icon for the marker
var computeMarkerIcon = function(string, location_icon) {
  if (string != null) {
    return string;
  } else {
    return lookupIcon(location_icon)
  }
};

// Computes the color for the marker, if nothing is set then it randomizes it
var computeMarkerColor = function(string) {
  var colors = ['red', 'darkred', 'orange', 'green', 'darkgreen', 'blue', 'purple', 'darkpuple', 'cadetblue'];
  if (colors.indexOf(string) != -1) {
    return string;
  } else {
    return colors[Math.floor(Math.random() * colors.length)];
  }
};

// If no marker icon was set then it tries to match the foursquare venue type to the best icon
var lookupIcon = function(string) {
  // TODO: Add more icons to this object
  var lookup = {
    'pub': 'beer',
    'plaza': 'leaf',
    'coffee shop': 'coffee',
    'fast food': 'cutlery',
    'grocery store': 'shopping-cart'
  }

  if (string in lookup) {
    return lookup[string];
  } else {
    return 'circle';
  }
};