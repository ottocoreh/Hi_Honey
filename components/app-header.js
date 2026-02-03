// App Header Component
class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const priceSet = (this.getAttribute('data-price-set') || '').toLowerCase();
        const isHistoryPage = window.location.pathname.includes('history.html') || window.location.href.includes('history.html');

        // Language handling (EN default, FR, AR with RTL support)
        const lang = (localStorage.getItem('selectedLanguage') || 'en').toLowerCase();
        if (lang === 'ar') {
            document.documentElement.lang = 'ar';
            document.documentElement.dir = 'rtl';
        } else if (lang === 'fr') {
            document.documentElement.lang = 'fr';
            document.documentElement.dir = 'ltr';
        } else {
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
        const t = (en, fr, ar) => (lang === 'fr' ? fr : lang === 'ar' ? ar : en);

        const isRetail = priceSet !== 'wholesale' && !isHistoryPage;
        const retailActive = isRetail ? ' active' : '';
        const wholesaleActive = (!isRetail && priceSet === 'wholesale' && !isHistoryPage) ? ' active' : '';
        const historyActive = isHistoryPage ? ' active' : '';

        const langEnActive = lang === 'en' ? ' lang-active' : '';
        const langFrActive = lang === 'fr' ? ' lang-active' : '';
        const langArActive = lang === 'ar' ? ' lang-active' : '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                header {
                    background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
                    border-bottom: 1px solid #fde68a;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    backdrop-filter: blur(10px);
                }
                .container {
                    max-width: 80rem;
                    margin: 0 auto;
                    padding: 0.75rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
.brand {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    color: inherit;
                }
                .logo-icon {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3);
                }
                
                .logo-icon svg {
                    width: 20px;
                    height: 20px;
                }
.brand-text {
                    display: flex;
                    flex-direction: column;
                }
                .brand-name {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: #92400e;
                    line-height: 1.2;
                }
                
                .brand-tagline {
                    font-size: 0.6875rem;
                    color: #78716c;
                    font-weight: 500;
                }
.nav-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                }
                
                .nav-link {
                    text-decoration: none;
                    color: #57534e;
                    font-weight: 500;
                    font-size: 0.875rem;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .nav-link:hover {
                    color: #d97706;
                }
                
                .nav-link.active {
                    color: #d97706;
                }
                .lang-switch {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.75rem;
                }
                .lang-btn {
                    border: 1px solid transparent;
                    padding: 0.15rem 0.45rem;
                    border-radius: 9999px;
                    background: transparent;
                    cursor: pointer;
                    color: #57534e;
                    font-weight: 500;
                }
                .lang-btn:hover {
                    border-color: #fde68a;
                    background: #fffbeb;
                }
                .lang-btn.lang-active {
                    border-color: #fbbf24;
                    background: #fef3c7;
                    color: #92400e;
                }
                .date-badge {
                    background: #fef3c7;
                    color: #92400e;
                    padding: 0.375rem 0.875rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    border: 1px solid #fde68a;
                }
                
                .date-badge svg {
                    width: 14px;
                    height: 14px;
                }
@media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .brand-name {
                        font-size: 1.1rem;
                    }
                }
            </style>
            
            <header>
                <div class="container">
                    <a href="price-set-selector.html" class="brand">
                        <div class="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 9V5"></path>
                                <path d="M12 19v-4"></path>
                                <path d="M9 12H5"></path>
                                <path d="M19 12h-4"></path>
                            </svg>
                        </div>
                        <div class="brand-text">
                            <span class="brand-name">Golden Hive</span>
                            <span class="brand-tagline">${t('Profit Calculator', 'Calculateur de profit', 'حاسبة الأرباح')}</span>
                        </div>
                    </a>
                    
                    <nav class="nav-links">
                        <a href="calculator-retail.html" class="nav-link${retailActive}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            ${t('Retail', 'Détail', 'تجزئة')}
                        </a>
                        <a href="calculator-wholesale.html" class="nav-link${wholesaleActive}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                            ${t('Wholesale', 'Gros', 'جملة')}
                        </a>
                        <a href="history.html" class="nav-link${historyActive}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${t('History', 'Historique', 'السجل')}
                        </a>
                    </nav>
                    
                    <div class="lang-switch">
                        <button class="lang-btn${langEnActive}" data-lang="en">EN</button>
                        <button class="lang-btn${langFrActive}" data-lang="fr">FR</button>
                        <button class="lang-btn${langArActive}" data-lang="ar">ع</button>
                    </div>
                    
                    <div class="date-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span id="current-date">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>
            </header>
        `;
    }

    setupEventListeners() {
        // Update date every minute
        setInterval(() => {
            const dateEl = this.shadowRoot.getElementById('current-date');
            if (dateEl) {
                dateEl.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        }, 60000);

        // Language switch buttons
        const langButtons = this.shadowRoot.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang') || 'en';
                localStorage.setItem('selectedLanguage', lang);
                window.location.reload();
            });
        });
    }
}

customElements.define('app-header', AppHeader);