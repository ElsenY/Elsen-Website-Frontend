import crypto from 'crypto';

/**
 * Encrypt text compatible with Java CryptoUtil AES/GCM
 */
export function encrypt(plainText: string, hexKey: string): string {
  const IV_LENGTH = 12;
  const TAG_LENGTH = 16;

  const key = Buffer.from(hexKey, 'hex');
  if (![16, 24, 32].includes(key.length)) {
    throw new Error('AES key must be 16, 24, or 32 bytes long');
  }

  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(
    `aes-${key.length * 8}-gcm`,
    key,
    iv,
    { authTagLength: TAG_LENGTH } as crypto.CipherGCMOptions
  ) as crypto.CipherGCM;

  const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const encryptedWithTag = Buffer.concat([encrypted, tag]);
  const finalBuffer = Buffer.concat([iv, encryptedWithTag]);

  return finalBuffer.toString('base64');
}

/**
 * Decrypt text compatible with Java CryptoUtil AES/GCM
 */
export function decrypt(cipherText: string, hexKey: string): string {
  const IV_LENGTH = 12;
  const TAG_LENGTH = 16;

  const key = Buffer.from(hexKey, 'hex');
  const decoded = Buffer.from(cipherText, 'base64');

  const iv = decoded.slice(0, IV_LENGTH);
  const encryptedWithTag = decoded.slice(IV_LENGTH);

  const tag = encryptedWithTag.slice(encryptedWithTag.length - TAG_LENGTH);
  const encrypted = encryptedWithTag.slice(0, encryptedWithTag.length - TAG_LENGTH);

  const decipher = crypto.createDecipheriv(
    `aes-${key.length * 8}-gcm`,
    key,
    iv,
    { authTagLength: TAG_LENGTH } as crypto.CipherGCMOptions
  ) as crypto.DecipherGCM;

  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return decrypted.toString('utf8');
}
