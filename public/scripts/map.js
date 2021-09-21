// function to create the mapForm with long lat information
const mapForm = (obj) => {

  // we use the following string literal to render the HTML form within the map info window
	const createMapForm = `
		<form id="addMap">
		 	<fieldset>
			  <div class="form-group">
			     <label for="latitude">Latitude</label>
			     <input type="text" id="latitude" class="form-control" placeholder="${obj.lat}" disabled>
			  </div>
			  <div class="form-group">
			     <label for="longitude">Longitude</label>
			     <input type="text" id="longitude" class="form-control" placeholder="${obj.lng}" disabled>
			  </div>
        <div class="form-group">
          <label for="mapName">Name</label>
          <input type="text" class="form-control" id="mapName">
        </div>
		  	<button type="submit" class="btn btn-primary">Submit</button>
			</fieldset>
		</form>`;

	return createMapForm;
}

// initialize map variables
let map, service, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.114075, lng: 55.158329 }, //default location palm jumeirah
    zoom: 14,
  });

  infoWindow = new google.maps.InfoWindow();

  $('button.custom-map-control-button').on('click', () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent(mapForm(pos));
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  $('#searchLocation').submit(function(e) {
    e.preventDefault();
    const location = $('input[placeholder="Search location"]').val()
    if (location) {
      const request = {
        query: `${location}`,
        fields: ["name", "geometry"],
      };

      service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const searchResult = results[0].geometry.location;
          const pos = searchResult.toJSON();
          map.setCenter(searchResult);
          infoWindow.setContent(mapForm(pos));
          infoWindow.setPosition(pos);
          infoWindow.open(map);
          map.setCenter(pos);
        }
      });
    } else {
      alert("please enter a valid location"); //replace with a proper error if there's time
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? alert("Error: The Geolocation service failed.")
      : alert("Error: Your browser doesn't support geolocation.")
  );
  infoWindow.open(map);
}
