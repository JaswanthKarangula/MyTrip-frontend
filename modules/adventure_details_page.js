import config from "../conf/index.js";


function getAdventureIdFromURL(search) {
  const urlElem = new URLSearchParams(search);
  const adventureId = urlElem.get("adventure");
  return adventureId;
}

async function fetchAdventureDetails(adventureId) {

  try {
    const result = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await result.json();
    return data
  } catch (err) {
    return null
  }

}


function addAdventureDetailsToDOM(adventure) {

  let heading = document.getElementById("adventure-name");
  let subHeading = document.getElementById("adventure-subtitle");
  let adventureContent = document.getElementById("adventure-content");
  heading.textContent = adventure.name;
  subHeading.textContent = adventure.subtitle;
  adventureContent.textContent = adventure.content;

  // TO LOAD THE BASIC First laterc replaced by corousel

  const images = adventure.images;
  let adventurePhotoGalleryDOMElement = document.getElementById('photo-gallery');
  images.forEach(image => {
    let imgDOMElement = document.createElement('img');
    imgDOMElement.setAttribute('src', image);
    imgDOMElement.className = 'activity-card-image';
    adventurePhotoGalleryDOMElement.append(imgDOMElement);
  });
}


function addBootstrapPhotoGallery(images) {

  //     <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  //   <div class="carousel-indicators">
  //     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  //     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  //     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  //   </div>
  //   <div class="carousel-inner">
  //     <div class="carousel-item active">
  //       <img src="..." class="d-block w-100" alt="...">
  //     </div>
  //     <div class="carousel-item">
  //       <img src="..." class="d-block w-100" alt="...">
  //     </div>
  //     <div class="carousel-item">
  //       <img src="..." class="d-block w-100" alt="...">
  //     </div>
  //   </div>
  //   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  //     <span class="visually-hidden">Previous</span>
  //   </button>
  //   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
  //     <span class="visually-hidden">Next</span>
  //   </button>
  // </div>

  // let slideShow = document.getElementById("photo-gallery");
  // slideShow.innerHTML="";
  // let carouselElement = document.createElement('div');
  // carouselElement.className="carousel slide";
  // carouselElement.setAttribute("data-bs-ride","carousel");
  // const carouselElementID = "adventures-carousel";
  // carouselElement.id= carouselElementID;

  // let carouselIndicator = document.createElement('div');
  // carouselIndicator.className= "carousel-indicators";
  // let carouselInner = document.createElement('div');
  // carouselInner.className="carousel-inner";
  // let index=1;
  // images.forEach(element=>{

  //     let slideShowButton = document.createElement('button');
  //     slideShowButton.type="button";
  //     slideShowButton.setAttribute("data-bs-target",`#${carouselElementID}`);
  //     slideShowButton.setAttribute("data-bs-slide-to",index-1);
  //     slideShowButton.setAttribute("araia-lable",`Slide ${index}`)

  //     let carouselItem = document.createElement('div');
  //     carouselItem.className= "carousel-item";
  //     let imageElement = document.createElement('img');
  //     imageElement.src=element;
  //     imageElement.className = "d-block w-100";
  //     carouselItem.appendChild(imageElement);
  //     if(index==1){
  //         carouselItem.className = "carousel-item active"
  //         slideShowButton.className="active";
  //         slideShowButton.setAttribute("aria-current","true");
  //     }
  //     carouselIndicator.appendChild(slideShowButton);
  //     carouselInner.appendChild(carouselItem);
  //     index++;

  // });

  // carouselElement.appendChild(carouselIndicator);
  // carouselElement.appendChild(carouselInner);
  // carouselElement.innerHTML+=`
  // <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  //     <span class="visually-hidden">Previous</span>
  //   </button>
  //   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
  //     <span class="visually-hidden">Next</span>
  //   </button>`;
  // slideShow.appendChild(carouselElement);


  const bootstrapPhotoGalleryDOMElement = document.createElement('div');
  bootstrapPhotoGalleryDOMElement.className = 'carousel carousel-dark slide';
  bootstrapPhotoGalleryDOMElement.setAttribute('data-ride', 'carousel');
  bootstrapPhotoGalleryDOMElement.id = 'bootstrap-photo-gallery';

  const carouselIndicatorsDOMElement = document.createElement('ol');
  carouselIndicatorsDOMElement.className = 'carousel-indicators';
  let counter = 0;
  images.forEach(image => {
    const carouselIndicatorLiDOMElement = document.createElement('li');
    if (counter === 0) {
      carouselIndicatorLiDOMElement.className = 'active';
    }
    carouselIndicatorLiDOMElement.setAttribute('data-target', '#bootstrap-photo-gallery');
    carouselIndicatorLiDOMElement.setAttribute('data-slide-to', counter.toString());
    carouselIndicatorsDOMElement.append(carouselIndicatorLiDOMElement);
    counter++;
  });
  bootstrapPhotoGalleryDOMElement.append(carouselIndicatorsDOMElement);

  const carouselInnerDOMElement = document.createElement('div');
  carouselInnerDOMElement.className = 'carousel-inner';
  let isActiveAdded = false;
  images.forEach(image => {
    const carouselInnerDivDOMElement = document.createElement('div');
    if (!isActiveAdded) {
      carouselInnerDivDOMElement.className = 'carousel-item active';
      isActiveAdded = true;
    } else {
      carouselInnerDivDOMElement.className = 'carousel-item';
    }
    carouselInnerDivDOMElement.innerHTML = `
      <img class="d-block w-100 adventure-card-image" src="${image}">
    `;
    carouselInnerDOMElement.append(carouselInnerDivDOMElement);
  });
  bootstrapPhotoGalleryDOMElement.append(carouselInnerDOMElement);

  bootstrapPhotoGalleryDOMElement.innerHTML += `
    <a class="carousel-control-prev" href="#bootstrap-photo-gallery" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#bootstrap-photo-gallery" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  `;

  const adventurePhotoGalleryDOMElement = document.getElementById('photo-gallery');
  adventurePhotoGalleryDOMElement.innerHTML = '';
  adventurePhotoGalleryDOMElement.className = '';
  adventurePhotoGalleryDOMElement.append(bootstrapPhotoGalleryDOMElement);

}







