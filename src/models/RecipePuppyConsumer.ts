import { Recipe } from "../types";

class RecipePuppyConsumer {
  private url: string;
  private request: Function;

  constructor(consumer: Function, url: string) {
    this.request = consumer;
    this.url = url;
  }

  async recipes(ingredients: Array<string>) {
    const queryfields = this.queryFields(ingredients);
    try {
      const response = await this.request(this.url, queryfields);
      const recipes = response.data.results.map(this.presentRecipe);
      return recipes;
    } catch (error) {
      console.error(error.message);
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
