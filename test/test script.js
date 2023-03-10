async function importSecretKey( masterKeyString, passwordString) {
  const iterations = 100000;
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const deliceryBitsAlgorithm = { name: "PBKDF2", salt: salt, iterations: iterations, hash: { name: "SHA-256" } };

  const masterKey = new TextEncoder().encode( masterKeyString);
  const keyDataAlgorithm = { name: "PBKDF2" };
  const keyDataUsage = ["deriveBits"];
  const keyDataExtractable = false;
  const keyDataFormat = "raw";
  const deliveryBitsKey = await crypto.subtle.importKey( keyDataFormat, masterKey, keyDataAlgorithm, keyDataExtractable, keyDataUsage);
  
  const keyDatalenght = 256;
  const keyData = new Uint8Array(await crypto.subtle.deriveBits(
    deliceryBitsAlgorithm,
    deliveryBitsKey,
    keyDatalenght
  ))

  const keyFormat = "raw";
  const keyExtractable = false;
  const keyUsage = ["encrypt", "decrypt"];
  const keyAlgorithm = "AES-GCM";

  const key = await window.crypto.subtle.importKey(
    keyFormat,
    keyData,
    keyAlgorithm,
    keyExtractable,
    keyUsage
  );
  
  console.log(key);

  // Use the key to encrypt the password
  const password  = new TextEncoder().encode( passwordString);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, password);
  console.log(encrypted);
}  

async function importSecretKey() {
  // Generate the key
  const key = await window.crypto.subtle.generateKey(keyAlgorithm, true, keyUsage);
  console.log(key);

  // Convert the key to a raw format
  const rawKey = await window.crypto.subtle.exportKey("raw", key);

  // Use the key to encrypt the password
  const password = new TextEncoder().encode("my super secret password");
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, password);
  console.log(encrypted);

  // Import the raw key back into a CryptoKey object
  const importedKey = await window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, ["encrypt", "decrypt"]);
  console.log(importedKey);
}
