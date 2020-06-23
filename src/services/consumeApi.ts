import axios from "axios";

type Query = {
  i: string;
};

async function consumeApi(url: string, queryFields: Query) {
  const { i } = queryFields;
  const noQuery = i === "";

  if (noQuery) {
    return axios.get(url, { timeout: 5000 });
  }

  return axios.get(url, { params: { ...queryFields }, timeout: 5000 });
}

export default consumeApi;
