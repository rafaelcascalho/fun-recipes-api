import {
  RECIPE_PUPPY_API_URL,
  STATUS_SERVER_ERROR,
  STATUS_OK,
} from "../../../config/constants";
import consumeApi from "../../../services/consumeApi";
import RecipePuppyConsumer from "../../../services/RecipePuppyConsumer";
import expectedRecipes from "../../fixtures/recipes/expectedRecipes.json";
import rawRecipes from "../../fixtures/recipes/rawRecipes.json";
import nock from "nock";

describe("RecipePuppyConsumer", () => {
  const ingredients = ["garlic", "onions"];
  const endpoint = "/?&i=garlic,onions";

  describe("when success", () => {
    const expectedNumberOfRecipes = 10;
    nock(RECIPE_PUPPY_API_URL).get(endpoint).reply(STATUS_OK, rawRecipes);

    test("returns a list of recipes", async () => {
      const recipePuppy = new RecipePuppyConsumer(consumeApi);

      const recipes = await recipePuppy.recipes(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toEqual(expectedNumberOfRecipes);
      expect(recipes).toMatchObject(expectedRecipes);
    });
  });

  describe("when fail", () => {
    const expectedNumberOfRecipes = 0;
    const expectedRecipes: Array<object> = [];
    nock(RECIPE_PUPPY_API_URL).get(endpoint).reply(STATUS_SERVER_ERROR, []);

    test("returns a list of recipes", async () => {
      const recipePuppy = new RecipePuppyConsumer(consumeApi);

      const recipes = await recipePuppy.recipes(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toEqual(expectedNumberOfRecipes);
      expect(recipes).toMatchObject(expectedRecipes);
    });
  });
});
