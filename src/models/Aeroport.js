module.exports = class Aeroport {
  constructor() {
    this.icao = "";
    this.iata = "";
    this.name = "";
    this.city = "";
    this.state = "";
    this.country = "";
    this.elevation = 0;
    this.lat = 0;
    this.lon = 0;
    this.tz = "";
  }

  static newObject(object) {
    let tmp = new Aeroport();

    tmp.city = object.city ?? "";
    tmp.country = object.country ?? "";
    tmp.elevation = object.elevation ?? 0;
    tmp.iata = object.iata ?? "";
    tmp.icao = object.icao ?? "";
    tmp.lat = object.lat ?? 0;
    tmp.lon = object.lon ?? 0;
    tmp.name = object.name ?? "";
    tmp.state = object.state ?? "";
    tmp.tz = object.tz ?? "";

    return tmp;
  }
};
