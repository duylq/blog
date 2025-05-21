
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'rcbo';
}

async function loadProducts() {
  const category = getCategoryFromURL();
  try {
    const response = await fetch(`./data/${category}.json`);
    const products = await response.json();
    renderProducts(products);
    sendHeightToParent();
  } catch (error) {
    document.body.innerHTML = `<p style="padding:16px;color:red;">Không tìm thấy danh mục sản phẩm: <b>${category}</b></p>`;
  }
}

function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(p => {
    const el = document.createElement("div");
    el.className = "product-card";
    el.innerHTML = `
      <img class="product-image" src="${p.image}" alt="${p.title}">
      <div class="product-info">
        <div class="product-title">${p.title}</div>
        <div class="product-rating">${p.rating}</div>
        <div class="product-price">
          <div class="original-price">${p.originalPrice}</div>
          <div class="discounted-price">${p.discountedPrice}</div>
        </div>
        <a href="${p.link}" class="buy-button" target="_blank">Mua ngay trên Shopee</a>
      </div>
    `;
    container.appendChild(el);
  });
}

function sendHeightToParent() {
  const height = document.body.scrollHeight;
  parent.postMessage({ type: "setIframeHeight", height: height }, "*");
}

window.addEventListener("load", loadProducts);
window.addEventListener("resize", sendHeightToParent);
