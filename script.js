// Golden Hive Profit Tracker - Main Application Logic

// Product Data Structure
const honeyProducts = [
    {
        id: 1,
        name: "Royal Honey",
        description: "Raw, unfiltered wildflower blend",
        image: "http://static.photos/nature/640x360/1",
        variants: [
            { weight: "250g", cost: 3.50, price: 6.99, unit: "jar" }
        ]
    },
    {
        id: 2,
        name: "Honeycomb Honey",
        description: "Sweet, mild clover blossom",
        image: "http://static.photos/nature/640x360/2",
        variants: [
            { weight: "250g", cost: 5.50, price: 11.99, unit: "jar" }
        ]
    },
    {
        id: 3,
        name: "Jujube Honey",
        description: "Premium medicinal grade",
        image: "http://static.photos/nature/640x360/3",
        variants: [
            { weight: "125g", cost: 8.00, price: 15.99, unit: "jar" },
            { weight: "250g", cost: 15.00, price: 29.99, unit: "jar" },
            { weight: "500g", cost: 28.00, price: 54.99, unit: "jar" }
        ]
    },
    {
        id: 4,
        name: "Watercress Honey",
        description: "Light, floral, slow to crystallize",
        image: "http://static.photos/nature/640x360/4",
        variants: [
            { weight: "125g", cost: 4.00, price: 7.99, unit: "jar" },
            { weight: "250g", cost: 7.00, price: 14.99, unit: "jar" },
            { weight: "500g", cost: 13.00, price: 26.99, unit: "jar" }
        ]
    },
    {
        id: 5,
        name: "Eucalyptus Honey",
        description: "Dark, robust, full-bodied",
        image: "http://static.photos/nature/640x360/5",
        variants: [
            { weight: "125g", cost: 3.80, price: 7.49, unit: "jar" },
            { weight: "250g", cost: 6.50, price: 13.99, unit: "jar" },
            { weight: "500g", cost: 12.00, price: 24.99, unit: "jar" }
        ]
    },
    {
        id: 6,
        name: "Mountain Honey",
        description: "Citrus notes, fragrant",
        image: "http://static.photos/nature/640x360/6",
        variants: [
            { weight: "125g", cost: 3.60, price: 7.29, unit: "jar" },
            { weight: "250g", cost: 6.20, price: 13.49, unit: "jar" },
            { weight: "500g", cost: 11.50, price: 23.99, unit: "jar" }
        ]
    },
    {
        id: 7,
        name: "Orange Blossom Honey",
        description: "Herbal, aromatic infusion",
        image: "http://static.photos/nature/640x360/7",
        variants: [
            { weight: "125g", cost: 4.20, price: 8.49, unit: "jar" },
            { weight: "250g", cost: 7.50, price: 16.99, unit: "jar" },
            { weight: "500g", cost: 14.00, price: 29.99, unit: "jar" }
        ]
    },
    {
        id: 8,
        name: "Thistle Honey",
        description: "Menthol, medicinal properties",
        image: "http://static.photos/nature/640x360/8",
        variants: [
            { weight: "125g", cost: 3.90, price: 7.79, unit: "jar" },
            { weight: "250g", cost: 6.80, price: 14.49, unit: "jar" },
            { weight: "500g", cost: 12.50, price: 25.99, unit: "jar" }
        ]
    },
    {
        id: 9,
        name: "Blue Thistle Honey",
        description: "Gelatinous, strong flavored",
        image: "http://static.photos/nature/640x360/9",
        variants: [
            { weight: "125g", cost: 4.50, price: 8.99, unit: "jar" },
            { weight: "250g", cost: 8.00, price: 17.99, unit: "jar" },
            { weight: "500g", cost: 15.00, price: 32.99, unit: "jar" }
        ]
    },
    {
        id: 10,
        name: "Euphorbia Honey",
        description: "Rare, delicate, white honey",
        image: "http://static.photos/nature/640x360/10",
        variants: [
            { weight: "125g", cost: 4.80, price: 9.49, unit: "jar" },
            { weight: "250g", cost: 8.50, price: 18.99, unit: "jar" },
            { weight: "500g", cost: 16.00, price: 34.99, unit: "jar" }
        ]
    },
    {
        id: 11,
        name: "Pollen",
        description: "Raw comb, unprocessed",
        image: "http://static.photos/nature/640x360/11",
        variants: [
            { weight: "60g", cost: 4.00, price: 8.99, unit: "piece" },
            { weight: "125g", cost: 7.50, price: 15.99, unit: "piece" },
            { weight: "250g", cost: 14.00, price: 28.99, unit: "piece" }
        ]
    },
    {
        id: 12,
        name: "Propolis",
        description: "Portable single-serve tubes",
        image: "http://static.photos/nature/640x360/12",
        variants: [
            { weight: "10g", cost: 0.25, price: 0.99, unit: "stick" }
        ]
    }
];

