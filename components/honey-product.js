// Honey Product Card Component
class HoneyProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.productData = null;
        this.currentVariant = 0;
        this.quantities = {};
        this.prices = {};
    }

    connectedCallback() {
        const data = this.getAttribute('product-data');
        if (data) {
            this.productData = JSON.parse(data);
            this.initializeData();
            this.render();
            this.setupEventListeners();
        }
    }

    initializeData() {
        this.productData.variants.forEach((variant, index) => {
            this.quantities[index] = 0;
            this.prices[index] = {
                cost: variant.cost,
                price: variant.price
            };
        });
    }
    render() {
        const product = this.productData;
        const hasMultipleVariants = product.variants.length > 1;

        const lang = (localStorage.getItem('selectedLanguage') || 'en').toLowerCase();
        const t = (en, fr, ar) => (lang === 'fr' ? fr : lang === 'ar' ? ar : en);
        const nameMap = {
            'Royal Honey': { fr: 'Miel royal', ar: 'عسل ملكي' },
            'Honeycomb Honey': { fr: 'Miel en rayon', ar: 'عسل بشهدة النحل' },
            'Jujube Honey': { fr: 'Miel de jujubier', ar: 'عسل السدر' },
            'Watercress Honey': { fr: 'Miel de cresson', ar: 'عسل الجرجير' },
            'Eucalyptus Honey': { fr: 'Miel d’eucalyptus', ar: 'عسل الكاليتوس' },
            'Mountain Honey': { fr: 'Miel de montagne', ar: 'عسل الجبلي' },
            'Orange Blossom Honey': { fr: 'Miel de fleur d’oranger', ar: 'عسل أزهار البرتقال' },
            'Thistle Honey': { fr: 'Miel de chardon', ar: 'عسل الشوكيات' },
            'Blue Thistle Honey': { fr: 'Miel de chardon bleu', ar: 'عسل المرار الشوكي' },
            'Euphorbia Honey': { fr: 'Miel d’euphorbe', ar: 'عسل اللبينة' },
            'Pollen': { fr: 'Pollen', ar: 'حبوب لقاح' },
            'Propolis': { fr: 'Propolis', ar: 'العكبر' }
        };
        const localizedName = (() => {
            const entry = nameMap[product.name];
            if (!entry) return product.name;
            if (lang === 'fr') return entry.fr;
            if (lang === 'ar') return entry.ar;
            return product.name;
        })();
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .card {
                    background: white;
                    border-radius: 0.75rem;
                    border: 1px solid #e7e5e4;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                
                .card:hover {
                    box-shadow: 0 8px 12px -3px rgba(0, 0, 0, 0.1);
                    border-color: #fcd34d;
                    transform: translateY(-2px);
                }
                
                .card-header {
                    position: relative;
                    height: 100px;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                
                .card:hover .card-image {
                    transform: scale(1.05);
                }
                .card-badge {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(4px);
                    padding: 0.125rem 0.5rem;
                    border-radius: 9999px;
                    font-size: 0.625rem;
                    font-weight: 600;
                    color: #92400e;
                    border: 1px solid #fde68a;
                }
                
                .card-body {
                    padding: 0.875rem;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                
                .product-title {
                    font-size: 0.9375rem;
                    font-weight: 700;
                    color: #1c1917;
                    margin-bottom: 0.125rem;
                    line-height: 1.3;
                }
                
                .product-desc {
                    font-size: 0.75rem;
                    color: #78716c;
                    margin-bottom: 0.75rem;
                    line-height: 1.4;
                }
                .variant-tabs {
                    display: flex;
                    gap: 0.375rem;
                    margin-bottom: 0.75rem;
                    flex-wrap: wrap;
                }
                
                .variant-btn {
                    padding: 0.25rem 0.625rem;
                    border: 1px solid #e7e5e4;
                    background: white;
                    border-radius: 0.375rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: #57534e;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .variant-btn:hover {
                    border-color: #fbbf24;
                    color: #d97706;
                }
                
                .variant-btn.active {
                    background: #f59e0b;
                    color: white;
                    border-color: #f59e0b;
                }
                .price-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }
                
                .price-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.125rem;
                }
                
                .price-label {
                    font-size: 0.625rem;
                    font-weight: 600;
                    color: #78716c;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .price-input {
                    padding: 0.375rem;
                    border: 1px solid #e7e5e4;
                    border-radius: 0.375rem;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    color: #1c1917;
                    width: 100%;
                    transition: all 0.2s;
                }
                .price-input:focus {
                    outline: none;
                    border-color: #f59e0b;
                    ring: 2px;
                    ring-color: #fef3c7;
                }
                
                .cost-input {
                    color: #78716c;
                }
                
                .selling-input {
                    color: #059669;
                }
                .quantity-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.75rem;
                    padding-top: 0.75rem;
                    border-top: 1px solid #f5f5f4;
                    margin-top: auto;
                }
                
                .quantity-label {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #57534e;
                }
                
                .quantity-control {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                }
                
                .qty-btn {
                    width: 26px;
                    height: 26px;
                    border: 1px solid #e7e5e4;
                    background: white;
                    border-radius: 0.375rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: #57534e;
                }
                
                .qty-btn:hover {
                    background: #f5f5f4;
                    border-color: #d6d3d1;
                }
                
                .qty-btn:active {
                    transform: scale(0.95);
                }
                
                .qty-btn svg {
                    width: 14px;
                    height: 14px;
                }
                
                .qty-input {
                    width: 40px;
                    text-align: center;
                    border: 1px solid #e7e5e4;
                    border-radius: 0.375rem;
                    padding: 0.25rem;
                    font-weight: 600;
                    color: #1c1917;
                    font-size: 0.8125rem;
                }
                .profit-display {
                    margin-top: 0.5rem;
                    padding: 0.5rem;
                    background: #f0fdf4;
                    border-radius: 0.375rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                }
                
                .profit-label {
                    color: #57534e;
                    font-weight: 500;
                }
                
                .profit-value {
                    font-weight: 700;
                    color: #059669;
                }
                
                .profit-value.negative {
                    color: #dc2626;
                }
                
                .unit-label {
                    font-size: 0.625rem;
                    color: #a8a29e;
                    margin-left: 0.25rem;
                }
                
                @media (max-width: 640px) {
                    .price-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <div class="card">
                <div class="card-header">
                    <img src="${product.image}" alt="${localizedName}" class="card-image">
                    <span class="card-badge">${product.variants.length} ${t('sizes', 'tailles', 'أحجام')}</span>
                </div>
                
                <div class="card-body">
                    <h3 class="product-title">${localizedName}</h3>
                    <p class="product-desc">${product.description}</p>
                    
                    ${hasMultipleVariants ? `
                        <div class="variant-tabs">
                            ${product.variants.map((v, i) => `
                                <button class="variant-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                                    ${v.weight}
                                </button>
                            `).join('')}
                        </div>
                    ` : `
                        <div style="margin-bottom: 0.75rem; font-size: 0.75rem; color: #78716c; font-weight: 500;">
                            ${product.variants[0].weight} <span class="unit-label">(${product.variants[0].unit})</span>
                        </div>
                    `}
                    <div class="price-grid">
                        <div class="price-input-group">
                            <label class="price-label">${t('Cost Price ($)', 'Prix de revient ($)', 'سعر التكلفة ($)')}</label>
                            <input type="number" step="0.01" class="price-input cost-input" 
                                   value="${this.prices[0].cost.toFixed(2)}" 
                                   data-type="cost" data-index="0">
                        </div>
                        <div class="price-input-group">
                            <label class="price-label">${t('Selling Price ($)', 'Prix de vente ($)', 'سعر البيع ($)')}</label>
                            <input type="number" step="0.01" class="price-input selling-input" 
                                   value="${this.prices[0].price.toFixed(2)}" 
                                   data-type="price" data-index="0">
                        </div>
                    </div>
                    
                    <div class="quantity-section">
                        <span class="quantity-label">${t('Quantity Sold', 'Quantité vendue', 'الكمية المباعة')}</span>
                        <div class="quantity-control">
                            <button class="qty-btn minus">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <input type="number" class="qty-input" value="0" min="0">
                            <button class="qty-btn plus">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="profit-display" id="profit-0">
                        <span class="profit-label">${t('Profit per item:', 'Profit par article :', 'الربح لكل قطعة:')}</span>
                        <span class="profit-value">${(this.prices[0].price - this.prices[0].cost).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }
setupEventListeners() {
        // Variant tabs
        const variantBtns = this.shadowRoot.querySelectorAll('.variant-btn');
        variantBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.switchVariant(index);
            });
        });

        // Quantity buttons - use event delegation to handle dynamic index changes
        this.shadowRoot.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = this.currentVariant; // Always use current variant
                const input = this.shadowRoot.querySelector('.qty-input');
                let val = parseInt(input.value) || 0;
                
                if (e.currentTarget.classList.contains('minus')) {
                    val = Math.max(0, val - 1);
                } else {
                    val = val + 1;
                }
                
                input.value = val;
                this.quantities[index] = val;
                this.emitUpdate(index);
            });
        });

        // Quantity inputs
        this.shadowRoot.querySelector('.qty-input').addEventListener('change', (e) => {
            const index = this.currentVariant; // Always use current variant
            const val = Math.max(0, parseInt(e.target.value) || 0);
            e.target.value = val;
            this.quantities[index] = val;
            this.emitUpdate(index);
        });

        // Price inputs
        this.shadowRoot.querySelectorAll('.price-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = this.currentVariant; // Always use current variant
                const type = e.target.dataset.type;
                const val = parseFloat(e.target.value) || 0;
                this.prices[index][type] = val;
                this.updateProfitDisplay(index);
                this.emitUpdate(index);
            });
        });
    }
