import {
  RECIPE_PUPPY_API_URL,
  STATUS_SERVER_ERROR,
  STATUS_OK,
} from "../../../config/constants";
import consumeApi from "../../../services/consumeApi";
import nock from "nock";

describe("consumeApi", () => {
  const queryFields = {};

  describe("when success", () => {
    test("then it returns a response", async () => {
      nock(RECIPE_PUPPY_API_URL).get("/").reply(STATUS_OK, {});

      const response = await consumeApi(RECIPE_PUPPY_API_URL, queryFields);

      expect(response.status).toEqual(200);
      expect(response).toHaveProperty("data");
    });
  });

  describe("when fail", () => {
    test("then it throws an error", async () => {
      nock(RECIPE_PUPPY_API_URL).get("/").reply(STATUS_SERVER_ERROR, {});

      await expect(
        consumeApi(RECIPE_PUPPY_API_URL, queryFields)
      ).rejects.toThrow();
    });
  });
});
