import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
    const params = new URLSearchParams(search);
    return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {

    try{
        let response = await fetch(config.backendEndpoint+`/adventures?city=${city}`);
        let adventuresJson = await response.json();
        return adventuresJson;
    }
    catch(err) {
        return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {

  console.log(adventures);

    let data = document.getElementById('data');
    adventures.forEach(element => {
        data.appendChild(getAdventureCard(element));
    });
    // for(let loc in adventures){

    // }
}

function getAdventureCard(adventureCard){

    let adventureTile = document.createElement('div');
    adventureTile.className = "col-6 col-sm-6 col-lg-3 mb-3 position-relative";


    let adventureBlock = document.createElement('div');
    adventureBlock.className = "adventure-card";

    let linkElement = document.createElement('a');
    linkElement.href = `resort/?adventure=${adventureCard.id}`;

    let adventureImage = document.createElement('img');
    adventureImage.src = adventureCard.image;
    adventureImage.alt = adventureCard.name;
    adventureImage.className = "adventure-card-image";


    let adventureInfoElement = document.createElement('div');
    adventureInfoElement.className = "d-flex justify-content-between  w-100 px-1";
    
    let adventureHeading = document.createElement('h5');
   // adventureHeading.className = "card-title";
    adventureHeading.textContent = adventureCard.name;
    let costPerHead = document.createElement('p');
   // costPerHead.className = "card-text";
    costPerHead.textContent = `₹${adventureCard.costPerHead}`;
    let durationHeading = document.createElement('h5');
    durationHeading.textContent= "Duration";
    let adventureDuration = document.createElement('p');
    adventureDuration.textContent = `${adventureCard.duration} Hour`;
    
    

    adventureInfoElement.appendChild(adventureHeading);
    adventureInfoElement.appendChild(costPerHead);

    let adventureDurationElement = document.createElement('div');
    adventureDurationElement.className="d-flex justify-content-between text-center w-100 px-1";

    adventureDurationElement.appendChild(durationHeading);
    adventureDurationElement.appendChild(adventureDuration);

    let adventureCategory = document.createElement('div');
    adventureCategory.className= "category-banner";
    adventureCategory.textContent= adventureCard.category;

    adventureBlock.appendChild(adventureCategory);
    adventureBlock.appendChild(adventureImage);
    adventureBlock.appendChild(adventureInfoElement);
    adventureBlock.appendChild(adventureDurationElement);

    linkElement.appendChild(adventureBlock);
    adventureTile.appendChild(linkElement);

    return adventureTile;


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let filteredList = [];
  list.forEach(element => {
    let duration = parseInt(element.duration)
    if(duration>=low && duration<=high )filteredList.push(element);
  });
  return filteredList;
}




//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  let filteredList = [];
  list.forEach(element =>{
    if(categoryList.includes(element.category)){
      filteredList.push(element)
    }
  });
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

function filterFunction(list, filters) {
  let durationFilters = filters['duration'];
  let categoryFilters = filters['category'];

  let filteredList =[];

  if(durationFilters != "" && categoryFilters.length >0 ){

    let tempFilteredList = filterByCategory(list,categoryFilters);
    let low = parseInt(durationFilters.split("-")[0]);
    let high = parseInt(durationFilters.split("-")[1]);
    filteredList = filterByDuration(tempFilteredList,low,high);
    return filteredList;

  }
  else if ( durationFilters !=""){

    let low = parseInt(durationFilters.split("-")[0]);
    let high = parseInt(durationFilters.split("-")[1]);
    filteredList = filterByDuration(list,low,high);
    return filteredList;

  }
  else if(categoryFilters.length>0){
    return filterByCategory(list,categoryFilters);
  }
  else{
  return list;
  }

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  let filter = JSON.stringify(filters);
  localStorage.setItem("filters",filter)
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  let filters = JSON.parse(localStorage.getItem("filters"));
   return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {

  const categoryListDOMElement = document.getElementById("category-list");
  const categoryList = filters.category;
  categoryList.forEach(category => {
    const categoryDOMElement = document.createElement("div");
    categoryDOMElement.className = "mx-2 px-2 border border-warning";
    categoryDOMElement.style.borderRadius = "20px";
    categoryDOMElement.innerHTML = `
      ${category}
    `;
    categoryListDOMElement.append(categoryDOMElement);
  });
  
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
