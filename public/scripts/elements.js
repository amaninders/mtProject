const currentMap = (map) => {
  const output = `
  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">
        <button class="btn btn-dark btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#currentMap" aria-expanded="false" aria-controls="currentMap">
          Update map info
        </button>
      </h2>
    </div>
    <div id="currentMap" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        <form id="updateMyMap">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Lat & Lng</span>
              </div>
              <input type="text" class="form-control" name="latitude" placeholder="latitude" value="${map.latitude}">
              <input type="text" class="form-control" name="longitude" placeholder="longitude" value="${map.longitude}">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Name</span>
              </div>
              <input type="text" class="form-control" aria-describedby="basic-addon3" name="name" value="${map.name}">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Zoom Level</span>
              </div>
              <input type="number" min="0" max="22" class="form-control" aria-describedby="basic-addon3" name="zoom_level" value="${map.zoom_level}">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Visibility</span>
              </div>
              <select id="inputState" class="form-control" name="is_public">
                <option selected value="FALSE">Private</option>
                <option value="TRUE">Public</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Notes</span>
              </div>
              <textarea class="form-control" aria-label="With textarea" name="notes" value="${map.notes}"></textarea>
            </div>
          </div>
          <hr>
          <div class="btn-group btn-block" role="group" aria-label="Basic example">
            <button type="submit" class="btn btn-success">Save</button>
            <button type="button" class="btn btn-light" onclick="takeMeHome()">Cancel</button>
            <button type="button" class="btn btn-danger" onclick="delThisMap(${map.id},'')">Delete</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card-header">
      <h2 class="mb-0">
        <button class="btn btn-dark btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#currentMapPlaces" aria-expanded="false" aria-controls="currentMapPlaces">
          Update places
        </button>
      </h2>
    </div>
    <div id="currentMapPlaces" class="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
      <div class="list-group" id="places__container">
          <h5 class="custom--text">Click on the map to add places 👉 </h5>
          <!-- gets input from app.js -->
        </div>
      </div>
    </div>
  </div>
`
return output;
}
