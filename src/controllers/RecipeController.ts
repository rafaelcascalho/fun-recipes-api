import { NextFunction, Request, Response } from "express";

import GiphyService from "../services/GiphyService";
import RecipeService from "../services/RecipeService";
import RecipePuppyService from "../services/RecipePuppyService";

import HttpError from "../errors/HttpError";

const TIMEOUT = /timeout/;

class RecipeController {
  private giphy: GiphyService;
  private recipes: RecipeService;
  private recipePuppy: RecipePuppyService;

  constructor(consumer: Function) {
    this.giphy = new GiphyService(consumer);
    this.recipePuppy = new RecipePuppyService(consumer);

    this.recipes = new RecipeService(this.giphy, this.recipePuppy);
  }

  index = async (request: Request, response: Response, next: NextFunction) => {
    const query = Object.keys(request.query).length > 0;
    let ingredients: Array<string> = [];
    if (query) {
      ingredients = String(request.query.i).split(",");
    }

    try {
      const recipes = await this.recipes.find(ingredients);
      return response.json({ keywords: ingredients, recipes });
    } catch (error) {
      console.error(error.message);
      const serviceDown = TIMEOUT.test(error.message);
      if (serviceDown) {
        return next(new HttpError(424, "external service(s) down"));
      }

      return next(new HttpError(500, error.message));
    }
  };
}

export default RecipeController;
