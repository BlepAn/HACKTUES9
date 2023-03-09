let user = "", userurl = "", master_key= "";
let save_user=false,save_url=false;

function saveText(){
  if(save_user==true){
  user = document.getElementById("user-space").value;
  save_user=false;
  console.log("User has been saved!")
}else if(save_url==true){
   userurl = document.getElementById("url-space").value;
   save_url=false;
   console.log("URL has been saved!")
  }
}

function createFile() {
  let content = user + "\n" + userurl;
  let blob = new Blob([content], { type: "text/plain" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "message.txt";
  a.click();
  console.log("File has been added downloaded!")
  URL.revokeObjectURL(url);
}