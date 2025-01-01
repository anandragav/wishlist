import { BookmarkManager } from './src/lib/bookmarkManager';

const WISHLIST_FOLDER_NAME = 'My Wishlist';
let wishlistFolderId = null;

// Initialize wishlist folder
async function initWishlistFolder() {
    const bookmarkManager = new BookmarkManager();
    wishlistFolderId = await bookmarkManager.createWishlistFolder(WISHLIST_FOLDER_NAME);
}

// Context menu setup
chrome.runtime.onInstalled.addListener(async () => {
    await initWishlistFolder();

    chrome.contextMenus.create({
        id: 'addToWishlist',
        title: 'Add to Wishlist',
        contexts: ['page', 'link', 'image']
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'addToWishlist' && tab?.id) {
        // Extract product information
        chrome.tabs.sendMessage(tab.id, { action: 'extractProduct' }, async (response) => {
            if (response.success && wishlistFolderId) {
                const bookmarkManager = new BookmarkManager();
                await bookmarkManager.addProduct(wishlistFolderId, response.product);
            }
        });
    }
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getWishlistFolder') {
        sendResponse({ folderId: wishlistFolderId });
    }
});