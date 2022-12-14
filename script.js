const continer = document.getElementById("container");
const display = `
 <div class="wrapper" style=" 
 max-width: 500px;
 background: #fff;
 padding: 20px 25px 15px;
 box-shadow: 0 15px 40px rgba(0,0,0,0.12);">
<header>
  <h1 style =" font-size: 27px;
  font-weight: 500;">
  File Downloader
  </h1>
  <p style="margin-top: 5px;
  font-size: 18px;
  color: #474747;">
  Paste url of image, video, or pdf to download. This tool is made with vanilla javascript.
  </p>
</header>
<form action="/">
  <input type="url" placeholder="Paste file url" required style="width: 100%;
  height: 60px;
  outline: none;
  padding: 0 17px;
  font-size: 19px;
  border-radius: 5px;
  border: 1px solid #b3b2b2;
  transition: 0.1s ease;">
  <button style=" width: 100%;
  border: none;
  opacity: 0.7;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  margin-top: 20px;
  padding: 15px 0;
  border-radius: 5px;
  pointer-events: none;
  background: red;
  transition: opacity 0.15s ease;">Download File</button>
</form>
</div>
`;
continer.innerHTML = display;

const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
});

async function fetchFile(url) {
  try {
    const res = await fetch(url);
    const file = await res.blob();
    let tempUrl = URL.createObjectURL(file);

    const aTag = document.createElement("a");
    aTag.href = tempUrl;
    aTag.download = url.replace(/^.*[\\\/]/, "");
    console.log(aTag.download);
    document.body.appendChild(aTag);
    aTag.click();
    downloadBtn.innerText = "Download File";
    URL.revokeObjectURL(tempUrl);
    aTag.remove();
  } catch (error) {
    alert("Failed to download file!");
    downloadBtn.innerText = "Download File";
  }
}
