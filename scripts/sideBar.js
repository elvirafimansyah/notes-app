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