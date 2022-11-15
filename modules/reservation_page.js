import config from "../conf/index.js";


async function fetchReservations() {
  
  try{
    const result = await fetch(config.backendEndpoint +`/reservations/`);
    const data = await result.json();
    return data
  }catch(err){
    return null;

  }
}




function addReservationToTable(reservations) {
  
  if(reservations.length > 0){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display= "block";
  }else{
   document.getElementById("no-reservation-banner").style.display = "block";
   document.getElementById("reservation-table-parent").style.display= "none";
  }
  
 reservations.map((key, idx)=> {
  let ele = document.createElement("tr");
  ele.innerHTML = `
     <th scope="row" >${key.id}</th>
     <td>${key.name}</td>
     <td>${key.adventureName}</td>
     <td>${key.person}</td>
     <td>${new Date(key.date).toLocaleDateString("en-IN")}</td>
     <td>${key.price}</td>
     <td>${new Date(key.time).toLocaleString("en-IN", {
       year: "numeric",
       day: "numeric",
       month: "long",
       hour: "numeric",
       minute: "numeric",
       second: "numeric",
       hour12: true,
     })}</td>
     <td><div class="reservation-visit-button" id=${
       key.id
     }><a href="../detail/?adventure=${
       key.adventure
     }">Visit Adventure</a></div></td>
     
  `;

  document.getElementById("reservation-table").appendChild(ele);

});


}

export { fetchReservations, addReservationToTable };
