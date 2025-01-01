// Import product extractor functionality
import { ProductExtractor } from './src/lib/productExtractor';

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractProduct') {
        ProductExtractor.extract()
            .then(product => {
                sendResponse({ success: true, product });
            })
            .catch(error => {
                sendResponse({ success: false, error: error.message });
            });
        return true; // Required for async response
    }
});