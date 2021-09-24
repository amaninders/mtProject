/*
//
// we use different forms and buttons to interact with the application
// this js file handles the form submissions and clicks to perform different actions
//
*/

// ================= FORMS ================= //

$("body").on('submit', event => {
  event.preventDefault();
  switch (event.target.id) {

    // proceed to map js and render the new map form
    case 'searchLocation':
      $form = $(`#${event.target.id}`);
      $form.off('submit').submit();
      break;

    // load current map after it's created
    case 'addMap':
      $form = $(`#${event.target.id}`);
      $postData = $form.serialize();
      $postData += `&zoom_level=${map.getZoom()}`;
      $.post('/api/maps', $postData, (result) => {
        $('#user__options').hide();
        $('#currentMap__container').empty();
        $('#currentMap__container').append(currentMap(result));
        // $('#currentMap').addClass('show');
        const pos = {
          lat: result.latitude,
          lng: result.longitude,
        };

        // set the marker position after the map is created
        sessionStorage.setItem('current_map', result.id);
        map.setCenter(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent('Click the map to start adding places!&nbsp;&nbsp;');

        // Configure the click listener to add places
        map.addListener("click", (mapsMouseEvent) => {
        	const lat = mapsMouseEvent.latLng.toJSON().lat;
        	const long = mapsMouseEvent.latLng.toJSON().lng;
        	const contentString = `
        		<form id="addPlace">
        			<fieldset>
          			<div class="form-group">
            			<input name="map_id" type="hidden" class="form-control" value="${result.id}">
          			</div>
                <div class="form-group">
            			<input name="user_id" type="hidden" class="form-control" value="${result.user_id}">
          			</div>
                <div class="form-group">
            			<label for="latitude">Latitude</label>
            			<input name="latitude" type="text" id="latitude" class="form-control" value="${lat}" required>
          			</div>
          			<div class="form-group">
            			<label for="longitude">Longitude</label>
            			<input name="longitude" type="text" id="longitude" class="form-control" value="${long}" required>
          			</div>
                <div class="form-group">
            			<input name="name" type="text" class="form-control" placeholder="name of the place" required>
          			</div>
          			<div class="form-group">
            			<label for="exampleFormControlSelect1">Marker Type</label>
            			<select name="type" class="form-control" id="exampleFormControlSelect1">
              			<option>Not Specified</option>
              			<option>Park</option>
              			<option>Hotel</option>
              			<option>Museum</option>
              			<option>Gallery</option>
              			<option>Shop</option>
              			<option>Other</option>
            			</select>
          			</div>
          			<div class="form-group">
            			<label for="exampleFormControlTextarea1">Notes</label>
            			<textarea name="notes" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
          			</div>
        			  <button type="submit" class="btn btn-dark">Add Place</button>
        			</fieldset>
        			</form>`;

        		// Close the current InfoWindow.
        		infoWindow.close();
        		// Create a new InfoWindow.
        		infoWindow = new google.maps.InfoWindow({
        			position: mapsMouseEvent.latLng,
        		});
        		infoWindow.setContent(
        			contentString
        		);
        		infoWindow.open(map);
        	});
      });
      $('#take__me__home').show();
      break;

    // handle the new place addition
    case 'addPlace':
      $form = $(`#${event.target.id}`);
      $placeData = $form.serialize();
      $placeData += `&zoom_level=${map.getZoom()}`;
      $.post(`/api/maps/${sessionStorage.getItem('current_map')}/markers`, $placeData, data => {
        console.log(data);
        loadPlacesList();
      });
      break;

    // handle the new place addition
    case 'updateMyMap':
      $form = $(`#${event.target.id}`);
      $mapData = $form.serialize();
      $.ajax({
        url: `/api/maps/${sessionStorage.getItem('current_map')}`,
        type: 'PUT',
        data: $mapData,
        success: function(result) {
            console.log(result);
            sendToast('Updated Successfully')
        }
      });
      break;

    default:
      break;
  }
});



// ================= PAGE READY ================= //

// do this on page ready
$(function() {
  setHeaderVisibility();
  sessionStorage.removeItem('current_map');
});
