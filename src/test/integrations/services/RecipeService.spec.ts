import {
  GIPHY_API_URL,
  GIPHY_API_KEY,
  RECIPE_PUPPY_API_URL,
  STATUS_SERVER_ERROR,
  STATUS_OK,
} from "../../../config/constants";
import GiphyConsumer from "../../../services/GiphyConsumer";
import RecipePuppyConsumer from "../../../services/RecipePuppyConsumer";
import RecipeService from "../../../services/RecipeService";
import consumeApi from "../../../services/consumeApi";
import rawRecipes from "../../fixtures/recipes/rawRecipes.json";
import expectedRecipes from "../../fixtures/recipes/expectedRecipes.json";
import recipesWithGifs from "../../fixtures/recipes/recipesWithGifs.json";
import nock from "nock";

describe("RecipeService", () => {
  const noRecipes: Array<object> = [];
  const endpoint = "/?&i=garlic,onions";
  const ingredients = ["garlic", "onions"];
  const giphyConsumer = new GiphyConsumer(consumeApi);
  const recipePuppyConsumer = new RecipePuppyConsumer(consumeApi);
  const recipeService = new RecipeService(giphyConsumer, recipePuppyConsumer);

  describe("when one or both external services are down", () => {
    nock(GIPHY_API_URL).get("/").reply(STATUS_SERVER_ERROR, "");
    nock(RECIPE_PUPPY_API_URL)
      .get(endpoint)
      .reply(STATUS_SERVER_ERROR, noRecipes);

    test("then it throws an error", async () => {
      await expect(recipeService.find(ingredients)).rejects.toThrow();
    });
  });

  describe("when no recipes are found", () => {
    const EMPTY = 0;
    nock(GIPHY_API_URL).get("/").reply(STATUS_OK, "");
    nock(RECIPE_PUPPY_API_URL).get(endpoint).reply(STATUS_OK, noRecipes);

    test("then it returns an empty list", async () => {
      const recipes = await recipeService.find(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toBe(EMPTY);
    });
  });

  describe("when success", () => {
    nock(GIPHY_API_URL).get("/").reply(STATUS_OK, "");
    nock(RECIPE_PUPPY_API_URL).get(endpoint).reply(STATUS_OK, rawRecipes);
    const defaultParams = "limit=1&offset=0&rating=G&lang=pt";
    const response = { data: [{ images: { original: { url: "gif_url" } } }] };
    expectedRecipes.forEach((recipe) => {
      let parsedTitle = encodeURI(recipe.title);
      let endpoint = `/search?${defaultParams}&api_key=${GIPHY_API_KEY}&q=${parsedTitle}`;
      nock(GIPHY_API_URL).get(endpoint).reply(STATUS_OK, response);
    });

    test("then it returns a list of recipes with gifs", async () => {
      const recipes = await recipeService.find(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes).toMatchObject(recipesWithGifs);
    });
  });
});
