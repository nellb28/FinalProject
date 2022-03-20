const BASE_URI = "http://api.citybik.es";

fetchNetworkDetails().then((network) => {
  console.log(network); // fetched stations
  generateNetworkDetailTable(network);
});

async function fetchNetworks() {
  const response = await fetch(`${BASE_URI}/v2/networks`);
  const networks = await response.json();
  return networks;
}

async function fetchNetworkDetails() {
  const response = await fetch(`${BASE_URI}/v2/networks/divvy`);
  const network = await response.json();
  return network;
}

function generateNetworkDetailTableHeader() {
  const networkContainer = document.getElementById("networks-container");

  if (document.getElementById("network-table")) {
    networkContainer.removeChild(
      document.getElementById("network-section-table")
    );
  }
  const networkDetailTable = document.createElement("table");
  networkDetailTable.setAttribute("id", "network-table");

  networkContainer.appendChild(networkDetailTable);
  const networkDetailRow = document.createElement("tr");
  networkDetailTable.appendChild(networkDetailRow);
  const networkHeader1 = document.createElement("th");
  networkDetailTable.appendChild(networkHeader1);
  networkHeader1.innerHTML = " Company";
  const networkHeader2 = document.createElement("th");
  networkDetailTable.appendChild(networkHeader2);
  networkHeader2.innerHTML = " Country";
  const networkHeader3 = document.createElement("th");
  networkDetailTable.appendChild(networkHeader3);
  networkHeader3.innerHTML = " City";

  return networkDetailTable;
}

function generateTableHeader() {
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
function generatenetworkTable(responseJson) {
  const networkTable = generateTableHeader();
  const base = 310;
  for (let index = 0; index < base + 100; index++) {
    const networkDetailRow = document.createElement("tr");
    networkTable.appendChild(networkDetailRow);
    const networkTD1 = document.createElement("td");
    networkRow.appendChild(networkTD1);
    const networkTD2 = document.createElement("td");
    networkRow.appendChild(networkTD2);
    const networkTD3 = document.createElement("td");
    networkRow.appendChild(networkTD3);

    let company = responseJson.networks[index].company;
    let city = responseJson.networks[index].location.city;
    let country = responseJson.networks[index].location.country;

    networkTD1.innerHTML = " " + company;
    networkTD2.innerHTML = " " + country;
    networkTD3.innerHTML = " " + city;
  }
}

function generateNetworkDetailTable(responseJson) {
  const networkSectionTable = generateNetworkDetailTableHeader();
  const base = 215;
  for (let index = base; index < base + 10; index++) {
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
    let eBikes = responseJson.network.stations[index].extra.eBikes;

    networkDetailTD1.innerHTML = " " + name;
    networkDetailTD2.innerHTML = " " + emptySlots;
    networkDetailTD3.innerHTML = " " + eBikes;
  }
}
