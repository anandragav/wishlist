export class ProductExtractor {
  static async extract(): Promise<{
    title: string;
    image: string;
    price: string;
    category: string;
    vendor: string;
    url: string;
  }> {
    const title = this.extractTitle();
    const image = this.extractImage();
    const price = this.extractPrice();
    const category = this.extractCategory();
    const vendor = this.extractVendor();
    const url = window.location.href;

    return {
      title,
      image,
      price,
      category,
      vendor,
      url
    };
  }

  private static extractTitle(): string {
    // Try common product title selectors
    const selectors = [
      'h1',
      '[data-testid="product-title"]',
      '.product-title',
      '#product-title'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element?.textContent) {
        return element.textContent.trim();
      }
    }

    return document.title;
  }

  private static extractImage(): string {
    // Try common product image selectors
    const selectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      '.product-image img',
      '#product-image img'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element instanceof HTMLImageElement) {
        return element.src;
      }
      if (element instanceof HTMLMetaElement) {
        return element.content;
      }
    }

    return '';
  }

  private static extractPrice(): string {
    // Try common price selectors
    const selectors = [
      '[data-testid="product-price"]',
      '.product-price',
      '#product-price',
      'meta[property="product:price:amount"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element?.textContent) {
        return element.textContent.trim();
      }
      if (element instanceof HTMLMetaElement) {
        return element.content;
      }
    }

    return '';
  }

  private static extractCategory(): string {
    // Try common category selectors
    const selectors = [
      '[data-testid="product-category"]',
      '.breadcrumb',
      'meta[property="product:category"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element?.textContent) {
        return element.textContent.trim();
      }
      if (element instanceof HTMLMetaElement) {
        return element.content;
      }
    }

    return '';
  }

  private static extractVendor(): string {
    // Try to extract vendor/store name
    const selectors = [
      'meta[property="og:site_name"]',
      'meta[name="author"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element instanceof HTMLMetaElement) {
        return element.content;
      }
    }

    return new URL(window.location.href).hostname;
  }
}