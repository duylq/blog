// js/auto-resize.js
function sendHeightToParent() {
  const height = document.body.scrollHeight;
  parent.postMessage({ type: "setIframeHeight", height: height }, "https://blog.marshome.io.vn");
}
window.addEventListener("load", sendHeightToParent);
window.addEventListener("resize", sendHeightToParent);
