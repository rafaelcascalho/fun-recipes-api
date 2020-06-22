import {
  STATUS_OK,
  STATUS_SERVER_ERROR,
  GIPHY_API_URL,
  GIPHY_API_KEY,
} from "../../../config/constants";
import GiphyConsumer from "../../../models/GiphyConsumer";
import consumeApi from "../../../services/consumeApi";
import omeletResponse from "../../fixtures/gifs/omeletResponse.json";
import nock from "nock";

describe("GiphyConsumer", () => {
  const recipe = "omelet";
  const endpoint = `/search?api_key=${GIPHY_API_KEY}&q=${recipe}&limit=1&offset=0&rating=G&lang=pt`;

  describe("when success", () => {
    nock(GIPHY_API_URL).get(endpoint).reply(STATUS_OK, omeletResponse);

    test("then it returns the gif url", async () => {
      const consumer = new GiphyConsumer(consumeApi);

      const gifUrl = await consumer.gif(recipe);

      expect(typeof gifUrl).toEqual("string");
      expect(gifUrl).not.toEqual("");
    });
  });

  describe("when fail", () => {
    nock(GIPHY_API_URL)
      .get(endpoint)
      .reply(STATUS_SERVER_ERROR, "Server Internal Error");

    test("then it returns an empty string", async () => {
      const consumer = new GiphyConsumer(consumeApi);

      const gifUrl = await consumer.gif(recipe);

      expect(typeof gifUrl).toEqual("string");
      expect(gifUrl).toEqual("");
    });
  });
});
