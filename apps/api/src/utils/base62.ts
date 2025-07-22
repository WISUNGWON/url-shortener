const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BASE = ALPHABET.length; // 62

export function encode(num: number): string {
  if (num === 0) {
    return ALPHABET[0];
  }
  let encoded = "";
  while (num > 0) {
    encoded = ALPHABET[num % BASE] + encoded;
    num = Math.floor(num / BASE);
  }
  return encoded;
}

export const getRandomBase62Char = (): string => {
  const ALPHABET_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * ALPHABET_CHARS.length);
  return ALPHABET_CHARS[randomIndex];
};