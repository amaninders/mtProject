// check user login from browser storage
const userLoggedIn = () => {
  const data = sessionStorage.getItem('email');
  return data ? data : false;
}

//function to print each row for existing and favorite maps
const mapListItem = (obj, listType) => {

  const rowHTML = `
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light" id="map__name"><a href="#" class="list-group-item list-group-item-action">${obj.name}</a></button>`
      + (listType === 'existing' ? `<button type="button" class="btn btn-light"><i class="fas fa-minus-circle"></i></button>` : '') +

      `<button type="button" class="btn btn-light"><i class="far fa-edit"></i></button>
      <button type="button" class="btn btn-light"><i class="far fa-thumbs-up"></i></button>
      <input type="hidden" id="mapLong" name="mapLng" value="${obj.longitude}">
      <input type="hidden" id="mapLong" name="mapLat" value="${obj.latitude}">
    </div>`;
  return rowHTML;
}

// function to create a single HTML for all rows of existing and favorite maps
const mapList = (data, listType) => {
  let output = ''
  for (const map of data) {
    output += mapListItem(map, listType)
  }
  return output;
}

// function to load existing and favorite maps from the db
const loadMapList = (listType) => {
  let element, URL;

  listType === 'existing'
    ? (element = $('#existingMaps > div > div'),
       URL = '/api/maps' )
    : (element = $('#favoriteMaps > div > div'),
       URL = '/api/favs' );

  $.ajax(URL, { method: 'GET' })
    .then(function(data) {
      const maps = mapList(data.maps, listType);
      if (!maps) {
        console.log("no data")
        return;
      }
      element.empty(); //clear the existingmaps container
      element.append(maps); //append new maps
    });
}

// set header options visibility based on the user login
const setHeaderVisibility = () => {

  (userLoggedIn()
    ? ($('#guest__form').hide(),
       $('#user__options').show(),
       loadMapList('existing'),
       loadMapList('favorites'))
    : ($('#guest__form').show(), $('#user__options').hide()));
}

// login form listener
$('#login__form').submit(e => {
  e.preventDefault();
  $.post('/login', function(data) {
    sessionStorage.setItem('user_id', data.user_id); // set user_id in session storage
    sessionStorage.setItem('email', data.email); // set email in session storage
    setHeaderVisibility();
  })
})


// form listener

$("body").on('submit', event => {
  event.preventDefault();
  switch (event.target.id) {
    case 'searchLocation':
      $(this).off('submit').submit();
      break;
    case 'addMap':
      const $form = $(`#${event.target.id}`);
      lat = $form.find( "input[name='latitude']" ).val()
      lng = $form.find( "input[name='longitude']" ).val(),
      mapName = $form.find( "input[name='name']" ).val(),
      $.post('/api/maps', { latitude: `${lat}`, longitude: `${lng}`, name: `${mapName}` })
        .done(data => console.log(data));
      break;

    default:
      break;
  }
});

// do this on page ready

$(function() {
  setHeaderVisibility();
});




// check user login
// if logged in - GET existing maps , GET favorites
// pass server response to mapList

// #### map workflow ####
// create a map
// on submit - POST maps API
// on server response - set map ID in the browser storage, and set map location as first marker
// render map with first marker and allow user to add more markers


// #### questions ####
// should we add another menu in the sidebar for currently opened map with all the markers listed?
// this will make it easier for the user to edit markers from list or directly the map
