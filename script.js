let userData = [];
let masterKey = "";
let keyGuess = "";
let randPassword = "";
let password = "";

let changeUser = {
  user: "",
  userurl: "",
};

let pushUser = {
  user: "",
  userurl: "",
  password: "",
};

let saveUserField = "";

function saveUser() {
  if (saveUserField === "user") {
    pushUser.user = document.getElementById("user-space").value;
    console.log("User has been saved!");
  } else if (saveUserField === "userurl") {
    pushUser.userurl = document.getElementById("url-space").value;
    console.log("URL has been saved!");
  } else if (saveUserField === "password") {
    pushUser.password = document.getElementById("password-space").value;
    console.log("Password has been saved!");
  }
  if (saveUserField) {
    userData.push(pushUser);
    localStorage.setItem("userData", JSON.stringify(userData));
    saveUserField = "";
  }
}

window.onload = function () {
  try {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (Array.isArray(storedData)) {
      userData = storedData;
      document.getElementById("user-space").value = userData.user;
      document.getElementById("url-space").value = userData.userurl;
      document.getElementById("password-space").value = userData.password;
    }
  } catch (error) {
    console.error("Error retrieving user data from localStorage:", error);
  }
};

function push(pushUser) {
  userData.push(pushUser);
}

function createFile() {
  let content = userData.map(user => `${user.user}, ${user.userurl};\n`).join("");
  let blob = new Blob([content], { type: "text/plain" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "details.txt";
  a.click();
  console.log("File has been downloaded!");
  URL.revokeObjectURL(url);
}

function encrypting() {}

function decrypting() {}


function changePassword() {
  let newPassword = document.getElementById("new-password-space").value;
  document.getElementById("password-space").value = newPassword;
  userData.forEach(user => {
    user.password = newPassword;
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

function showUser() {
  document.getElementById("keypass-space").value = keyGuess;
  if (keyGuess == masterKey) {
    for (let i = 0; i < users.length; i++) {
      console.log(users[i].name + " is " + users[i].age + " years old");
    }
  }

}

function copyToClipboard() {
  const text = document.getElementById("pasword-output").innerText;
  navigator.clipboard.writeText(text);
  console.log("Text copied to clipboard: " + text);
}
