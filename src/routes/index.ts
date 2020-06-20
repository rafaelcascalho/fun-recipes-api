import { Router } from "express";

const routes = Router();

routes.get("/health", (request, response) => {
  return response.json({
    api_status: "UP",
    recipe_puppy_status: "DOWN",
    giphy_status: "DOWN",
  });
});

export default routes;
