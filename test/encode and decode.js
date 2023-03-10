//const rawKey = window.crypto.getRandomValues(new Uint8Array(16));
let passwordString = "", save_enc = false;
let masterKeyString = "", save_master = false;
let iv;
let encode;

function saveText() {
  if (save_enc == true) {
    passwordString = document.getElementById("enc-space").value;
    save_enc = false;
    console.log("password is saved");
  }else if( save_master == true){
    masterKeyString = document.getElementById("master-space").value;
    save_master = false;
    console.log("MasterKey is saved");
  }
}

const iterations = 100000;
const salt = window.crypto.getRandomValues(new Uint8Array(16));
const deliceryBitsAlgorithm = { name: "PBKDF2", salt: salt, iterations: iterations, hash: { name: "SHA-256" } };

const keyDataAlgorithm = { name: "PBKDF2" };
const keyDataUsage = ["deriveBits"];
const keyDataExtractable = false;
const keyDataFormat = "raw";

const keyDatalenght = 256;

const keyFormat = "raw";
const keyExtractable = false;
const keyUsage = ["encrypt", "decrypt"];
const keyAlgorithm = "AES-GCM";

async function getCryptoKey(){
  const password = (new TextEncoder()).encode(passwordString);
  const masterKey = (new TextEncoder()).encode(masterKeyString);

  const deliveryBitsKey = await crypto.subtle.importKey( keyDataFormat, masterKey, keyDataAlgorithm, keyDataExtractable, keyDataUsage);
  const keyData = new Uint8Array(await crypto.subtle.deriveBits(
    deliceryBitsAlgorithm,
    deliveryBitsKey,
    keyDatalenght
  ))

  return await window.crypto.subtle.importKey(keyFormat, keyData, keyAlgorithm, keyExtractable, keyUsage);
}

async function encryptMassage() {
  const password = (new TextEncoder()).encode(passwordString);
  const key = await getCryptoKey();

  console.log(key);

  iv = window.crypto.getRandomValues(new Uint8Array(12));
  encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, password);
  console.log(encrypted);
}

async function decryptMassage(){
  const key = await getCryptoKey();

  console.log(key);

  let decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
  const decodeString = (new TextDecoder()).decode( decrypted);
  console.log( decodeString);
}
