import CryptoJS from 'crypto-js';

const SECRET_KEY = 'My Secret Passphrase';

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(text: string): string {
  return CryptoJS.AES.decrypt(text, SECRET_KEY).toString(CryptoJS.enc.Utf8);
}
