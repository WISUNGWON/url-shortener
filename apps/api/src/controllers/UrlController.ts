// src/controllers/UrlController.ts
import { Request, Response } from 'express';
import UrlService from '../services/UrlService';

class UrlController {
  async shortenUrl(req: Request, res: Response): Promise<Response> {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "originalUrl is required" });
    }

    try {
      new URL(originalUrl); // URL 유효성 간단 검사
    } catch (e) {
      return res.status(400).json({ error: "Invalid originalUrl format" });
    }

    try {
      const shortKey = await UrlService.createShortUrl(originalUrl);
      const shortUrl = `${req.protocol}://${req.get("host")}/${shortKey}`;
      return res.status(201).json({ originalUrl, shortUrl, shortKey });
    } catch (error: any) {
      console.error("Error in UrlController.shortenUrl:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async redirectUrl(req: Request, res: Response): Promise<void> {
    const { shortKey } = req.params;

    try {
      const originalUrl = await UrlService.getOriginalUrl(shortKey);
      if (originalUrl) {
        res.redirect(originalUrl);
      } else {
        res.status(404).send("Short URL not found.");
      }
    } catch (error) {
      console.error("Error in UrlController.redirectUrl:", error);
      res.status(500).json({ error: "Failed to retrieve URL." });
    }
  }
}

export default new UrlController();