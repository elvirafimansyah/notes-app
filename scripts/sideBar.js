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
  hljs.highlightAll();
  const alertCopy = document.getElementById("toast-success");
  function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alertCopy.classList.remove("hidden");
      setTimeout(() => {
        alertCopy.classList.toggle('hidden');
      }, 2500);
    })
  }
  // Bullet Code 
  const copyBullet = document.getElementById("copy-bullet");
  const bulletCode = document.querySelector(".bullet-list")
  const bulletText = bulletCode.innerText;
  copyBullet.addEventListener("click", () => {
    copyText(bulletText)
  })
  // Italic
  const copyItalic = document.getElementById("copy-italic")
  const italicCode = document.querySelector(".italic-code"); 
  const italicText = italicCode.innerText;
  copyItalic.addEventListener("click", () => {
    copyText(italicText);
  });
  // Bold
  const copyBold = document.getElementById("copy-bold");  
  const boldCode = document.querySelector(".bold-code");
  const boldText = boldCode.innerText;
  copyBold.addEventListener("click", () => {
    copyText(boldText);
  });
  // Underline
  const copyUnder = document.getElementById("copy-underline");
  const underlineCode = document.querySelector(".underline-code");
  const underlineText = underlineCode.innerText;
  copyUnder.addEventListener("click", () => {
    copyText(underlineText)
  });
  // Alignment Center
  const copyCenter = document.getElementById("copy-center");
  const centerCode = document.querySelector(".center-code");
  const centerText = centerCode.innerText;
  copyCenter.addEventListener("click", () => {
    copyText(centerText)
  });
  // Alignment Right
  const copyRight = document.getElementById("copy-right");
  const rightCode = document.querySelector(".right-code");
  const rightText = rightCode.innerText;
  copyRight.addEventListener("click", () => {
    copyText(rightText)
  });
  // Image
  const copyImage = document.getElementById("copy-image");
  const imageCode = document.querySelector(".image-code");
  const imageText = imageCode.innerText;
  copyImage.addEventListener("click", () => {
    copyText(imageText);
  });
})



