import { RECIPE_PUPPY_API_URL, GIPHY_API_URL } from "../config/constants";
import axios from "axios";

async function checkApisHealth() {
  let apisStatus = await Promise.all([
    isUp(RECIPE_PUPPY_API_URL),
    isUp(GIPHY_API_URL),
  ]);

  return offlineApis(apisStatus);
}

async function isUp(url: string) {
  try {
    await axios.get(url);
  } catch (error) {
    return false;
  }
  return true;
}

function offlineApis(status: Array<boolean>) {
  let offline = [];
  if (!status[0]) {
    offline.push("Recipe Puppy API");
  }
  if (!status[1]) {
    offline.push("Giphy API");
  }
  return offline;
}

export default checkApisHealth;
