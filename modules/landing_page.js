import config from "../conf/index.js";


async function init() {
    let cities = await fetchCities();
    cities.forEach((key) => {
        addCityToDOM(key.id, key.city, key.description, key.image);
    });
}
async function fetchCities() {
   try{

    //    const response = await fetch(config.backendEndpoint+"/cities");
    //    const cities = await response.json();
    //    return cities;

    return await (await fetch(config.backendEndpoint+"/cities")).json();
   }
   catch{
       return null;
   }
}


function addCityToDOM(id, city, description, image) {
    

}

export { init, fetchCities, addCityToDOM };
