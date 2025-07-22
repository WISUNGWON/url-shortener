import db from "./db";
import { createServer } from "./server";
import { log } from "@repo/logger";

const port = process.env.PORT || 3001;
const server = createServer();

server.get("/test", async (req, res) => {

  try {
    const urlEntry = await db("test")
      .select("*")
      .first();

    if (urlEntry) {
      return res.json({
        message: "Live reload is working!",
        data: urlEntry,
        timestamp: new Date().toISOString()
      });
    } else {
      return res.status(404).send("Short URL not found.");
    }
  } catch (error) {
    console.error("Error retrieving original URL:", error);
    return res.status(500).json({
      error: "Failed to retrieve URL.",
      message: "Live reload detected this change!"
    });
  }
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
