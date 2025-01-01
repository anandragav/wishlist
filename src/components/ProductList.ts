import { Product } from '../lib/bookmarkManager';

export class ProductList extends HTMLElement {
  private products: Product[] = [];
  private view: 'grid' | 'list' = 'grid';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(products: Product[]) {
    this.products = products;
    this.render();
  }

  set viewMode(mode: 'grid' | 'list') {
    this.view = mode;
    this.render();
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
          padding: 24px;
        }
        
        .list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
        }
      </style>
      
      <div class="${this.view}">
        ${this.products.map(product => `
          <product-card data-product='${JSON.stringify(product)}'></product-card>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('product-list', ProductList);