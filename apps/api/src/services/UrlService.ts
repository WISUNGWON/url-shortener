// src/services/UrlService.ts
import UrlRepository from '../repositories/UrlRepository';
import { encode, getRandomBase62Char } from '../utils/base62';

class UrlService {
  private readonly MAX_RETRIES = 5;

  async createShortUrl(originalUrl: string): Promise<string> {
    for (let i = 0; i < this.MAX_RETRIES; i++) {
      try {
        const { id } = await UrlRepository.create(originalUrl);

        const base62EncodedId = encode(id);

        const randomPrefix = getRandomBase62Char();
        const randomSuffix = getRandomBase62Char();

        const shortKey = `${randomPrefix}${base62EncodedId}${randomSuffix}`;

        await UrlRepository.updateShortKey(id, shortKey);

        return shortKey;
      } catch (error: any) {
        // PostgreSQL Unique Constraint Violation 에러 (error.code '23505')
        if (error.code === '23505') {
          console.warn(`Short key collision detected, retrying... Attempt ${i + 1}`);
          continue;
        } else {
          console.error("Error in UrlService.createShortUrl:", error);
          throw new Error("Failed to create short URL due to an unexpected error.");
        }
      }
    }
    throw new Error("Failed to create unique short URL after multiple retries.");
  }

  async getOriginalUrl(shortKey: string): Promise<string | undefined> {
    const urlEntry = await UrlRepository.findByShortKey(shortKey);
    return urlEntry?.original_url;
  }
}

export default new UrlService();