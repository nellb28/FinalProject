// const formEl = document.getElementById("best-bikes-form");
// const yearEl = document.getElementById("year");
// const monthEl = document.getElementById("month");
// const dateEl = document.getElementById("date");

// formEl.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const year = yearEl.value;
//   const month = monthEl.value;
//   const date = dateEl.value;

//   url = buildURL(year, month, date);
//   getbikeData(url);
// });
const results = getbikeData();

async function getbikeData() {
  url = "http://api.citybik.es/v2/networks";
  const response = await fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (responseJson) {
      console.log(responseJson);
      generateBikeTable(responseJson);
    })
    .catch(() => {
      console.log("nothing from fetch");
      //console.log(responseJson);
      // generateTableHeader();
    });
}

function buildURL(year, month, date) {
  let DATE = year + "-" + month + "-" + date;

  if (!year || !month || !date) {
    DATE = "current";
  }
  // create api-key.js file with const API_KEY="your_api_key" in this same directory to use
  const BASE_URL = `https://api.nytimes.com/svc/bikes/v3/lists/`;
  const ENDPONT = `${DATE}/hardcover-fiction.json`;
  const URL = `${BASE_URL}${ENDPONT}?api-key=${API_KEY}`;
  console.log(URL);
  return URL;
}

// //TODO add logic to provide a message when fetch returns a non 200 response
// function getbikeData(url) {
//   fetch(url)
//     .then(function (data) {
//       return data.json();
//     })
//     .then(function (responseJson) {
//       console.log(responseJson);

//       //      generatebikeTable(responseJson);
//     })
//     .catch(() => {
//       //      generateTableHeader();
//     });
// }

function generateTableHeader() {
  const bikeContainer = document.getElementById("bikes-container");

  if (document.getElementById("bike-table")) {
    bikeContainer.removeChild(document.getElementById("bike-table"));
  }
  const bikeTable = document.createElement("table");
  bikeTable.setAttribute("id", "bike-table");
  bikeContainer.appendChild(bikeTable);
  const bikeRow = document.createElement("tr");
  bikeTable.appendChild(bikeRow);
  const bikeHeader1 = document.createElement("th");
  bikeTable.appendChild(bikeHeader1);
  bikeHeader1.innerHTML = " Company";
  const bikeHeader2 = document.createElement("th");
  bikeTable.appendChild(bikeHeader2);
  bikeHeader2.innerHTML = " Country";
  const bikeHeader3 = document.createElement("th");
  bikeTable.appendChild(bikeHeader3);
  bikeHeader3.innerHTML = " City";

  return bikeTable;
}
function generateBikeTable(responseJson) {
  const bikeTable = generateTableHeader();
  const base = 310;
  for (let index = base; index < base + 20; index++) {
    const bikeRow = document.createElement("tr");
    bikeTable.appendChild(bikeRow);
    const bikeTD1 = document.createElement("td");
    bikeRow.appendChild(bikeTD1);
    const bikeTD2 = document.createElement("td");
    bikeRow.appendChild(bikeTD2);
    const bikeTD3 = document.createElement("td");
    bikeRow.appendChild(bikeTD3);

    let company = responseJson.networks[index].company;
    let city = responseJson.networks[index].location.city;
    let country = responseJson.networks[index].location.country;

    // console.log(responseJson);
    // console.log(company);
    // console.log(city);
    // console.log(country);

    //TODO fix spacing with padding

    bikeTD1.innerHTML = " " + company;
    bikeTD2.innerHTML = " " + country;
    bikeTD3.innerHTML = " " + city;
  }
}
