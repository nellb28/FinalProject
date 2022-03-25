describe("generateNetworkDetailTableHeader tests", () => {
  it("should return table header", () => {
    responseJson = {
      networks: [
        {
          company: ["ЗАО «СитиБайк»"],
          href: "/v2/networks/velobike-moscow",
          id: "velobike-moscow",
          location: {
            city: "Moscow",
            country: "RU",
            latitude: 55.75,
            longitude: 37.616667,
          },
          name: "Velobike",
        },
      ],
    };
    const response = generateNetworkDetailTableHeader(responseJson);
    assert.response.toContain("Velobike");
  });
});
