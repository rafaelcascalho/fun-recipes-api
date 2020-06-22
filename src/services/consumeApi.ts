import axios from "axios";

async function consumeApi(url: string, queryFields: object) {
  return axios.get(url, { params: { ...queryFields }, timeout: 5000 });
}

export default consumeApi;
