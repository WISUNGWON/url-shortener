// src/services/UrlService.ts
import UrlRepository from '../repositories/UrlRepository';
import { encode, getRandomBase62Char } from '../utils/base62';

class UrlService {
  private readonly MAX_RETRIES = 5;

  async createShortUrl(originalUrl: string): Promise<string> {
    for (let i = 0; i < this.MAX_RETRIES; i++) {
      try {
        // 1. URL 정보 삽입 (ID 자동 생성)
        const newId = await UrlRepository.create(originalUrl);

        // 2. Base62 인코딩
        const base62EncodedId = encode(newId);

        // 3. 2자리의 랜덤 문자열 추가 (앞뒤 1자리씩)
        const randomPrefix = getRandomBase62Char();
        const randomSuffix = getRandomBase62Char();

        // 최종 단축키 조합
        const shortKey = `${randomPrefix}${base62EncodedId}${randomSuffix}`;

        // 4. 생성된 ID에 단축키 업데이트 (Unique Index가 여기서 작동)
        await UrlRepository.updateShortKey(newId, shortKey);

        return shortKey; // 성공적으로 생성된 단축키 반환
      } catch (error: any) {
        // PostgreSQL Unique Constraint Violation 에러 (error.code '23505')
        if (error.code === '23505') {
          console.warn(`Short key collision detected, retrying... Attempt ${i + 1}`);
          // 재시도 루프의 다음 반복에서 새로운 ID를 할당받도록 시도
          // (주의: 실패한 original_url만 있는 레코드는 DB에 남을 수 있음)
          continue; // 재시도
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