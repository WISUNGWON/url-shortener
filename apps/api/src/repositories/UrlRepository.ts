import db from '../db';

interface ShortUrl {
  id?: number;
  original_url: string;
  short_key?: string;
  created_at?: Date;
}

class UrlRepository {
  private tableName = 'urls';

  async create(originalUrl: string): Promise<{ id: number }> {
    const [id] = await db(this.tableName)
      .insert({ original_url: originalUrl })
      .returning('id');
    return id
  }

  async updateShortKey(id: number, shortKey: string): Promise<void> {
    await db(this.tableName)
      .where({ id })
      .update({ short_key: shortKey });
  }

  async findByShortKey(shortKey: string): Promise<ShortUrl | undefined> {
    return db(this.tableName)
      .select('original_url', 'short_key')
      .where({ short_key: shortKey })
      .first();
  }
}

export default new UrlRepository();