// Apply selected price set (retail/wholesale) from PRICE_SETS so calculator is preloaded
function applyPriceSet() {
    const set = (localStorage.getItem('selectedPriceSet') || 'retail').toLowerCase();
    if (typeof PRICE_SETS === 'undefined' || !PRICE_SETS[set]) return;
    const priceList = PRICE_SETS[set];
    honeyProducts.forEach(product => {
        const priceEntry = priceList.find(p => p.name === product.name);
        if (!priceEntry) return;
        product.variants.forEach(variant => {
            const match = priceEntry.variants.find(v => v.weight === variant.weight);
            if (match) {
                variant.cost = match.cost;
                variant.price = match.price;
                if (match.unit) variant.unit = match.unit;
            }
        });
    });
}
applyPriceSet();

// State Management
let salesData = {};
let currentDate = new Date().toLocaleDateString();

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    loadSavedData();
    updateSummary();
});

function initializeProducts() {
    const grid = document.getElementById('products-grid');
    
    honeyProducts.forEach(product => {
        const card = document.createElement('honey-product');
        card.setAttribute('product-data', JSON.stringify(product));
        card.setAttribute('id', `product-${product.id}`);
        grid.appendChild(card);
        
        // Initialize sales data structure
        salesData[product.id] = {};
        product.variants.forEach((variant, index) => {
            salesData[product.id][index] = {
                quantity: 0,
                cost: variant.cost,
                price: variant.price
            };
        });
    });
    
    // Add event listeners for product updates
    document.addEventListener('product-updated', handleProductUpdate);
}

function handleProductUpdate(e) {
    const { productId, variantIndex, quantity, cost, price } = e.detail;
    
    if (!salesData[productId]) salesData[productId] = {};
    salesData[productId][variantIndex] = {
        quantity: parseInt(quantity) || 0,
        cost: parseFloat(cost) || 0,
        price: parseFloat(price) || 0
    };
    
    updateSummary();
    saveData();
}

function updateSummary() {
    let totalRevenue = 0;
    let totalCost = 0;
    let totalItems = 0;
    let productBreakdown = [];

    Object.keys(salesData).forEach(productId => {
        const product = honeyProducts.find(p => p.id === parseInt(productId));
        let productRevenue = 0;
        let productCost = 0;
        let productCount = 0;

        Object.keys(salesData[productId]).forEach(variantIndex => {
            const data = salesData[productId][variantIndex];
            if (data.quantity > 0) {
                const revenue = data.quantity * data.price;
                const cost = data.quantity * data.cost;
                productRevenue += revenue;
                productCost += cost;
                productCount += data.quantity;
            }
        });

        if (productCount > 0) {
            totalRevenue += productRevenue;
            totalCost += productCost;
            totalItems += productCount;
            productBreakdown.push({
                name: product.name,
                count: productCount,
                profit: productRevenue - productCost
            });
        }
    });

    const totalProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

    const summaryPanel = document.getElementById('summary-panel');
    if (summaryPanel) {
        summaryPanel.updateData({
            revenue: totalRevenue,
            cost: totalCost,
            profit: totalProfit,
            margin: profitMargin,
            items: totalItems,
            breakdown: productBreakdown
        });
    }
}

