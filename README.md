Foursquare *Last Seen* Widget
===========================

Widget displaying the location of your last public Foursquare check-in, written in Javascript.

![Screenshot](http://i.imgur.com/oaVIXBU.png "Screenshot")

## Libraries Used

[Leaflet.js](http://leafletjs.com/) - Mapping      
[Leaflet Bouncing Markers](https://github.com/maximeh/leaflet.bouncemarker) - Marker bounce functionality        
[Leaflet Awesome Markers](https://github.com/lvoogdt/Leaflet.awesome-markers) - Marker customization functionality                
[Zepto.js](http://zeptojs.com/) - Ajax requests        
[Moment.js](http://momentjs.com/) - Time comparisons      

The functionality written for the widget and all libraries needed have been compressed into one javascript file - [`production/src/foursquare-last-seen.min.js`](https://github.com/charlierevett/foursquare-last-seen-widget/blob/master/production/src/foursquare-last-seen.min.js)

## Usage

``` html
<!DOCTYPE html>
<html>
<head>
    <title>Widget Example</title>

    <link rel="stylesheet" href="production/css/foursquare-last-seen.min.css" />

    <style type="text/css">
        #map {
            height: 300px;
            width: 200px;
        }
    </style>
</head>
<body>
    <div id="map"></div>

    <script src="production/src/foursquare-last-seen.min.js"></script>
    <script type="text/javascript">
        last_seen.id = 'map';
        last_seen.token = '<your_oauth_token>';
        last_seen.render();
    </script>
</body>
</html>
```

#### Parameters

##### `id` (required)

ID for the div where the map will be rendered.

##### `token` (required)

Your Foursquare oAuth API token (see below).

##### `zoom` (optional)

Default level of zoom for the map (higher the more zoomed in).

##### `tile` (optional)

If you want to use a different tile layer with leaflet.

##### `bounce` (optional)

If you want the marker to bounce in when it is placed (true/false).

##### `marker_color` (optional)

Set the color of the marker from: 'red', 'darkred', 'orange', 'green', 'darkgreen', 'blue', 'purple', 'darkpuple', 'cadetblue'. If left blank a color will be chosen at random each time the map is rendered.

##### `marker_icon` (optional)

Set the icon of marker from any available from the [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/) (without the `fa-` prefix) icon set. If left blank it will try to match the Foursquare venue with the appropriate icon.

## Foursquare oAuth API Token

Annoyingly you have to authenticate to get the public check-ins of a Foursquare user. An oAuth token never expires however is a slight pain to get in the first place.             
Head to this [Foursquare Tutorial](https://developer.foursquare.com/overview/auth) - create a dummy application and set the callback url as `http://localhost/`.             
Annoying but it isn't hard.

## Extending this Widget

More than happy for anyone to extend this widget, all the files are located in the `development` directory.
