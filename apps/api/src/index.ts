import db from "./db";
import urlRoutes from "./routes/urlRoutes";
import { createServer } from "./server";
import { log } from "@repo/logger";

const port = process.env.PORT || 3001;
const server = createServer();

server.use('/', urlRoutes);


server.listen(port, () => {
  log(`api running on ${port}`);
});
