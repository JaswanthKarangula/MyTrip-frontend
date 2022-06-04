import config from "../conf/index.js";


async function init() {
    let cities = await fetchCities();
    cities.forEach((key) => {
        addCityToDOM(key.id, key.city, key.description, key.image);
    });
}
async function fetchCities() {
   try{

       const response = await fetch(config.backendEndpoint+"/cities");
       const cities = await response.json();
       return cities;

    // const cities_ = (await (await fetch(config.backendEndpoint+"/cities")).json()).cities;
    // console.log(cities_);
    // return cities_;
   }
   catch{
       return null;
   }
}


function addCityToDOM(id, city, description, image) {
    let dataDiv = document.createElement('div');
    dataDiv.className = "col-12 col-sm-6 col-lg-3 mb-4";


    let tileDiv = document.createElement('div');
    tileDiv.className = "tile";

    let imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.alt = city;

    let imageText = document.createElement('div');
    imageText.className = "tile-text text-center";

    let imageHeading = document.createElement('h5');
    imageHeading.textContent = city;

    let imageDescription = document.createElement('p');
    imageDescription.textContent = description;

    imageText.appendChild(imageHeading);
    imageText.appendChild(imageDescription);

    tileDiv.appendChild(imageElement);
    tileDiv.appendChild(imageText);





    let link = document.createElement('a');
    link.href = `pages/adventures/?city=${id}&id=${id}`;

    link.appendChild(tileDiv);
    dataDiv.appendChild(link);


    let grid = document.getElementById("data");
    grid.appendChild(dataDiv);





}

export { init, fetchCities, addCityToDOM };
