import { Router } from "express";

import consumeApi from "../services/consumeApi";

import RecipeController from "../controllers/RecipeController";

const recipeController = new RecipeController(consumeApi);

const routes = Router();

routes.get("/recipes", recipeController.index);

export default routes;
