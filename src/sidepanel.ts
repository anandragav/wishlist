import { BookmarkManager } from './lib/bookmarkManager';
import './components/ProductCard';
import './components/ProductList';

let wishlistFolderId: string | null = null;

// Get wishlist folder ID
chrome.runtime.sendMessage({ action: 'getWishlistFolder' }, async (response) => {
  wishlistFolderId = response.folderId;
  if (wishlistFolderId) {
    await loadProducts();
  }
});

async function loadProducts() {
  if (!wishlistFolderId) return;
  
  const bookmarkManager = new BookmarkManager();
  const products = await bookmarkManager.getProducts(wishlistFolderId);
  
  const productList = document.querySelector('product-list');
  if (productList) {
    productList.data = products;
  }
}

// View controls
document.getElementById('gridView')?.addEventListener('click', () => {
  document.querySelector('product-list')?.viewMode = 'grid';
  document.getElementById('gridView')?.classList.add('active');
  document.getElementById('listView')?.classList.remove('active');
});

document.getElementById('listView')?.addEventListener('click', () => {
  document.querySelector('product-list')?.viewMode = 'list';
  document.getElementById('listView')?.classList.add('active');
  document.getElementById('gridView')?.classList.remove('active');
});