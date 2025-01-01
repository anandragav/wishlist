export class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const product = JSON.parse(this.getAttribute('data-product') || '{}');
    
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.2s;
        }
        
        :host(:hover) {
          transform: translateY(-2px);
        }
        
        .image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .content {
          padding: 16px;
        }
        
        .title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        
        .price {
          font-size: 18px;
          color: #2563eb;
          font-weight: 600;
        }
        
        .vendor {
          font-size: 14px;
          color: #6b7280;
        }
      </style>
      
      <img class="image" src="${product.image}" alt="${product.title}">
      <div class="content">
        <h3 class="title">${product.title}</h3>
        <p class="price">${product.price}</p>
        <p class="vendor">${product.vendor}</p>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);