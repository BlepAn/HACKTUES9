let user = "", userurl = "", master_key= "", password = "";
let save_user=false,save_url=false, save_pass = false;
let get_password = false, make_password = false, change_password = false, add_password = false;

function saveText(){
  if(save_user==true){
    user = document.getElementById("user-space").value;
    save_user=false;
    console.log("User has been saved!")
  }else if(save_url==true){
    userurl = document.getElementById("url-space").value;
    save_url=false;
    console.log("URL has been saved!")
  }else if(save_pass==true){
    password = document.getElementById("pass-space").value;
    save_pass=false;
    console.log("Password has been saved!") 
  }
}

function Random_password(){
  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/";
  for( let i = 0; i < 15; i++){
    password = password + alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  //createFile();
  //return;
}

function createFile() {
  let content = user + "," + userurl + "," + password;
  let blob = new Blob([content], { type: "text/plain" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "message.txt";
  a.click();
  console.log("File has been added downloaded!");
  URL.revokeObjectURL(url);
  return;
}

function Random_password(){
  let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/";
  for( let i = 0; i < 15; i++){
    password = password + alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  console.log("password is" + password);
  //createFile();
  //return;
}

function Add_to_File(){
  if( Find_in_file == true){
    console.log("ERROR!");
  }else{
    password = document.getElementById("pass-space").value;
    save_pass=false;
    console.log("Pass has been saved!");
    createFile();
  }
  return;
}

function Find_in_file(){

}

function Change_in_File(){
  if( Find_in_file == false){
    console.log("ERROR!");
  }else{

  }
}

function encryptMessage() {
  const key = window.crypto.subtle.generateKey( { name: "AES-GCM", length: 256, }, true, ["encrypt", "decrypt"]);
  const messageBox = document.querySelector("#aes-gcm-message");
  let message = messageBox.value;
  let enc = new TextEncoder();
  const encode = enc.encode(message);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const password =  window.crypto.subtle.encrypt( { name: "AES-GCM", iv: iv },key,encoded);
  console.log("password is ", password);
}