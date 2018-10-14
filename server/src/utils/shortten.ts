// from: https://github.com/delight-im/ShortURL/blob/master/JavaScript/ShortURL.js

const alphabet = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_';
const base = alphabet.length;

const encode = (num: number) => {
  let str = '';
  while (num > 0) {
    str = alphabet.charAt(num % base) + str;
    num = Math.floor(num / base);
  }
  return str;
};

const decode = (str: string) => {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num = num * base + alphabet.indexOf(str.charAt(i));
  }
  return num;
};

export { encode, decode };