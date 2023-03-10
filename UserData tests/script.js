let userData = [];
let masterKey = "qqq";

// for the random password function
let randompassword = "";
let temprandpassword = "";

// for the change password function
let changeUser = {
  username: "",
  userurl: "",
};

// this object gets pushed into the userData array
let pushUser = {
  username: "",
  userurl: "",
  encryptedPassword: "",
  iv: null,
  salt: null
};

function push(pushUser) {
  userData.push(pushUser);
}

async function saveUser() {
  let temp = {};
  temp.masterkey = document.getElementById("masterKey-space").value;
  console.log("Master key has been saved!");

  temp.username = document.getElementById("user-space").value;
  console.log("User has been saved!");

  temp.userurl = document.getElementById("url-space").value;
  console.log("URL has been saved!");

  let passwordString = document.getElementById("password-space").value;
  console.log("Password has been saved!");
  
  temp.iv   = await window.crypto.getRandomValues(new Uint8Array(12));
  temp.salt = await window.crypto.getRandomValues(new Uint8Array(16));
  temp.encryptedPassword = await encryptMassage( passwordString, temp.iv, temp.salt);

  userData.push(temp);
  localStorage.setItem("userData", JSON.stringify(userData));
}

async function encryptMassage( passwordString, iv, salt){
  const password = (new TextEncoder()).encode(passwordString);
  const key = await getCryptoKey( await salt);
  encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, password);
  return encrypted;
}

async function decryptMassage( ensryptedPassword, iv, salt){
  const key = await getCryptoKey( await salt);
  let decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ensryptedPassword);
  let desryptedString = (new TextDecoder()).decode(decrypted);
  console.log( desryptedString);
}

window.onload = function () {
  try {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (Array.isArray(storedData)) {
      userData = storedData;
      document.getElementById("user-space").value = userData[0].username;
      document.getElementById("url-space").value = userData[0].userurl;
      document.getElementById("password-space").value = userData[0].password;
    }
  } catch (error) {
    console.error("Error retrieving user data from localStorage:", error);
  }
};

function createFile() {
  let content = userData.map(userData => `${userData.username}, ${userData.userurl}, ${userData.password};\n`).join("");
  let blob = new Blob([content], { type: "text/plain" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "details.txt";
  a.click();
  console.log("File has been downloaded!");
  URL.revokeObjectURL(url);
}

function generatePassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let randpassword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randpassword += characters.charAt(randomIndex);
  }
  password = randpassword;
  document.getElementById("password-output").value = randpassword;
  //document.getElementById("copy").style.display = "block";
}

function changePassword(username, userurl, newPassword) {
  userData.forEach(user => {
    if (user.username === username && user.userurl === userurl) {
      user.password = newPassword;
    }
  });
  localStorage.setItem("userData", JSON.stringify(userData));
  console.log("Password has been changed!");
}


function removeUser() {
  localStorage.removeItem("userData");
  document.getElementById("user-space").value = "";
  document.getElementById("url-space").value = "";
  document.getElementById("password-space").value = "";
  console.log("User data has been removed!");
}

function showUserData(){
  console.log( userData);
}

function showUser() {
  document.getElementById("keypass-space").value = masterKey;
  if (masterKey !== "" && masterKey === document.getElementById("masterKey-space").value) {
    userData.forEach(user => {
      console.log(`${user.username} - ${user.userurl} - ${decryptMassage( user.encryptedPassword, user.iv, user.salt)}`);
    });
  }
}

function copyToClipboard() {
  const text = document.getElementById("password-output").innerText;
  navigator.clipboard.writeText(text);
  console.log("Text copied to clipboard: " + text);
}

async function getCryptoKey( salt){
  const iterations = 100000;
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

  const keyDataArrBuff = (new TextEncoder()).encode( masterKey);

  const deliveryBitsKey = await crypto.subtle.importKey(keyDataFormat, keyDataArrBuff, keyDataAlgorithm, keyDataExtractable, keyDataUsage);
  const keyData = new Uint8Array(await crypto.subtle.deriveBits(
    deliceryBitsAlgorithm,
    deliveryBitsKey,
    keyDatalenght
  ))

  return await window.crypto.subtle.importKey(keyFormat, keyData, keyAlgorithm, keyExtractable, keyUsage);
}