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
  