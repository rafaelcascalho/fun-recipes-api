import GiphyService from "./GiphyService";
import RecipePuppyService from "./RecipePuppyService";
import Recipe from "../models/Recipe";

class RecipeService {
  private giphy: GiphyService;
  private recipePuppy: RecipePuppyService;

  constructor(giphy: GiphyService, recipePuppy: RecipePuppyService) {
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
