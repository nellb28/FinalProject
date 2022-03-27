describe("generateNetworkDetailTableHeader tests", () => {
  it("should return table header", () => {
    responseJson = {
      network: {
        company: ["Motivate International, Inc.", "PBSC Urban Solutions"],
        ebikes: true,
        gbfs_href: "https://gbfs.divvybikes.com/gbfs/gbfs.json",
        href: "/v2/networks/divvy",
        id: "divvy",
        location: {
          city: "Chicago, IL",
          country: "US",
          latitude: 41.8781136,
          longitude: -87.6297982,
        },
        name: "Divvy",
        stations: [
          {
            empty_slots: 41,
            extra: {
              ebikes: 1,
              has_ebikes: true,
              last_updated: 1648177778,
              payment: ["key", "creditcard", "transitcard"],
              renting: 1,
              returning: 1,
              uid: "a3ab9119-a135-11e9-9cda-0a87ae2ba916",
            },
            free_bikes: 5,
            id: "1f5c4bbbdda9c2d08239135f4adde68f",
            latitude: 41.96909,
            longitude: -87.674237,
            name: "Ravenswood Ave & Lawrence Ave",
            timestamp: "2022-03-25T03:10:24.127000Z",
          },
        ],
      },
    };
    const response = generateNetworkDetailTableHeader(responseJson);
    assert.response.toContain("Velobike");
  });
});
