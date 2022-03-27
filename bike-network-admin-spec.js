describe("Tests for findLocalItems()", () => {
  it("should return 665 items", () => {
    const response = findLocalItems("RU.Moscow.velobike-moscow");
    assert.response.toContain("moscow");
  });
});

//need to add/delete data before/after running tets.
//const temp = findLocalItems("RU.Moscow.velobike-moscow");
//console.log(temp);