function conditionalRenderingOfReservationPanel(adventure) {

  const reservationPanelSoldOutDOMElement =
    document.getElementById('reservation-panel-sold-out');
  const reservationPanelAvailableDOMElement =
    document.getElementById('reservation-panel-available');

  if (adventure.available) {
    reservationPanelSoldOutDOMElement.style.display = 'none';
    reservationPanelAvailableDOMElement.style.display = 'block';
  } else {
    reservationPanelSoldOutDOMElement.style.display = 'block';
    reservationPanelAvailableDOMElement.style.display = 'none';
  }

  const reservationPersonCostDOMElement =
    document.getElementById('reservation-person-cost');
  reservationPersonCostDOMElement.innerHTML = adventure.costPerHead;

}


function calculateReservationCostAndUpdateDOM(adventure, persons) {

  const reservationCost = persons * adventure.costPerHead;
  const reservationCostDOMElement = document.getElementById('reservation-cost');
  reservationCostDOMElement.innerHTML = reservationCost.toString();

}


function captureFormSubmit(adventure) {

  const reservationFormDOMElement = document.getElementById('myForm');
  reservationFormDOMElement.addEventListener('submit', event => {
    event.preventDefault();
    let name = reservationFormDOMElement.elements['name'].value;
    let date = reservationFormDOMElement.elements['date'].value;
    let noOfPerson = reservationFormDOMElement.elements['person'].value;
    let adventureId = adventure.id;

    const body = { name: name, date: date, person: noOfPerson, adventure: adventureId };
    saveFormDataInServer(body);
  });

}
async function saveFormDataInServer(body) {

  const postRequestResponse = await fetch(`${config.backendEndpoint}/reservations/new`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const status = postRequestResponse.status;

  if (status === 200) {
    alert('Success!');
    location.reload();
  } else {
    alert('Failed!');
  }

}


function showBannerIfAlreadyReserved(adventure) {


  const reservationBannerDOMElement = document.getElementById('reserved-banner');
  if (adventure.reserved) {
    reservationBannerDOMElement.style.display = 'block';
  } else {
    reservationBannerDOMElement.style.display = 'none';
  }

}


export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
