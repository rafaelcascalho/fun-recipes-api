import checkApisHealth from "../../../services/checkApisHealth";
import {
  STATUS_OK,
  RECIPE_PUPPY_API_URL,
  STATUS_SERVER_ERROR,
  GIPHY_API_URL,
} from "../../../config/constants";
import nock from "nock";

describe("checkApisHealth", () => {
  const statusUp = { status: "UP" };
  const serverErrorMessage = "Server Internal Error";

  describe("when only the RecipePuppy service is Down", () => {
    nock(RECIPE_PUPPY_API_URL)
      .get("/")
      .reply(STATUS_SERVER_ERROR, serverErrorMessage);
    nock(GIPHY_API_URL).get("/").reply(STATUS_OK, statusUp);

    test("then it returns DOWN", async () => {
      const expectedOffline = ["Recipe Puppy API"];

      const status = await checkApisHealth();

      expect(status).toMatchObject(expectedOffline);
    });
  });

  describe("when only the Giphy service is Down", () => {
    nock(GIPHY_API_URL).get("/").reply(STATUS_SERVER_ERROR, serverErrorMessage);
    nock(RECIPE_PUPPY_API_URL).get("/").reply(STATUS_OK, statusUp);

    test("then it returns the giphy service", async () => {
      const expectedOffline = ["Giphy API"];

      const status = await checkApisHealth();

      expect(status).toMatchObject(expectedOffline);
    });
  });

  describe("when all the services are Down", () => {
    nock(RECIPE_PUPPY_API_URL)
      .get("/")
      .reply(STATUS_SERVER_ERROR, serverErrorMessage);
    nock(GIPHY_API_URL).get("/").reply(STATUS_SERVER_ERROR, serverErrorMessage);

    test("then it returns a list with both services", async () => {
      const expectedOffline = ["Recipe Puppy API", "Giphy API"];

      const status = await checkApisHealth();

      expect(status).toMatchObject(expectedOffline);
    });
  });

  describe("when all the services are Up", () => {
    nock(GIPHY_API_URL).get("/").reply(STATUS_OK, statusUp);
    nock(RECIPE_PUPPY_API_URL).get("/").reply(STATUS_OK, statusUp);

    test("then it returns an empty list", async () => {
      const status = await checkApisHealth();

      expect(status).toMatchObject([]);
    });
  });
});
