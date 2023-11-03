import { logOut } from "./controllers/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  if (navbarBurgers.length > 0) {
    navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = document.getElementById(el.dataset.target);
        el.classList.toggle("is-active");
        target.classList.toggle("is-active");
      });
    });
  }
});

const logOutEl = document.getElementById("navbar-log-out");
if (logOutEl) {
  logOutEl.addEventListener("click", () => {
    logOut().then(() => {
      document.location = "/";
    });
  });
}
function setRem() {
  let designSize = 1920; // 设计图尺寸

  let html = document.documentElement;

  let wW = html.clientWidth;
  let rem;
  if (wW > 640) {
    rem = (wW * 100) / designSize;
  } else {
    rem = (wW * 30) / wW;
  }

  document.documentElement.style.fontSize = rem + "px";
}

window.addEventListener("load", setRem);
window.addEventListener("resize", setRem);