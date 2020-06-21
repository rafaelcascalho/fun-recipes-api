import Consumer from "./Consumer";
import { Recipe } from "../types";

class RecipePuppyConsumer {
  private url: string;
  private api: Consumer;

  constructor() {
    this.api = new Consumer();
    this.url = "http://www.recipepuppy.com/api/?";
  }

  async recipes(ingredients: Array<string>) {
    const queryfields = this.queryFields(ingredients);
    try {
      const response = await this.api.request(this.url, queryfields);
      const recipes = response.results.map(this.presentRecipe);
      return recipes;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  private queryFields(ingredients: Array<string>) {
    const ingredientsStr = ingredients.join();
    return { i: ingredientsStr };
  }

  private presentRecipe({ title, href, ingredients }: Recipe) {
    return {
      title,
      ingredients: ingredients.split(", ").sort(),
      link: href,
    };
  }
}

export default RecipePuppyConsumer;
