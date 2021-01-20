import express, { Application, Router } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import swaggerdocs from "swagger-jsdoc";

import path from "path";

import aeroports from "./data/aeroports.json";
import AeroportController from "./controllers/AeroportController";

(async () => {
  // setting up swagger docs
  const swaggerDocs = YAML.load(path.join(__dirname, "aeroports-config.yaml"));
  let docs = swaggerdocs({
    swaggerDefinition: swaggerDocs,
    apis: [
      "./index.ts",
      "./controllers/AeroportController.ts",
      "./models/Aeroport.ts",
    ],
  });

  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(docs, { explorer: true })
  );

  const routes: [Router] = [AeroportController];

  routes.forEach((r) => {
    app.use("/v1", r);
  });

  app.listen(3000, () => {
    console.log("Started...");
  });
})();
