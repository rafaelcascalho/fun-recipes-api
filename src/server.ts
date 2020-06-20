import app from "./config/app";
import { HOST, PORT } from "./config/constants";

app.listen(PORT, () =>
  console.log(`> server running at http://${HOST}:${PORT}`)
);
