import express, { Application, Router } from "express";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

import path from "path";

import AeroportController from "./controllers/AeroportController";

const options = {
  documentation: YAML.load(path.join(__dirname, "aeroports-config.yaml")),
  controllers: [AeroportController],
};

const app: Application = express();

options.controllers.forEach((r) => {
  app.use("/v1", r);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(options.documentation, { explorer: true })
);

export default app;
