wikiMap
===

## Summary

This is a web app that allows users to collaboratively create and favourite maps, with each map having markers of their various icon types.

### Hosting wikiMaps

Several libraries are required to host wikiMaps on your own server. Node Package Manager is a convenient way of automatically downloading many of the dependencies listed below.

#### Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Google Maps JavaScript API
- body-parser
- chalk
- cookie-session
- dotenv
- Express.js
- method-override
- morgan
- Sass

## API Documentation

### Maps

The /api/maps/ route provides a general API for maps and can provide information for public maps.

API Path | Method | Description
--- | --- | ---
/api/maps | GET | Requires user access; provides JSON response of current user's maps
/api/maps | POST | Requires user access; creates a map for the current user
/api/maps/`map_id` | GET | Provides JSON response with information from the map `map_id`
/api/maps/`map_id` | PUT | Edits details of the map `map_id`
/api/maps/`map_id` | DELETE | Deletes the map `map_id` via flag

### Markers

The nested /api/maps/`map_id`/markers route provides an API corresponding to the markers belonging to the map with the id `map_id`.

API Path | Method | Description
--- | --- | ---
/api/maps/`map_id`/markers | GET | Provides JSON response with marker info for the map `map_id`
/api/maps/`map_id`/markers | POST | Requires user access; adds a marker to the map `map_id`
/api/maps/`map_id`/markers/`marker_id` | GET | Provides JSON response with information about the marker `marker_id`
/api/maps/`map_id`/markers/`marker_id` | PUT | Edits details of the marker `marker_id`
/api/maps/`map_id`/markers/`marker_id` | DELETE | Deletes the map `marker_id` via flag

### Favourites

The /api/favs route is an API for a specific profile's favourites and **most usage requires user access**.

API Path | Method | Description
--- | --- | ---
/api/favs | GET | Provides JSON response of current user's favourited maps
/api/favs | POST | Adds a map to the current user's favourited maps
/api/favs/`map_id`/markers | GET | Provides JSON response with marker info for the map `map_id`
/api/favs/`map_id` | DELETE | Deletes the map `map_id` from the current user's favourites

### Contributions

The /api/contributions route is an API for a specific profile's contributions to other users' maps and **usage requires user access**.

API Path | Method | Description
--- | --- | ---
/api/contributions | GET | Provides JSON response of other users' maps that the current user contributed to
