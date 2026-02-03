// Profit Summary Component
class ProfitSummary extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = {
            revenue: 0,
            cost: 0,
            profit: 0,
            margin: 0,
            items: 0,
            breakdown: []
        };
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const lang = (localStorage.getItem('selectedLanguage') || 'en').toLowerCase();
        const t = (en, fr, ar) => (lang === 'fr' ? fr : lang === 'ar' ? ar : en);
        const locale = lang === 'fr' ? 'fr-FR' : lang === 'ar' ? 'ar' : 'en-US';
        const dateStr = new Date().toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .summary-card {
                    background: white;
                    border-radius: 1.25rem;
                    border: 2px solid #fde68a;
                    overflow: hidden;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
                
                .summary-header {
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                    color: white;
                    padding: 1.25rem;
                    text-align: center;
                }
                
                .summary-title {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                    opacity: 0.9;
                }
                
                .summary-date {
                    font-size: 0.75rem;
                    opacity: 0.8;
                }
                
                .summary-body {
                    padding: 1.25rem;
                }
                .metric-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.75rem;
                    margin-bottom: 1.25rem;
                }
                
                .metric {
                    text-align: center;
                    padding: 0.75rem;
                    background: #fafaf9;
                    border-radius: 0.75rem;
                    border: 1px solid #f5f5f4;
                }
                
                .metric-value {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1c1917;
                    margin-bottom: 0.125rem;
                }
                
                .metric-label {
                    font-size: 0.625rem;
                    color: #78716c;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
.metric.profit .metric-value {
                    color: #059669;
                }
                
                .metric.profit.negative .metric-value {
                    color: #dc2626;
                }
                .main-stat {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    border-radius: 0.75rem;
                    padding: 1.25rem;
                    text-align: center;
                    margin-bottom: 1.25rem;
                    border: 1px solid #fcd34d;
                }
                
                .main-stat-value {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #92400e;
                    line-height: 1;
                    margin-bottom: 0.375rem;
                }
                
                .main-stat-label {
                    font-size: 0.75rem;
                    color: #78350f;
                    font-weight: 600;
                }
                .breakdown {
                    border-top: 1px solid #e7e5e4;
                    padding-top: 0.75rem;
                }
                
                .breakdown-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #57534e;
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                }
                
                .breakdown-list {
                    max-height: 150px;
                    overflow-y: auto;
                }
                
                .breakdown-list::-webkit-scrollbar {
                    width: 4px;
                }
                
                .breakdown-list::-webkit-scrollbar-thumb {
                    background: #d6d3d1;
                    border-radius: 2px;
                }
                .breakdown-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.375rem 0;
                    font-size: 0.75rem;
                    border-bottom: 1px solid #f5f5f4;
                }
.breakdown-item:last-child {
                    border-bottom: none;
                }
                .breakdown-name {
                    color: #57534e;
                    font-weight: 500;
                }
                
                .breakdown-count {
                    background: #fef3c7;
                    color: #92400e;
                    padding: 0.0625rem 0.375rem;
                    border-radius: 9999px;
                    font-size: 0.625rem;
                    font-weight: 600;
                    margin-right: 0.375rem;
                }
                
                .breakdown-profit {
                    color: #059669;
                    font-weight: 600;
                }
                
                .empty-state {
                    text-align: center;
                    padding: 1.5rem;
                    color: #a8a29e;
                    font-size: 0.75rem;
                }
@keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                
                .updated {
                    animation: pulse 0.3s ease;
                }
            </style>
            
            <div class="summary-card">
                <div class="summary-header">
                    <div class="summary-title">${t("Today's Summary", "Résumé du jour", "ملخص اليوم")}</div>
                    <div class="summary-date">${dateStr}</div>
                </div>
                
                <div class="summary-body">
                    <div class="main-stat" id="main-profit">
                        <div class="main-stat-value">$${this.data.profit.toFixed(2)}</div>
                        <div class="main-stat-label">${t('Net Profit', 'Profit net', 'صافي الربح')}</div>
                    </div>
                    
                    <div class="metric-grid">
                        <div class="metric">
                            <div class="metric-value" id="revenue">$${this.data.revenue.toFixed(2)}</div>
                            <div class="metric-label">${t('Revenue', 'Chiffre d’affaires', 'الإيرادات')}</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value" id="cost">$${this.data.cost.toFixed(2)}</div>
                            <div class="metric-label">${t('Costs', 'Coûts', 'التكاليف')}</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value" id="margin">${this.data.margin}%</div>
                            <div class="metric-label">${t('Margin', 'Marge', 'هامش')}</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value" id="items">${this.data.items}</div>
                            <div class="metric-label">${t('Items Sold', 'Articles vendus', 'القطع المباعة')}</div>
                        </div>
                    </div>
                    
                    <div class="breakdown">
                        <div class="breakdown-title">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                            ${t('Top Products', 'Meilleurs produits', 'أفضل المنتجات')}
                        </div>
                        <div class="breakdown-list" id="breakdown-list">
                            ${this.renderBreakdown()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBreakdown() {
        if (this.data.breakdown.length === 0) {
            const lang = (localStorage.getItem('selectedLanguage') || 'en').toLowerCase();
            const t = (en, fr, ar) => (lang === 'fr' ? fr : lang === 'ar' ? ar : en);
            return `<div class="empty-state">${t('No sales yet today. Start selling some honey! 🍯', 'Aucune vente pour le moment. Commencez à vendre du miel ! 🍯', 'لا توجد مبيعات حتى الآن. ابدأ ببيع العسل! 🍯')}</div>`;
        }
        
        // Sort by profit descending
        const sorted = [...this.data.breakdown].sort((a, b) => b.profit - a.profit);

        const lang = (localStorage.getItem('selectedLanguage') || 'en').toLowerCase();
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
        const localizeName = (name) => {
            const entry = nameMap[name];
            if (!entry) return name;
            if (lang === 'fr') return entry.fr;
            if (lang === 'ar') return entry.ar;
            return name;
        };
        
        return sorted.map(item => `
            <div class="breakdown-item">
                <div style="display: flex; align-items: center;">
                    <span class="breakdown-count">${item.count}</span>
                    <span class="breakdown-name">${localizeName(item.name)}</span>
                </div>
                <span class="breakdown-profit">+$${item.profit.toFixed(2)}</span>
            </div>
        `).join('');
    }

    updateData(newData) {
        this.data = { ...this.data, ...newData };
        
        // Update DOM elements
        const mainProfit = this.shadowRoot.getElementById('main-profit');
        const revenue = this.shadowRoot.getElementById('revenue');
        const cost = this.shadowRoot.getElementById('cost');
        const margin = this.shadowRoot.getElementById('margin');
        const items = this.shadowRoot.getElementById('items');
        const breakdownList = this.shadowRoot.getElementById('breakdown-list');
        
        if (mainProfit) {
            mainProfit.querySelector('.main-stat-value').textContent = `$${this.data.profit.toFixed(2)}`;
            mainProfit.classList.remove('updated');
            void mainProfit.offsetWidth; // Trigger reflow
            mainProfit.classList.add('updated');
            
            // Color code profit
            if (this.data.profit < 0) {
                mainProfit.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                mainProfit.querySelector('.main-stat-value').style.color = '#dc2626';
                mainProfit.querySelector('.main-stat-label').style.color = '#991b1b';
            } else {
                mainProfit.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
                mainProfit.querySelector('.main-stat-value').style.color = '#92400e';
                mainProfit.querySelector('.main-stat-label').style.color = '#78350f';
            }
        }
        
        if (revenue) revenue.textContent = `$${this.data.revenue.toFixed(2)}`;
        if (cost) cost.textContent = `$${this.data.cost.toFixed(2)}`;
        if (margin) margin.textContent = `${this.data.margin}%`;
        if (items) items.textContent = this.data.items;
        if (breakdownList) breakdownList.innerHTML = this.renderBreakdown();
    }
}

customElements.define('profit-summary', ProfitSummary);