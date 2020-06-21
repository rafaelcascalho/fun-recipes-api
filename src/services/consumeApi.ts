import axios from "axios";

async function consumeApi(url: string, queryFields: object) {
  return axios.get(url, { params: { ...queryFields } });
}

export default consumeApi;
