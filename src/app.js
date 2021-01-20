const express = require("express");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const path = require("path");

const AeroportController = require("./controllers/AeroportController.js");

const options = {
  documentation: YAML.load(
    path.join(path.resolve(), "./config/aeroports-config.yaml")
  ),
  controllers: [AeroportController],
};

// creating app
const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(options.documentation, { explorer: true })
);

options.controllers.forEach((r) => {
  app.use("/v1", r);
});

module.exports = app;
