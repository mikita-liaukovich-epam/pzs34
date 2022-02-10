var CryptoJS = require("crypto-js");

const key = 'dshj47vshuc37bt54oqc2378534b7tcq237nvthj783hu3tggh3';

export function encrypt(data) {
  const res = CryptoJS.AES.encrypt(data, key).toString();
  return res;
}

export function decrypt(data) {
  const res = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  return res;
}