// Check if map is public in app.js, send alert on false
const checkMapPublic = obj => {
  $.get(`/api/maps/${obj.id}`, data => {
    return JSON.parse(data).is_public;
  })
}

// If map is public, have app.js run helper below
const sendShortURL = obj => {
  $.post(`/m/${obj.id}`, result => {
    // If error, return notification

    // Otherwise, use jQuery to make popup

  });
}
