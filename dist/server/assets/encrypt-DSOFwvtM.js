import CryptoJS from "crypto-js";
const AES_KEY = "aes_kalit_32_belgi_uzun_bulsin!!";
const HMAC_KEY = "hmac_kalit_boshqa_bulsin_xavfsiz";
function encryptResult(obj) {
  const json = JSON.stringify(obj);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(json, CryptoJS.enc.Utf8.parse(AES_KEY), {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const payload = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
  const hmac = CryptoJS.HmacSHA256(payload, HMAC_KEY).toString();
  return `${hmac}.${payload}`;
}
function decryptResult(s) {
  const parts = s.trim().split(".");
  if (parts.length !== 2) throw new Error("Noto'g'ri format");
  const [hmac, payload] = parts;
  const expectedHmac = CryptoJS.HmacSHA256(payload, HMAC_KEY).toString();
  if (hmac !== expectedHmac) throw new Error("Ma'lumot buzilgan yoki soxtalashtirilgan!");
  const raw = CryptoJS.enc.Base64.parse(payload);
  const iv = CryptoJS.lib.WordArray.create(raw.words.slice(0, 4), 16);
  const ciphertext = CryptoJS.lib.WordArray.create(raw.words.slice(4), raw.sigBytes - 16);
  const decrypted = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({ ciphertext }),
    CryptoJS.enc.Utf8.parse(AES_KEY),
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  const json = decrypted.toString(CryptoJS.enc.Utf8);
  if (!json) throw new Error("Kalit noto'g'ri");
  return JSON.parse(json);
}
export {
  decryptResult as d,
  encryptResult as e
};
