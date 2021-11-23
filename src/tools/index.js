/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2020-01-07 17:10:08
 * @version $Id$
 */
// import cryptoJs from 'https://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.min.js';
// import Vue from 'vue';
import CryptoJS from 'crypto-js';
import store from '../store';

const keyOne = store.state.keyOne;
// const keySize = 128;

export default {
  // 
  // 加密函數
  encryption(word) {
    let key = CryptoJS.enc.Utf8.parse(keyOne);
    // let sb = CryptoJS.enc;
    // debugger
    let enc = '';

    if (typeof word === 'string') {
      enc = CryptoJS.AES.encrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
    } else if(typeof word === 'object') {
      let data = JSON.stringify(word)
      enc = CryptoJS.AES.encrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
    }
    let encResult = enc.ciphertext.toString();
    return encResult;
  },
  //解密
  jsonDecrypt(word) {
    var key = CryptoJS.enc.Utf8.parse(keyOne); //要和加密的密钥一样
    var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(
      srcs,
      key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    let decrypted = decrypt.toString(CryptoJS.enc.Utf8);
    // let decryptedStr = decrypted.replace('+!-@','\"').replace('1991nbc','{').replace('1222nbc','}');
    return JSON.parse(decrypted);
  },

  Decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse(keyOne); //要和加密的密钥一样
    var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(
      srcs,
      key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    let decrypted = decrypt.toString(CryptoJS.enc.Utf8);
    let decryptedStr = decrypted;
    return JSON.parse(decryptedStr);
  }
  // 加密函數
  // encryption(word) {
  //   let key = CryptoJS.enc.Utf8.parse(keyOne);
  //   // let sb = CryptoJS.enc;
  //   var srcs = CryptoJS.enc.Utf8.parse(word);  
  //   var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  //   // debugger  
  //   return encrypted.ciphertext.toString();  
  // }
}
