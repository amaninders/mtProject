const createElement = (obj) => {
  const mapRow = `
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-light"><a href="#" class="list-group-item list-group-item-action">${obj.name}</a></button>
    <button type="button" class="btn btn-light"><i class="fas fa-minus-circle"></i></button>
    <button type="button" class="btn btn-light"><i class="far fa-edit"></i></button>
    <button type="button" class="btn btn-light"><i class="far fa-thumbs-up"></i></button>
    <input type="hidden" id="mapLong" name="mapLng" value="${obj.longitude}">
    <input type="hidden" id="mapLong" name="mapLat" value="${obj.latitude}">
  </div>`;
}

const mapList = (existingmaps) => {
  let mapList = ''
  for (const map of existingmaps) {
    mapList += createElement(map)
  }
  return mapList;
}


//load maps from db
const loadMaps = () => {
  $existingMaps = $('#existingMaps > div[aria-label="existing-maps"]');
  $.ajax('/maps', { method: 'GET' })
    .then(function(maps) {
      $existingMaps.empty(); //clear the existing maps
      $existingMaps.append(mapList(maps)); //append new maps
    });
};


$(function() {

  // check user login

  // if logged in - GET existing maps , GET favorites

  // pass server response to mapList

});

// #### map workflow ####
// create a map
// on submit - POST maps API
// on server response - set map ID in the browser storage, and set map location as first marker
// render map with first marker and allow user to add more markers


// #### questions ####
// should we add another menu in the sidebar for currently opened map with all the markers listed?
// this will make it easier for the user to edit markers from list or directly the map

