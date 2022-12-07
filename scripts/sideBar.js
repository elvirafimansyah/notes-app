var sideBar = document.getElementById("mobile-nav");
var openSidebar = document.getElementById("openSideBar");
var closeSidebar = document.getElementById("closeSideBar");
var brandName = document.querySelector(".brand-mobile")
sideBar.style.transform = "translateX(-260px)";
function sidebarHandler(flag) {
  if (flag) {
    sideBar.style.transform = "translateX(0px)";
    openSidebar.classList.add("hidden");
    closeSidebar.classList.remove("hidden");
  } else {
    sideBar.style.transform = "translateX(-260px)";
    closeSidebar.classList.add("hidden");
    openSidebar.classList.remove("hidden");
  }
}

// Copy Function
document.addEventListener("DOMContentLoaded", () => {
  const alertCopy = document.getElementById("toast-success");
  hljs.highlightAll();

  const copyBtn = document.getElementById("copy-button");
  const bulletCode = document.querySelector(".bullet-list")
  const text = bulletCode.innerText;
    
  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alertCopy.classList.remove("hidden");
      setTimeout(() => {
        alertCopy.classList.toggle('hidden');
      }, 2500);
    })
  }
  
  copyBtn.addEventListener("click", () => {
    copyText(text)
  })
  /*======== Bulleted List =======*/
})


