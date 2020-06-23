import { GIPHY_API_URL, GIPHY_API_KEY } from "../config/constants";

const defaultOptions = { limit: 1, offset: 0, rating: "G", lang: "pt" };

class GiphyService {
  private url: string;
  private request: Function;

  constructor(consumer: Function) {
    this.request = consumer;
    this.url = `${GIPHY_API_URL}/search`;
  }

  async gif(recipeName: string) {
    const queryfields = this.queryFields(recipeName);
    const response = await this.request(this.url, queryfields);

    const gifNotFound = response.data.pagination.total_count === 0;
    if (gifNotFound) {
      return "";
    }

    console.log(response.data.data[0].images.original);

    return response.data.data[0].images.original.url;
  }

  private queryFields(recipeName: string) {
    return {
      ...defaultOptions,
      api_key: GIPHY_API_KEY,
      q: recipeName,
    };
  }
}

export default GiphyService;
