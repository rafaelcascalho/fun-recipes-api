import { config } from "dotenv-flow";

config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;

export const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

// ---------- HTTP Status Code
export const STATUS_OK = 200;
export const STATUS_SERVER_ERROR = 500;

// ---------- APIs URLs
export const RECIPE_PUPPY_API_URL = "http://www.recipepuppy.com/api/";
export const GIPHY_API_URL = "https://api.giphy.com/v1/gifs";
