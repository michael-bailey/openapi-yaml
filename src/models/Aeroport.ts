export default class Aeroport {
  icao: string = "";
  iata: string = "";
  name: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  elevation: number = 0;
  lat: number = 0;
  lon: number = 0;
  tz: string = "";

  static newObject(object: Aeroport): Aeroport {
    let tmp = new Aeroport();

    console.log(tmp);

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
}
