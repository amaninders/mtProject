const openCurrentMap = (map) => {
	const { latitude, longitude, zoom_level} = map
	//google maps handler
	function initMap() {
		const myLatlng = { lat: latitude, lng: longitude };
		const map = new google.maps.Map(document.getElementById("map"), {
			zoom: zoom_level,
			center: myLatlng,
		});

		// Create the initial InfoWindow.
		let infoWindow = new google.maps.InfoWindow({
			content: "Click the map to add a marker!&nbsp;&nbsp;",
			position: myLatlng,
		});

		infoWindow.open(map);
		// Configure the click listener.
		map.addListener("click", (mapsMouseEvent) => {
			const lat = mapsMouseEvent.latLng.toJSON().lat;
			const long = mapsMouseEvent.latLng.toJSON().lng;
			const contentString = `
			<form>
				<fieldset>
					<div class="form-group">
						<label for="latitude">Latitude</label>
						<input type="text" id="latitude" class="form-control" placeholder="${lat}" disabled>
					</div>
					<div class="form-group">
						<label for="longitude">Longitude</label>
						<input type="text" id="longitude" class="form-control" placeholder="${long}" disabled>
					</div>
					<div class="form-group">
						<label for="exampleFormControlSelect1">Marker Type</label>
						<select class="form-control" id="exampleFormControlSelect1">
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
						<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
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
	}
}

