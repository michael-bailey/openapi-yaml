import { Request, Router, Response } from "express";

import Aeroport from "../models/Aeroport";

import _aeroports from "../data/aeroports.json";
let aeroports = _aeroports as Array<Aeroport>;

let route = Router();

route
  .route("/aeroports")
  .get(async (req: Request, res: Response) => {
    // query params: limit, page, sort
    let limit: number = isNaN(parseInt(req.query["limit"] as string))
      ? 10
      : parseInt(req.query["limit"] as string);
    let page: number = isNaN(parseInt(req.query["page"] as string))
      ? 0
      : parseInt(req.query["page"] as string);
    let sort: string = (req.query["sort"] as string) ?? "";

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
  .post(async (req: Request, res: Response) => {
    // create new aeroplane
    let tmp = Aeroport.newObject(req.body);

    // putting into array
    aeroports.push(tmp);

    // send created status
    res.status(201).send(JSON.stringify(tmp));
  });

route
  .route("/aeroports/:icao")
  .get(async (req: Request, res: Response) => {})
  .patch(async (req: Request, res: Response) => {})
  .delete(async (req: Request, res: Response) => {});

export default route;