function getSummaryTotals() {
    let totalRevenue = 0, totalCost = 0, totalItems = 0;
    Object.keys(salesData).forEach(productId => {
        const product = honeyProducts.find(p => p.id === parseInt(productId));
        Object.keys(salesData[productId]).forEach(variantIndex => {
            const data = salesData[productId][variantIndex];
            if (data.quantity > 0) {
                totalRevenue += data.quantity * data.price;
                totalCost += data.quantity * data.cost;
                totalItems += data.quantity;
            }
        });
    });
    return { revenue: totalRevenue, cost: totalCost, profit: totalRevenue - totalCost, items: totalItems };
}

function getStorageKey(suffix) {
    const set = (localStorage.getItem('selectedPriceSet') || 'retail').toLowerCase();
    return 'honeySales' + suffix + '_' + (set === 'wholesale' ? 'wholesale' : 'retail');
}

const EXPORT_HISTORY_KEY = 'goldenHiveExportHistory';
const EXPORT_HISTORY_MAX = 200;

function appendExportHistory(entry) {
    let history = [];
    try {
        const raw = localStorage.getItem(EXPORT_HISTORY_KEY);
        if (raw) history = JSON.parse(raw);
    } catch (e) {}
    if (!Array.isArray(history)) history = [];
    history.unshift(entry);
    if (history.length > EXPORT_HISTORY_MAX) history.length = EXPORT_HISTORY_MAX;
    localStorage.setItem(EXPORT_HISTORY_KEY, JSON.stringify(history));
}

function saveData() {
    localStorage.setItem(getStorageKey('Data'), JSON.stringify(salesData));
    localStorage.setItem(getStorageKey('Date'), currentDate);
}

function loadSavedData() {
    const saved = localStorage.getItem(getStorageKey('Data'));
    const savedDate = localStorage.getItem(getStorageKey('Date'));
    
    if (saved && savedDate === currentDate) {
        salesData = JSON.parse(saved);
        
        // Update all product cards with saved data
        Object.keys(salesData).forEach(productId => {
            const card = document.getElementById(`product-${productId}`);
            if (card && card.loadData) {
                card.loadData(salesData[productId]);
            }
        });
    }
}

function resetAll() {
    if (confirm('Are you sure you want to reset all sales data for today?')) {
        salesData = {};
        honeyProducts.forEach(product => {
            salesData[product.id] = {};
            product.variants.forEach((variant, index) => {
                salesData[product.id][index] = {
                    quantity: 0,
                    cost: variant.cost,
                    price: variant.price
                };
            });
            
            const card = document.getElementById(`product-${product.id}`);
            if (card && card.reset) {
                card.reset();
            }
        });
        
        updateSummary();
        saveData();
    }
}

function exportData() {
    let csv = 'Product,Weight,Quantity,Cost Price,Selling Price,Profit\n';
    
    Object.keys(salesData).forEach(productId => {
        const product = honeyProducts.find(p => p.id === parseInt(productId));
        Object.keys(salesData[productId]).forEach(variantIndex => {
            const data = salesData[productId][variantIndex];
            if (data.quantity > 0) {
                const variant = product.variants[variantIndex];
                const profit = (data.price - data.cost) * data.quantity;
                csv += `${product.name},${variant.weight},${data.quantity},${data.cost},${data.price},${profit.toFixed(2)}\n`;
            }
        });
    });
    
    const set = (localStorage.getItem('selectedPriceSet') || 'retail').toLowerCase();
    const priceSetLabel = set === 'wholesale' ? 'wholesale' : 'retail';
    const filename = `honey-sales-${priceSetLabel}-${currentDate}.csv`;
    const totals = getSummaryTotals();
    const now = new Date();
    appendExportHistory({
        id: now.getTime().toString(36) + Math.random().toString(36).slice(2),
        timestamp: now.getTime(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        priceSet: priceSetLabel,
        revenue: totals.revenue,
        cost: totals.cost,
        profit: totals.profit,
        items: totals.items,
        filename: filename
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function printReport() {
    window.print();
}

// Service Worker for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Simple offline capability could be added here
    });
}