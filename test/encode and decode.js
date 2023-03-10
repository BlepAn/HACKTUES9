const rawKey = window.crypto.getRandomValues(new Uint8Array(16));
let iv = null;
let key = null;
let exported = null;
let password = "", save_enc = false;
let jumble   = "", save_dec = false;

function importSecretKey() {
  key = window.crypto.subtle.importKey("raw", rawKey, "AES-GCM", true, [ "encrypt", "decrypt"]);
}

function makeIv(){ 
  iv = window.crypto.getRandomValues(new Uint8Array(12)); // new Uint8Array(16).buffer
}

function saveText(){
  if( save_enc == true){
    password = document.getElementById( "enc-space").value;
    save_enc = false;
    console.log("password is saved");
  }else{
    jumble = document.getElementById( "dec-space").value;
    save_dec = false;
    console.log("jumble is saved");
  }
}

  function encryptMessage() {
    if( password == ''){
      console.log("Nothing to encode");
    }else{
      if( iv == null) makeIv();
      if( key == null) importSecretKey();
      let encrypted = window.crypto.subtle.encrypt( { name: "AES-GCM", iv: iv }, key, password )
      console.log("password will now be " + encrypted);
    }
  }

  function decryptMessage() {
    if( jumble == ""){
      console.log("Nothing to decode");
    }else{
      if( iv == null) makeIv();
      if( key == null) importSecretKey();
      let decrypted = window.crypto.subtle.decrypt( { name: "AES-GCM", iv: iv }, key, jumble );
      console.log("jumble was actually " + decrypted);
    }
  }
  