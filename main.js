function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category') || 'rcbo'; // Mặc định là 'rcbo'
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
