export interface Product {
  title: string;
  url: string;
  image: string;
  price: string;
  category: string;
  vendor: string;
}

export class BookmarkManager {
  async createWishlistFolder(folderName: string): Promise<string> {
    const bookmarkBar = '1'; // Chrome's bookmark bar ID
    
    // Check if folder already exists
    const existing = await this.findBookmarkFolder(folderName);
    if (existing) return existing.id;

    // Create new folder
    const folder = await chrome.bookmarks.create({
      parentId: bookmarkBar,
      title: folderName
    });

    return folder.id;
  }

  async findBookmarkFolder(folderName: string) {
    const bookmarks = await chrome.bookmarks.search({ title: folderName });
    return bookmarks.find(b => b.url === undefined);
  }

  async addProduct(folderId: string, product: Product) {
    const metadata = {
      image: product.image,
      price: product.price,
      category: product.category,
      vendor: product.vendor
    };

    return chrome.bookmarks.create({
      parentId: folderId,
      title: product.title,
      url: product.url,
      // Store additional metadata in Chrome storage
      // since bookmarks only support title and URL
    }).then(bookmark => {
      return chrome.storage.sync.set({
        [`product_${bookmark.id}`]: metadata
      });
    });
  }

  async getProducts(folderId: string): Promise<Product[]> {
    const bookmarks = await chrome.bookmarks.getChildren(folderId);
    const products: Product[] = [];

    for (const bookmark of bookmarks) {
      const metadata = await chrome.storage.sync.get(`product_${bookmark.id}`);
      if (metadata[`product_${bookmark.id}`]) {
        products.push({
          title: bookmark.title,
          url: bookmark.url || '',
          ...metadata[`product_${bookmark.id}`]
        });
      }
    }

    return products;
  }
}