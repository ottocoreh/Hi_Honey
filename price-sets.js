// Golden Hive - Price sets (retail vs wholesale). Used by prices page and calculator.
const PRICE_SETS = {
    retail: [
        { name: "Royal Honey", variants: [{ weight: "250g", cost: 3.50, price: 6.99, unit: "jar" }] },
        { name: "Honeycomb Honey", variants: [{ weight: "250g", cost: 5.50, price: 11.99, unit: "jar" }] },
        { name: "Jujube Honey", variants: [
            { weight: "125g", cost: 8.00, price: 15.99, unit: "jar" },
            { weight: "250g", cost: 15.00, price: 29.99, unit: "jar" },
            { weight: "500g", cost: 28.00, price: 54.99, unit: "jar" }
        ]},
        { name: "Watercress Honey", variants: [
            { weight: "125g", cost: 4.00, price: 7.99, unit: "jar" },
            { weight: "250g", cost: 7.00, price: 14.99, unit: "jar" },
            { weight: "500g", cost: 13.00, price: 26.99, unit: "jar" }
        ]},
        { name: "Eucalyptus Honey", variants: [
            { weight: "125g", cost: 3.80, price: 7.49, unit: "jar" },
            { weight: "250g", cost: 6.50, price: 13.99, unit: "jar" },
            { weight: "500g", cost: 12.00, price: 24.99, unit: "jar" }
        ]},
        { name: "Mountain Honey", variants: [
            { weight: "125g", cost: 3.60, price: 7.29, unit: "jar" },
            { weight: "250g", cost: 6.20, price: 13.49, unit: "jar" },
            { weight: "500g", cost: 11.50, price: 23.99, unit: "jar" }
        ]},
        { name: "Orange Blossom Honey", variants: [
            { weight: "125g", cost: 4.20, price: 8.49, unit: "jar" },
            { weight: "250g", cost: 7.50, price: 16.99, unit: "jar" },
            { weight: "500g", cost: 14.00, price: 29.99, unit: "jar" }
        ]},
        { name: "Thistle Honey", variants: [
            { weight: "125g", cost: 3.90, price: 7.79, unit: "jar" },
            { weight: "250g", cost: 6.80, price: 14.49, unit: "jar" },
            { weight: "500g", cost: 12.50, price: 25.99, unit: "jar" }
        ]},
        { name: "Blue Thistle Honey", variants: [
            { weight: "125g", cost: 4.50, price: 8.99, unit: "jar" },
            { weight: "250g", cost: 8.00, price: 17.99, unit: "jar" },
            { weight: "500g", cost: 15.00, price: 32.99, unit: "jar" }
        ]},
        { name: "Euphorbia Honey", variants: [
            { weight: "125g", cost: 4.80, price: 9.49, unit: "jar" },
            { weight: "250g", cost: 8.50, price: 18.99, unit: "jar" },
            { weight: "500g", cost: 16.00, price: 34.99, unit: "jar" }
        ]},
        { name: "Pollen", variants: [
            { weight: "60g", cost: 4.00, price: 8.99, unit: "piece" },
            { weight: "125g", cost: 7.50, price: 15.99, unit: "piece" },
            { weight: "250g", cost: 14.00, price: 28.99, unit: "piece" }
        ]},
        { name: "Propolis", variants: [{ weight: "10g", cost: 0.25, price: 0.99, unit: "stick" }] }
    ],
    wholesale: [
        { name: "Royal Honey", variants: [{ weight: "250g", cost: 2075, price: 2652, unit: "jar" }] },
        { name: "Honeycomb Honey", variants: [{ weight: "250g", cost: 825, price: 1136, unit: "jar" }] },
        { name: "Jujube Honey", variants: [
            { weight: "125g", cost: 600, price: 833, unit: "jar" },
            { weight: "250g", cost: 1200, price: 1515, unit: "jar" },
            { weight: "500g", cost: 2400, price: 2803, unit: "jar" }
        ]},
        { name: "Watercress Honey", variants: [
            { weight: "125g", cost:  437.5, price: 644, unit: "jar" },
            { weight: "250g", cost: 875, price: 1250, unit: "jar" },
            { weight: "500g", cost: 1750, price: 2348, unit: "jar" }
        ]},
        { name: "Eucalyptus Honey", variants: [
            { weight: "125g", cost: 437.5, price: 606, unit: "jar" },
            { weight: "250g", cost: 875, price: 1174, unit: "jar" },
            { weight: "500g", cost: 1750, price: 2121, unit: "jar" }
        ]},
        { name: "Mountain Honey", variants: [
            { weight: "125g", cost: 3.60, price: 606, unit: "jar" },
            { weight: "250g", cost: 6.20, price: 1174, unit: "jar" },
            { weight: "500g", cost: 11.50, price: 2121, unit: "jar" }
        ]},
        { name: "Orange Blossom Honey", variants: [
            { weight: "125g", cost: 325, price: 568, unit: "jar" },
            { weight: "250g", cost: 650, price: 1098, unit: "jar" },
            { weight: "500g", cost: 1300, price: 1970, unit: "jar" }
        ]},
        { name: "Thistle Honey", variants: [
            { weight: "125g", cost: 362.5, price: 568, unit: "jar" },
            { weight: "250g", cost: 725, price: 1098, unit: "jar" },
            { weight: "500g", cost: 1450, price: 1970, unit: "jar" }
        ]},
        { name: "Blue Thistle Honey", variants: [
            { weight: "125g", cost: 362.5, price: 568, unit: "jar" },
            { weight: "250g", cost: 725, price: 1098, unit: "jar" },
            { weight: "500g", cost: 1450, price: 1970, unit: "jar" }
        ]},
        { name: "Euphorbia Honey", variants: [
            { weight: "125g", cost: 362.5, price: 568, unit: "jar" },
            { weight: "250g", cost: 725, price: 1098, unit: "jar" },
            { weight: "500g", cost: 1450, price: 1970, unit: "jar" }
        ]},
        { name: "Pollen", variants: [
            { weight: "60g", cost: 200, price: 455, unit: "piece" },
            { weight: "125g", cost: 400, price: 757, unit: "piece" },
            { weight: "250g", cost: 800, price: 1364, unit: "piece" }
        ]},
        { name: "Propolis", variants: [{ weight: "10g", cost: 400, price: 606, unit: "stick" }] }
    ]
};
