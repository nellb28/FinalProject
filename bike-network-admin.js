let currentNetwork;
const BASE_URI = "http://api.citybik.es";
//TODO - add error case
//TODO - add tests
const listItem = document.getElementById("country-select");
listItem.addEventListener("change", function () {
  selection = this.value;
  console.log("clicked " + selection);
  fetchNetworks().then((networks) => {
    console.log(networks); // fetched networks
    generateNetworkTable(selection, networks);
  });
});

async function fetchNetworks() {
  const response = await fetch(`${BASE_URI}/v2/networks`);
  const networks = await response.json();
  return networks;
}

async function fetchNetworkDetails(route) {
  const response = await fetch(`${BASE_URI}${route}`);
  const network = await response.json();
  return network;
}

function generateNetworkDetailTableHeader(responseJson) {
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

const clickListItem = function (event) {
  event.target.parentNode.classList.toggle("done");
};

function generateNetworkTable(selection, responseJson) {
  const networkTable = generateNetworkTableHeader();

  // console.log("***********FILTERED******************");
  // // var result = responseJson.filter((obj) => {
  // //   obj.id == "velobike-moscow";
  // // });
  // console.log(responseData);
  // //for (let index = 0; index < responseData.networks.length; index++) {
  // // console.log(
  // //   Object.values(responseData.networks.location).filter(
  // //     (d) => d.country == selection
  // //   )
  // // );

  // responseData.networks.forEach((element) =>
  //   console.log(element.location.country.filter((d) => d.country == selection))
  // );
  // );
  //}

  // console.log(
  //   Object.values(responseJson.networks).filter(
  //     (d) => d.id == "baerum-bysykkel"
  //   )
  // );

  // if (selection) {
  //   console.log(
  //     Object.values(responseData.networks[0].location.country).filter(
  //       (d) => d.country == selection
  //     )
  //   );
  // }

  //.filter(d => d.gender === 'female')
  //function (item) {
  //return item; //.networks.id == "velobike-moscow";
  // })
  //);
  // console.log(result); // "id": "velobike-moscow",
  //console.log("***********FILTERED******************");

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
  }
}
