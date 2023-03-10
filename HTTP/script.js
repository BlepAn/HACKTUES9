
let userData = {
  user: "",
  userurl: "",
  password: ""
};
let masterkey = "";
let randpassword = "";
let password = "";

let changeUser = {
  user: "",
  userurl: "",
}
let save_user = false, save_url = false, save_password = false;

function saveUser() {
  if (save_user == true) {
    userData.user = document.getElementById("user-space").value;
    save_user = false;
    console.log("User has been saved!")
  } else if (save_url == true) {
    userData.userurl = document.getElementById("url-space").value;
    save_url = false;
    console.log("URL has been saved!")
  } else if (save_password == true) {
    userData.password = document.getElementById("password-space").value;
    save_password = false;
    console.log("Password has been saved!")
  }
  localStorage.setItem("userData", JSON.stringify(userData));
}

window.onload = function () {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    userData = storedData;
    document.getElementById("user-space").value = userData.user;
    document.getElementById("url-space").value = userData.userurl;
    document.getElementById("password-space").value = userData.password;
  }
};


function generatePassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let randpassword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randpassword += characters.charAt(randomIndex);
  }
  password = randpassword;
  document.getElementById("pasword-output").innerHTML=randpassword;
  document.getElementById("copy").style="display:show";
}


function changePassword() {
  let new_password = document.getElementById("new-password-space").value;
  document.getElementById("password-space").value = new_password;
  userData.password = new_password;
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

function copyToClipboard() {
  const text = document.getElementById("pasword-output").innerText;
  navigator.clipboard.writeText(text);
  console.log("Text copied to clipboard: " + text);
}

function changeText(id) {
  let x = document.getElementById(id);
  console.log(x.type)  
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
