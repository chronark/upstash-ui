import { AES, enc } from "crypto-js";

export class Encryptor {
  private encryptionKey: string;

  constructor(encryptionKey: string) {
    this.encryptionKey = encryptionKey;
  }

  public encrypt(data: string): string {
    return AES.encrypt(data, this.encryptionKey).toString();
  }
  public decrypt(encrypted: string): string {
    return AES.decrypt(encrypted, this.encryptionKey).toString(enc.Utf8);
  }
}
