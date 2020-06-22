import GiphyConsumer from "./GiphyConsumer";
import RecipePuppyConsumer from "./RecipePuppyConsumer";
import Recipe from "../models/Recipe";

class RecipeService {
  private giphy: GiphyConsumer;
  private recipePuppy: RecipePuppyConsumer;

  constructor(giphy: GiphyConsumer, recipePuppy: RecipePuppyConsumer) {
    this.giphy = giphy;
    this.recipePuppy = recipePuppy;
  }

  async find(ingredients: Array<string>) {
    let recipes = await this.recipePuppy.recipes(ingredients);
    recipes = await Promise.all(recipes.map(this.addGifUrl, this));
    return recipes;
  }

  private async addGifUrl(recipe: Recipe) {
    const gifUrl = await this.giphy.gif(recipe.getTitle());
    return recipe.addGif(gifUrl).toObject();
  }
}

export default RecipeService;
