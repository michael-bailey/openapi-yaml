import express, { Application, Router } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import path from "path";

import AeroportController from "./controllers/AeroportController";

(async () => {
  const app: Application = express();
  const swaggerDocs = YAML.load(path.join(__dirname, "aeroports-config.yaml"));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  const routes: [Router] = [AeroportController];

  routes.forEach((r) => {
    app.use("/", r);
  });

  app.listen(3000, () => {
    console.log("Started...");
  });
})();
