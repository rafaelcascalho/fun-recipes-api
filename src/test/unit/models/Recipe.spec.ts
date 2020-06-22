import Recipe from "../../../models/Recipe";

describe("Recipe", () => {
  describe("new", () => {
    test("it returns a new recipe", () => {
      const recipe = new Recipe("", "", []);

      expect(recipe).toBeInstanceOf(Recipe);
    });
  });

  describe(".getTitle", () => {
    test("it returns the initial recipe title", () => {
      const recipe = new Recipe("fake", "", []);

      const title = recipe.getTitle();

      expect(title).toEqual("fake");
    });
  });

  describe(".toObject", () => {
    test("it returns an object of the recipe", () => {
      const recipe = new Recipe("", "", []);
      const expectedObj = { title: "", link: "", ingredients: [], gif: "" };

      const recipeObj = recipe.toObject();

      expect(recipeObj).toBeInstanceOf(Object);
      expect(recipeObj).toMatchObject(expectedObj);
    });
  });

  describe(".addGif", () => {
    test("it adds a gif link to the recipe", () => {
      const recipe = new Recipe("fake", "", []);

      const recipeObj = recipe.addGif("fake/url").toObject();

      expect(recipeObj.gif).toEqual("fake/url");
    });
  });
});
