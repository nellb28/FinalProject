let currentNetwork;
const BIKE_BASE_URI = "http://api.citybik.es";
const listItem = document.getElementById("country-select");

const temp = findLocalItems("RU.Moscow.velobike-moscow");
console.log(temp);

//TODO - break this up into smaller files and import
//*************************Supporting classes************************ */
class Location {
  constructor(city, country, latitude, longitude) {
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
class Network {
  constructor(company, href, id, Location, name) {
    this.id = id;
    this.company = company;
    this.href = href;
    this.name = name;
    this.location = Location;
  }
}

// "network": {
//   ***DIFFERENT"company": [
//       "ЗАО «СитиБайк»"
//   ],
//   "href": "/v2/networks/velobike-moscow",
//   "id": "velobike-moscow",
//   "location": {
//       "city": "Moscow",
//       "country": "RU",
//       "latitude": 55.75,
//       "longitude": 37.616667
//   },
//   "name": "Velobike",
//   ******DIFFERENT"stations": [
//       {
//           "empty_slots": 12,
//           "extra": {
//               "address": "ст. м. Кропоткинская (выход к Гоголевскому бульвару)",
//               "ebikes": 0,
//               "electric_free": 0,
//               "electric_slots": 0,
//               "normal_bikes": 0,
//               "normal_free": 12,
//               "normal_slots": 12,
//               "slots": 12,
//               "uid": "0001"
//           },
class NetworkDetail {
  constructor() {}
}

//************************* main ************************ */
//setup Initial Data
initialDataLoad();

//*************************Supporting functions************************ */
function generateDateTimeStamp() {
  // Creation of the timestamp
  const timestamp = Date.now();

  // Convert timestamp to human readable date and time
  return new Date(timestamp);
}

let refreshInterval = setInterval(function () {
  fetchNetworks().then((responseJson) => {
    console.log(responseJson); // fetched networks
    dataRefresh(responseJson);
    //generateNetworkTable(selection, networks);
  });
}, 300000); //refresh data every 5 minutes

function initialDataLoad() {
  console.log(">> Loading initial data");

  fetchNetworks().then((responseJson) => {
    dataRefresh(responseJson);
  });
}

function dataRefresh(responseJson) {
  console.log(">> dataRefresh");
  localStorage.clear();
  localStorage.setItem("_lastDataRefresh", generateDateTimeStamp());

  //writeNetworkResponse
  writeNetworkResponse(responseJson);
}

//method was borrowed from https://gist.github.com/n0m4dz/77f08d3de1b9115e905c
// returns an array of localStorage items in key/value pairs based on a query parameter
// returns all localStorage items if query isn't specified
// query can be a string or a RegExp object

function findLocalItems(query) {
  var i,
    results = [];
  for (i in localStorage) {
    if (localStorage.hasOwnProperty(i)) {
      if (i.match(query) || (!query && typeof i === "string")) {
        value = JSON.parse(localStorage.getItem(i));
        results.push({ key: i, val: value });
      }
    }
  }
  return results;
}

function writeNetworkResponse(responseJson) {
  for (
    let index = 0;
    index < Object.keys(responseJson.networks).length;
    index++
  ) {
    const company = responseJson.networks[index].company;
    const city = responseJson.networks[index].location.city;
    const country = responseJson.networks[index].location.country;
    const latitude = responseJson.networks[index].location.latitude;
    const longitude = responseJson.networks[index].location.longitude;
    const href = responseJson.networks[index].href;
    const name = responseJson.networks[index].name;
    const id = responseJson.networks[index].id;
    const networkKey = country + "." + city + "." + id;
    const actualLocation = new Location(city, country, latitude, longitude);
    const actualNetwork = new Network(company, href, id, actualLocation, name);
    localStorage.setItem(networkKey, JSON.stringify(actualNetwork));
  }
}

listItem.addEventListener("change", function () {
  selection = this.value;
  console.log("clicked " + selection);
});

function refreshData() {
  console.log(">> refreshing data");
  fetchNetworks();
}

async function fetchNetworks() {
  console.log(">>fetchNetworks");
  const response = await fetch(`${BIKE_BASE_URI}/v2/networks`);
  const networks = await response.json();
  return networks;
}

async function fetchNetworkDetails(route) {
  console.log("fetchNetworkDetailsh");
  const response = await fetch(`${BIKE_BASE_URI}${route}`);
  const network = await response.json();
  return network;
}

function generateNetworkDetailTableHeader(responseJson) {
  console.log("generateNetworkDetailTableHeader");
  console.log(responseJson);

  const networkContainer = document.getElementById("networks-container");

  if (document.getElementById("network-table")) {
    networkContainer.removeChild(document.getElementById("network-table"));
  }

  const networkDetailTable = document.createElement("table");
  networkDetailTable.setAttribute("id", "network-table");

  networkContainer.appendChild(networkDetailTable);
  const networkDetailRow = document.createElement("tr");
  networkDetailTable.appendChild(networkDetailRow);
  const networkHeader1 = document.createElement("th");
  networkDetailTable.appendChild(networkHeader1);
  networkHeader1.innerHTML = " Location Name";
  const networkHeader2 = document.createElement("th");
  networkDetailTable.appendChild(networkHeader2);
  networkHeader2.innerHTML = "Available Slots";
  const networkHeader3 = document.createElement("th");
  networkDetailTable.appendChild(networkHeader3);
  networkHeader3.innerHTML = "Free Bikes";

  //TODO - Refactor this function and create function to handle extra fields
  if ("extra" in responseJson) {
    Object.keys(responseJson.network.stations[0].extra).forEach((key) => {
      let networkHeader4 = document.createElement("th");
      networkDetailTable.appendChild(networkHeader4);
      networkHeader4.innerHTML = key;
    });
  }
  return networkDetailTable;
}

function generateNetworkTableHeader() {
  const networkContainer = document.getElementById("networks-container");

  if (document.getElementById("network-table")) {
    networkContainer.removeChild(document.getElementById("network-table"));
  }

  const networkTable = document.createElement("table");
  networkTable.setAttribute("id", "network-table");
  networkContainer.appendChild(networkTable);
  const networkDetailRow = document.createElement("tr");
  networkTable.appendChild(networkDetailRow);
  const networkHeader1 = document.createElement("th");
  networkTable.appendChild(networkHeader1);
  networkHeader1.innerHTML = " Company";
  const networkHeader2 = document.createElement("th");
  networkTable.appendChild(networkHeader2);
  networkHeader2.innerHTML = " Country";
  const networkHeader3 = document.createElement("th");
  networkTable.appendChild(networkHeader3);
  networkHeader3.innerHTML = " City";

  return networkTable;
}

function clickViewNetworkDetail(event) {
  currentNetwork = this.getAttribute("data-network");
  console.log(event);
  console.log(currentNetwork);
  fetchNetworkDetails(currentNetwork).then((network) => {
    console.log(network); // fetched network details
    generateNetworkDetailTable(network);
  });
}

function clickViewMapDetail(event) {
  let latitude = this.getAttribute("data-latitude");
  let longitude = this.getAttribute("data-longitude");
  console.log(latitude);
  console.log(longitude);
  //TODO - add google fetch
  // fetchNetworkDetails(currentNetwork).then((network) => {
  //   console.log(network); // fetched network details
  //   generateNetworkDetailTable(network);
  // });
}

const clickListItem = function (event) {
  event.target.parentNode.classList.toggle("done");
};

function generateNetworkTable(selection, responseJson) {
  const networkTable = generateNetworkTableHeader();

  const base = 310;
  for (let index = base; index < base + 20; index++) {
    let company = responseJson.networks[index].company;
    let city = responseJson.networks[index].location.city;
    let country = responseJson.networks[index].location.country;
    let network = responseJson.networks[index].href;

    const networkRow = document.createElement("tr");
    networkTable.appendChild(networkRow);
    const networkTD1 = document.createElement("td");
    networkRow.appendChild(networkTD1);
    const networkTD2 = document.createElement("td");
    networkRow.appendChild(networkTD2);
    const networkTD3 = document.createElement("td");
    networkRow.appendChild(networkTD3);
    const networkTD4 = document.createElement("td");
    networkRow.appendChild(networkTD4);
    const div = document.createElement("div");
    networkTD4.appendChild(div);

    //todo extract into function
    const viewButton = document.createElement("a");
    viewButton.setAttribute("class", "view-item");
    viewButton.setAttribute("data-network", network);
    viewButton.innerText = "View";
    div.appendChild(viewButton);
    viewButton.addEventListener("click", clickViewNetworkDetail);

    //create method that checks if it's the view btn
    networkRow.addEventListener("mouseover", (event) => {
      event.target.parentNode.classList.toggle("cell-highlight");
    });
    networkRow.addEventListener("mouseout", (event) => {
      event.target.parentNode.classList.toggle("cell-highlight");
    });

    networkTD1.innerHTML = " " + company;
    networkTD2.innerHTML = " " + country;
    networkTD3.innerHTML = " " + city;
  }
}

function generateNetworkDetailTable(responseJson) {
  console.log("generateNetworkDetailTable");
  console.log("HERE****");
  console.log(responseJson);
  const networkSectionTable = generateNetworkDetailTableHeader(responseJson);
  for (let index = 0; index < responseJson.network.stations.length; index++) {
    const networkDetailRow = document.createElement("tr");
    networkSectionTable.appendChild(networkDetailRow);
    const networkDetailTD1 = document.createElement("td");
    networkDetailRow.appendChild(networkDetailTD1);
    const networkDetailTD2 = document.createElement("td");
    networkDetailRow.appendChild(networkDetailTD2);
    const networkDetailTD3 = document.createElement("td");
    networkDetailRow.appendChild(networkDetailTD3);
    const div = document.createElement("div");
    networkDetailRow.appendChild(div);

    //todo extract into function
    const viewButton = document.createElement("a");
    viewButton.setAttribute("class", "view-item");
    viewButton.setAttribute(
      "data-latitude",
      responseJson.network.stations[index].latitude
    );
    viewButton.setAttribute(
      "data-longitude",
      responseJson.network.stations[index].longitude
    );
    viewButton.innerText = "View Map";
    div.appendChild(viewButton);
    viewButton.addEventListener("click", clickViewMapDetail);

    let name = responseJson.network.stations[index].name;
    let emptySlots = responseJson.network.stations[index].empty_slots;
    let free_bikes = responseJson.network.stations[index].free_bikes;

    networkDetailTD1.innerHTML = " " + name;
    networkDetailTD2.innerHTML = " " + emptySlots;
    networkDetailTD3.innerHTML = " " + free_bikes;

    if ("extra" in responseJson) {
      Object.values(responseJson.network.stations[index].extra).forEach(
        (value) => {
          let networkDetail4 = document.createElement("td");
          networkDetailRow.appendChild(networkDetail4);
          networkDetail4.innerHTML = value;
        }
      );
    }

    //create method that checks if it's the view btn
    networkDetailRow.addEventListener("mouseover", (event) => {
      event.target.parentNode.classList.toggle("cell-highlight");
    });
    networkDetailRow.addEventListener("mouseout", (event) => {
      event.target.parentNode.classList.toggle("cell-highlight");
    });
  }
}
