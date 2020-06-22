import axios from "axios";

async function consumeApi(url: string, queryFields: object) {
  return axios.get(url, { params: { ...queryFields }, timeout: 400 });
}

export default consumeApi;
