let user = "", userurl = "", key = "",password= "";
let save_user = false, save_url = false, save_password=false;

function saveText() {
  if (save_user == true) {
    user = document.getElementById("user-space").value;
    save_user = false;
    console.log("User has been saved!")
  } else if (save_url == true) {
    userurl = document.getElementById("url-space").value;
    save_url = false;
    console.log("URL has been saved!")
  } else if(save_password==true){
    password = document.getElementById("password-space").value;
    save_password = false;
  }
}

function createFile() {
  let content = user + "," + userurl + ";";
  let blob = new Blob([content], { type: "text/plain" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "details.txt";
  a.click();
  console.log("File has been added downloaded!")
  URL.revokeObjectURL(url);
}

function encrypting() {
  const msg = password; // arbitrary length of message in Uint8Array
  const key = key; // 16 bytes or 32 bytes key in Uint8Array
  const iv = ...; // 12 bytes IV in Uint8Array for AES-GCM mode
  aes.encrypt(msg, key, { name: 'AES-GCM', iv, additionalData, tagLength: 16 }).then((encrypted) => {
    // now you get an Uint8Array of encrypted message
  });
}

function decrypting(){

}

function generatePassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}
