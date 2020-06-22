import {
  RECIPE_PUPPY_API_URL,
  STATUS_SERVER_ERROR,
  STATUS_OK,
} from "../../../config/constants";
import consumeApi from "../../../services/consumeApi";
import RecipePuppyConsumer from "../../../models/RecipePuppyConsumer";
import expectedRecipes from "../../fixtures/recipes/recipes.json";
import rawRecipes from "../../fixtures/recipes/rawRecipes.json";
import nock from "nock";

describe("RecipePuppyConsumer", () => {
  const ingredients = ["garlic", "onions"];

  describe("when success", () => {
    nock(RECIPE_PUPPY_API_URL)
      .get("/?&i=garlic,onions")
      .reply(STATUS_OK, rawRecipes);

    test("returns a list of recipes", async () => {
      const recipesConsumer = new RecipePuppyConsumer(consumeApi);

      const recipes = await recipesConsumer.recipes(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toEqual(10);
      expect(recipes).toMatchObject(expectedRecipes);
    });
  });

  describe("when fail", () => {
    nock(RECIPE_PUPPY_API_URL)
      .get("/?&i=garlic,onions")
      .reply(STATUS_SERVER_ERROR, []);

    test("returns a list of recipes", async () => {
      const recipesConsumer = new RecipePuppyConsumer(consumeApi);

      const recipes = await recipesConsumer.recipes(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toEqual(0);
      expect(recipes).toMatchObject([]);
    });
  });
});
