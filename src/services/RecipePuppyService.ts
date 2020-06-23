import { RECIPE_PUPPY_API_URL } from "../config/constants";
import Recipe from "../models/Recipe";
import { RawRecipe } from "../types";

class RecipePuppyService {
  private url: string;
  private request: Function;

  constructor(consumer: Function) {
    this.request = consumer;
    this.url = RECIPE_PUPPY_API_URL;
  }

  async recipes(ingredients: Array<string>) {
    const queryfields = this.queryFields(ingredients);
    const response = await this.request(this.url, queryfields);
    const results = response.data.results;
    if (!results) {
      return [];
    }

    return results.map(this.create);
  }

  private queryFields(ingredients: Array<string>) {
    if (!ingredients) {
      return { i: "" };
    }

    return { i: ingredients.join() };
  }

  private create(rawRecipe: RawRecipe) {
    let { title, href, ingredients } = rawRecipe;
    title = title.trim();
    const link = href;
    const ingredientsList = ingredients.split(", ");
    return new Recipe(title, link, ingredientsList);
  }
}

export default RecipePuppyService;
