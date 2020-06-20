export const healthExpectation = (
  apiStatus: string,
  giphyStatus: string,
  recipePuppyStatus: string
) => ({
  api_status: apiStatus,
  giphy_status: giphyStatus,
  recipe_puppy_status: recipePuppyStatus,
});
