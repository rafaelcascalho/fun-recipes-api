import RecipePuppyConsumer from "../../models/RecipePuppyConsumer";
import expectedRecipes from "../fixtures/recipes.json";

describe("RecipePuppyConsumer", () => {
  const consumer = new RecipePuppyConsumer();

  describe(".recipes", () => {
    test("returns a list of recipes", async () => {
      const ingredients = ["garlic", "onions"];
      const recipes = await consumer.recipes(ingredients);

      expect(recipes).toBeInstanceOf(Array);
      expect(recipes.length).toEqual(10);
      expect(recipes).toMatchObject(expectedRecipes);
    });
  });
});
