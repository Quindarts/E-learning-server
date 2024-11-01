import Crypto from "crypto-js";

function randomTokenString(length: number) {
  return Crypto.lib.WordArray.random(length)
    .toString(Crypto.enc.Hex)
    .slice(0, length);
}
//AES
function encryptedPassword(password: string) {
  return Crypto.AES.encrypt(
    password,
    `${process.env.PASSWORD_SECRET_KEY}`,
  ).toString();
}

function decryptedPassword(decryptPassword: string) {
  return Crypto.AES.decrypt(
    decryptPassword,
    `${process.env.PASSWORD_SECRET_KEY}`,
  ).toString(Crypto.enc.Utf8);
}
// to generate:  nodemon  src/helper/crypto.ts
// console.log("🚀 ~ TOKEN_SECRET_KEY():", randomTokenString(32))
// console.log("🚀 ~ REFRESH_TOKEN_SECRET_KEY():", randomTokenString(32))
// console.log("🚀 ~ PASSWORD_SECRET_KEY():", randomTokenString(32))
// console.log("🚀 ~ encryptedPassword('admin123456Aa@'):", encryptedPassword('admin123456Aa@'))

export default {
  randomTokenString,
  encryptedPassword,
  decryptedPassword,
};
