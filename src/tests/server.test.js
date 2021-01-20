const request = require("supertest");
const app = require("../app");

describe("My Airport server", () => {
  test("get areoports no params", (done) => {
    request(app)
      .get("/v1/aeroports")
      .expect(200)
      .expect((res) => res.body.count === 10)
      .end(done);
  });

  test("get areoports with limit changed", (done) => {
    let limit = 100;

    request(app)
      .get("/v1/aeroports")
      .query("limit", limit)
      .expect(200)
      .expect((res) => res.body.count === limit)
      .end(done);
  });
});
