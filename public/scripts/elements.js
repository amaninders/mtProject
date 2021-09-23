// this file only contains the HTML strings used in the index page

const loginSection = `
  <!-- login -->
  <div class="bd-highlight d-flex-column justify-content-center">
	  <span class="text-center">
	    <a class="d-flex-column justify-content-center text-center" href="/">
	      <img src="/images/cover.png" width="100%" alt="wikiMap">
	    </a>
	  </span>
  	<hr>
	  <div class="card">
	    <div class="card-body">
	      <form id="login__form">
	        <div class="form-group">
	          <label for="exampleInputEmail">Email address</label>
	          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
	        </div>
	        <div class="form-group">
	          <label for="exampleInputPassword">Password</label>
	          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
	        </div>
	        <button type="submit" class="btn btn-success btn-lg btn-block">Login</button>
	      </form>
	    </div>
	  </div>
  	<hr>
	</div>
`
const greetingSection = `
  <!-- greeting -->
  <div class="bd-highlight d-flex-column justify-content-center">
	  <span class="text-center">
	    <a class="d-flex-column justify-content-center text-center" href="/">
	      <img src="/images/cover.png" width="100%" alt="wikiMap">
	    </a>
	  </span>
  	<hr>
	  <div id="greeting__container" class="card text-center">
      <div class="card-body">
        👋 Welcome
      </div>
    </div>
  	<hr>
	</div>
`;

const crMapSection = `
  <!-- create map -->
  <div id="create" class="p-2 bd-highlight d-flex-column justify-content-center">
  <p>
    <button class="btn btn-dark btn-lg btn-block" type="button" data-toggle="collapse" data-target="#newMap" aria-expanded="false" aria-controls="collapseExample">
      create a map
    </button>
  </p>
  <div class="collapse" id="newMap">
    <div class="card card-body">
      <button class="btn btn-outline-success my-2 my-sm-2 custom-map-control-button" type="button" id="panButton">Pan to current location</button>
      <h5>OR</h5>
      <form class="form d-flex-column" id="searchLocation">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search location" aria-label="location" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
`

const exMapSection = `
  <!-- existing maps -->
  <div class="p-2 bd-highlight d-flex-column justify-content-center">
    <p>
      <button class="btn btn-dark btn-lg btn-block" type="button" data-toggle="collapse" data-target="#existingMaps" aria-expanded="false" aria-controls="collapseExample">
        Your maps
      </button>
    </p>
    <div class="collapse" id="existingMaps">
      <div class="card card-body">
        <div class="list-group">
          <div class="btn-group" role="group" aria-label="existing-maps">
            <!-- gets a list of existing maps from app.js -->
          </div>
        </div>
      </div>
    </div>
  </div>
`

const fvMapSection = `
  <!-- favorite map -->
  <div class="p-2 bd-highlight d-flex-column justify-content-center">
    <p>
      <button class="btn btn-dark btn-lg btn-block" type="button" data-toggle="collapse" data-target="#favoriteMaps" aria-expanded="false" aria-controls="collapseExample">
        favorite maps
      </button>
    </p>
    <div class="collapse" id="favoriteMaps">
      <div class="card card-body">
        <div class="list-group">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-light"><a href="#" class="list-group-item list-group-item-action">map name</a></button>
            <button type="button" class="btn btn-light"><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-light"><i class="far fa-thumbs-up"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
`

const currentMap = `
  <div class="p-2 bd-highlight d-flex-column justify-content-center">
    <p>
      <button class="btn btn-dark btn-lg btn-block" type="button" data-toggle="collapse" data-target="#currentMap" aria-expanded="false" aria-controls="collapseExample">
        Current map / Name of the Map
      </button>
    </p>
    <div class="collapse" id="currentMap">
      <div class="card card-body">
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

const footerIconsSection = `
  <!-- help icons -->
  <div class="mt-auto p-2 bd-highlight">
    <div class="btn-group d-flex justify-content-around">
      <a class="btn btn-outline-dark" href="#" role="button"><i class="fas fa-info"></i></a>
      <a class="btn btn-outline-dark" href="#" role="button"><i class="fas fa-code"></i></i></a>
      <a class="btn btn-outline-dark" href="#" role="button"><i class="fas fa-question"></i></a>
    </div>
    <div class="d-flex-column text-center">
      <br>
      <p id="companyInfo">© wikiMap inc.<br>2021</p>
    </div>
  </div>
`
