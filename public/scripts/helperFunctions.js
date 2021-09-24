// ================= LOGIN ======================

// check user login from browser storage
const userLoggedIn = () => {
  const data = sessionStorage.getItem('email');
  return data ? data : false;
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


// ================= PLACES ======================


// function to print a single place item
const placeListItem = (obj) => {

  const output = `
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-light map--name list-group-item list-group-item-action">${obj.name}</button>
      <div class="btn-group" role="group">
      <!-- <button type="button" class="btn btn-light" onclick="editPlace(${obj.id})"><i class="fas fa-wrench"></i></button> -->
        <button type="button" class="btn btn-light" onclick="delPlace(${obj.id})"><i class="fas fa-minus-circle"></i></button>
      </div>
    </div>`;

  return output
};

// function to generate a list of places
const placeList = (data) => {
  let output = '';
  for (const item of data) {
    output += placeListItem(item);
  }
  return output;
}


// function to load places from the db
const loadPlacesList = () => {
  const element = $('#places__container');
  const URL = `/api/maps/${sessionStorage.getItem('current_map')}/markers`;
  $.get( URL ).then( data => {
    element.empty();
    element.append(placeList(data.markers));
  });
}

// ================= MAPS ======================

//function to print a single row for given map list
const mapListItem = (obj, listType) => {

  const rowHTML = `
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-light map--name list-group-item list-group-item-action" onclick="openThisMap(${obj.id},${obj.latitude},${obj.longitude})">${obj.name}</button>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-light" onclick="openThisMap(${obj.id},${obj.latitude},${obj.longitude})"><i class="fas fa-wrench"></i></button>`
        +
        (listType === 'existing' ? `<button type="button" class="btn btn-light" onclick="favThisMap(${obj.id})"><i class="fas fa-heart"></i></button>` : '')
        +
        `<button type="button" class="btn btn-light" onclick="delThisMap(${obj.id},'1')"><i class="fas fa-minus-circle"></i></button>
      </div>
    </div>`;

  return rowHTML;
}

// function to generate a list of maps
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


// ================= HANDLE MAP BUTTONS ======================


const openThisMap = (id, latitude, longitude) => {
  $.ajax({
    url: `/api/maps/${id}/markers`,
    type: 'GET',
    success: function(result) {

      map.setCenter({lat: latitude, lng: longitude});

      let markers = [];

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        setMapOnAll(null);
        markers = [];
      };

      deleteMarkers();

      for (let i = 0; i < result.markers.length; i++) {
        const latLng = new google.maps.LatLng(result.markers[i].latitude, result.markers[i].longitude);

        const contentString = `
            <div class="card" style="width: 18rem;">
              <img src="${result.markers[i].image}" class="card-img-top" alt="image">
              <div class="card-body">
                <h5 class="card-title">${result.markers[i].name}</h5>
                <p class="card-text">${result.markers[i].notes}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
        `

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        })


        const marker = new google.maps.Marker({
          position: latLng,
          map: map,

        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });

      }
    }
  });
}

const favThisMap = (id) => {
  $.ajax({
    url: `/api/favs`,
    type: 'POST',
    data: {map_id : id},
    success: function(result) {
      loadMapList('existing');
      loadMapList('favorites');
    }
  });
}

const delThisMap = (id, action) => {
  $.ajax({
    url: `/api/maps/${id}`,
    type: 'DELETE',
    success: function(result) {
      if (action) {
        loadMapList('existing');
        loadMapList('favorites');
        console.log(result);
        sendToast('Map Deleted Successfully')
        return;
      }
      location.reload();
      sendToast('Map Deleted Successfully')
    }
  });
}



// ================= HANDLE PLACE BUTTONS ======================


// const openThisMap = (id) => {
//   alert('ok')
//  }

//  const favThisMap = (id) => {
//    $.ajax({
//      url: `/api/favs`,
//      type: 'POST',
//      data: {map_id : id},
//      success: function(result) {
//        //update fav map lists
//        console.log(result);
//      }
//    });
//  }

//  const delThisMap = (id) => {
//    $.ajax({
//      url: `/api/maps/${id}`,
//      type: 'DELETE',
//      success: function(result) {
//          // reload my map list
//          console.log(result);
//      }
//    });
//  }


// ================= HANDLE OTHER BUTTONS ======================

const resetMapSession = () => {
  location.reload();
}


// ================= HANDLE TOASTS ======================

const sendToast = (message) => {

  // create toast message
  const html = `
  <div id="myToastNotification" aria-live="polite" aria-atomic="true" style="position: absolute; min-height: 200px; top: $50px; left: $50px;">
    <div class="toast"">
      <div class="toast-header">
        <strong class="mr-auto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Message&nbsp;From&nbsp;WikiMap&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
      </div>
      <div class="toast-body text-center">
        ${message}
      </div>
    </div>
  </div>
  `
  // append message to body
  $(`#${branding__container}`).append(html);

  // fire toast event
  $('.toast').toast({delay: 3000}); $('.toast').toast('show');

  // bind event to destroy the toast after it's shown
  $('.toast').on('hidden.bs.toast', function () {
    $('#myToastNotification').remove();
  })
}


