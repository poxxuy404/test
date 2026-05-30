import CryptoJS from "crypto-js";

const AES_KEY  = import.meta.env.VITE_AES_KEY  ?? "aes_kalit_32_belgi_uzun_bulsin!!";
const HMAC_KEY = import.meta.env.VITE_HMAC_KEY ?? "hmac_kalit_boshqa_bulsin_xavfsiz";

export function encryptResult(obj: unknown): string {
  const json = JSON.stringify(obj);

  // 1. Random IV yaratish
  const iv = CryptoJS.lib.WordArray.random(16);

  // 2. AES-256-CBC bilan shifrlash
  const encrypted = CryptoJS.AES.encrypt(json, CryptoJS.enc.Utf8.parse(AES_KEY), {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // 3. IV + cipher birlashtirib Base64 ga
  const payload = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);

  // 4. HMAC-SHA256 imzo (o'zgartirishni aniqlash uchun)
  const hmac = CryptoJS.HmacSHA256(payload, HMAC_KEY).toString();

  // 5. "hmac.payload" formatida qaytarish
  return `${hmac}.${payload}`;
}

export function decryptResult<T = unknown>(s: string): T {
  const parts = s.trim().split(".");
  if (parts.length !== 2) throw new Error("Noto'g'ri format");

  const [hmac, payload] = parts;

  // 1. HMAC tekshirish — o'zgartirilganmi?
  const expectedHmac = CryptoJS.HmacSHA256(payload, HMAC_KEY).toString();
  if (hmac !== expectedHmac) throw new Error("Ma'lumot buzilgan yoki soxtalashtirilgan!");

  // 2. Base64 dan WordArray ga
  const raw = CryptoJS.enc.Base64.parse(payload);

  // 3. IV ni ajratib olish (dastlabki 16 byte)
  const iv = CryptoJS.lib.WordArray.create(raw.words.slice(0, 4), 16);
  const ciphertext = CryptoJS.lib.WordArray.create(raw.words.slice(4), raw.sigBytes - 16);

  // 4. AES-256-CBC bilan ochish
  const decrypted = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({ ciphertext }),
    CryptoJS.enc.Utf8.parse(AES_KEY),
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  const json = decrypted.toString(CryptoJS.enc.Utf8);
  if (!json) throw new Error("Kalit noto'g'ri");

  return JSON.parse(json) as T;
}