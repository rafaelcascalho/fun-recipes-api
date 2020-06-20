import app from "../../config/app";
import request from "supertest";
import { healthExpectation } from "../helper";

describe("Given the API is running", () => {
  describe.only("when only the API is UP", () => {
    test("then it returns up just for the API", async () => {
      const expectedHealth = healthExpectation("UP", "DOWN", "DOWN");

      const response = await request(app).get("/api/v1/health");

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expectedHealth);
    });
  });

  describe("when RecipePuppy is down", () => {
    test("then it returns that RecipePuppy is down", async () => {
      const expectedHealth = healthExpectation("UP", "DOWN", "UP");

      const response = await request(app).get("/api/v1/health");

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expectedHealth);
    });
  });

  describe("when giphy is down", () => {
    test("then it returns up just for the API", async () => {
      const expectedHealth = healthExpectation("UP", "UP", "DOWN");

      const response = await request(app).get("/api/v1/health");

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expectedHealth);
    });
  });

  describe("when all the APIs are UP", () => {
    test("then it returns up just for the API", async () => {
      const expectedHealth = healthExpectation("UP", "UP", "UP");

      const response = await request(app).get("/api/v1/health");

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(expectedHealth);
    });
  });
});
