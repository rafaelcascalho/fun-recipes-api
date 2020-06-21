import axios from "axios";

class Consumer {
  private api: any;

  constructor() {
    this.api = axios.create({ method: "get" });
  }

  async request(url: string, queryFields: object) {
    let result = await this.api(url, { params: { ...queryFields } });
    return result.data;
  }
}

export default Consumer;
