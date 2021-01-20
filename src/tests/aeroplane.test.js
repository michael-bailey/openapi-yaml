const Aeroport = require("../models/Aeroport");

describe("aeroport Tests", () => {
  test("aeroport creation", () => {
    let aeroport1 = new Aeroport();

    let aeroport2 = Aeroport.newObject({ icao: "qwerty" });

    expect(aeroport1).toBeInstanceOf(Aeroport);
    expect(aeroport1.icao).toBe("");
    expect(aeroport2).toBeInstanceOf(Aeroport);
    expect(aeroport2.icao).toBe("qwerty");
  });
});
