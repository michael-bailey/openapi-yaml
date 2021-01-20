const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const Aeroport = "../models/Aeroport.js";

const aeroports = JSON.parse(
  fs
    .readFileSync(path.join(path.resolve(), "/src/data/aeroports.json"))
    .toString()
);

let route = Router();

route
  .route("/aeroports")
  .get(async (req, res) => {
    // query params: limit, page, sort
    let limit = isNaN(parseInt(req.query["limit"]))
      ? 10
      : parseInt(req.query["limit"]);
    let page = isNaN(parseInt(req.query["page"]))
      ? 0
      : parseInt(req.query["page"]);
    let sort = req.query["sort"] ?? "";

    // pagination
    let tmp = aeroports.slice(limit * page, limit + limit * page);

    // switching sort method
    switch (sort) {
      case "lat":
        tmp = tmp.sort((a1, a2) => a1.lat - a2.lat);
        break;

      case "lon":
        tmp = tmp.sort((a1, a2) => a1.lon - a2.lon);
        break;

      case "city":
        tmp = tmp.sort((a1, a2) =>
          a1.city < a2.city ? -1 : a1.city > a2.city ? 1 : 0
        );

      case "country":
        tmp = tmp.sort((a1, a2) =>
          a1.country < a2.country ? -1 : a1.country > a2.country ? 1 : 0
        );

      default:
        break;
    }

    // return success
    res
      .status(200)
      .send(JSON.stringify({ count: tmp.length, result: tmp }))
      .end();
  })
  .post(async (req, res) => {
    // create new aeroplane
    let tmp = Aeroport.newObject(req.body);

    // putting into array
    aeroports.push(tmp);

    // send created status
    res.status(201).send(JSON.stringify(tmp));
  });

route
  .route("/aeroports/:icao")
  .get(async (req, res) => {})
  .patch(async (req, res) => {})
  .delete(async (req, res) => {});

module.exports = route;