switchVariant(index) {
        this.currentVariant = index;
        
        // Update tab styles
        this.shadowRoot.querySelectorAll('.variant-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
        
        // Update inputs to show current variant data
        const costInput = this.shadowRoot.querySelector('.cost-input');
        const priceInput = this.shadowRoot.querySelector('.selling-input');
        const qtyInput = this.shadowRoot.querySelector('.qty-input');
        
        costInput.value = this.prices[index].cost.toFixed(2);
        priceInput.value = this.prices[index].price.toFixed(2);
        qtyInput.value = this.quantities[index];
        
        // Update data indices on all interactive elements
        costInput.dataset.index = index;
        priceInput.dataset.index = index;
        qtyInput.dataset.index = index;
        
        // Update quantity buttons to target the correct variant
        const minusBtn = this.shadowRoot.querySelector('.qty-btn.minus');
        const plusBtn = this.shadowRoot.querySelector('.qty-btn.plus');
        if (minusBtn) minusBtn.dataset.index = index;
        if (plusBtn) plusBtn.dataset.index = index;
        
        // Update profit display ID and value
        const profitDisplay = this.shadowRoot.querySelector('.profit-display');
        if (profitDisplay) {
            profitDisplay.id = `profit-${index}`;
        }
        
        this.updateProfitDisplay(index);
    }
updateQuantity(index, value) {
        this.quantities[index] = value;
        this.emitUpdate(index);
    }

    updateProfitDisplay(index) {
        const profit = this.prices[index].price - this.prices[index].cost;
        const profitEl = this.shadowRoot.getElementById(`profit-${index}`) || this.shadowRoot.querySelector('.profit-display');
        const valueEl = profitEl.querySelector('.profit-value');
        
        valueEl.textContent = `$${profit.toFixed(2)}`;
        valueEl.classList.toggle('negative', profit < 0);
        
        // Animate
        valueEl.style.animation = 'none';
        setTimeout(() => {
            valueEl.style.animation = 'pulse 0.3s ease';
        }, 10);
    }

    emitUpdate(index) {
        const event = new CustomEvent('product-updated', {
            detail: {
                productId: this.productData.id,
                variantIndex: index,
                quantity: this.quantities[index],
                cost: this.prices[index].cost,
                price: this.prices[index].price
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
    loadData(data) {
        Object.keys(data).forEach(index => {
            const idx = parseInt(index);
            this.quantities[idx] = data[index].quantity;
            this.prices[idx].cost = data[index].cost;
            this.prices[idx].price = data[index].price;
            
            // Update UI if this is current variant
            if (idx === this.currentVariant) {
                const qtyInput = this.shadowRoot.querySelector('.qty-input');
                const costInput = this.shadowRoot.querySelector('.cost-input');
                const priceInput = this.shadowRoot.querySelector('.selling-input');
                
                if (qtyInput) qtyInput.value = data[index].quantity;
                if (costInput) costInput.value = data[index].cost.toFixed(2);
                if (priceInput) priceInput.value = data[index].price.toFixed(2);
                
                this.updateProfitDisplay(idx);
            }
        });
        // Update summary after loading data
        const allQuantities = Object.values(this.quantities);
        if (allQuantities.some(q => q > 0)) {
            this.emitUpdate(this.currentVariant);
        }
    }
    reset() {
        this.productData.variants.forEach((_, index) => {
            this.quantities[index] = 0;
            this.prices[index].cost = this.productData.variants[index].cost;
            this.prices[index].price = this.productData.variants[index].price;
        });
        
        // Reset UI to first variant
        this.switchVariant(0);
        
        // Reset inputs
        const qtyInput = this.shadowRoot.querySelector('.qty-input');
        const costInput = this.shadowRoot.querySelector('.cost-input');
        const priceInput = this.shadowRoot.querySelector('.selling-input');
        
        if (qtyInput) qtyInput.value = 0;
        if (costInput) costInput.value = this.prices[0].cost.toFixed(2);
        if (priceInput) priceInput.value = this.prices[0].price.toFixed(2);
        
        this.updateProfitDisplay(0);
        
        // Emit update to clear all variant data from summary
        this.emitUpdate(0);
    }
}

customElements.define('honey-product', HoneyProduct);