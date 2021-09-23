const currentMap = (map) => {
  const output = `
  <div class="card">
  <div class="card-header" id="headingThree">
    <h2 class="mb-0">
      <button class="btn btn-dark btn-lg btn-block collapsed" type="button" data-toggle="collapse" data-target="#currentMap" aria-expanded="false" aria-controls="currentMap">
        current map
      </button>
    </h2>
  </div>
  <div id="currentMap" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
    <div class="card-body">
      <form>
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
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Notes</span>
            </div>
            <textarea class="form-control" aria-label="With textarea" name="notes" value="${map.notes}"></textarea>
          </div>
        </div>
        <hr>
        <div class="btn-group btn-block" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success">Save</button>
          <button type="button" class="btn btn-light">Cancel</button>
          <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </form>
      <!-- places for the current map -->
      <hr>
      <hr>
      <h4 class="text-center custom--text">Places on this map</h4>
      <div class="list-group">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-light"><a href="#" class="list-group-item list-group-item-action">marker name</a></button>
          <button type="button" class="btn btn-light"><i class="far fa-edit"></i></button>
          <button type="button" class="btn btn-light"><i class="far fa-thumbs-up"></i></button>
        </div>
      </div>
    </div>
  </div>
  </div>
`
return output;
}
