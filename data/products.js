export const products = [
    {
        id: 'pr001',
        image: 'product1.jpg',
        discountPriceCents: 995,
        markedPriceCents: 1500,
        name: 'Ranee Biryani - 5 Kg',
        category: 'Groceries'
    },
    {
        id: 'pr002',
        image: 'product2.jpg',
        discountPriceCents: 4795,
        markedPriceCents: 7000,
        name: 'VILLAON V20SE 5.0" 4GB RAM+32GB Storage 8MP Camera-3000mAh Dual Sim',
        category: 'Electronics'
    },
    {
        id: 'pr003',
        image: 'product3.jpg',
        discountPriceCents: 2499,
        markedPriceCents: 3000,
        name: 'TCL 43S5400 S Series, 43" Full HD Smart TV - Black (1YR WRTY)',
        category: 'Electronics'
    },
    {
        id: 'pr004',
        image: 'product4.jpg',
        discountPriceCents: 7900,
        markedPriceCents: 14400,
        name: 'Martell Martell VSOP - 700ml',
        category: 'Beverages'
    },
    {
        id: 'pr005',
        image: 'product5.jpg',
        discountPriceCents: 5499,
        markedPriceCents: 6400,
        name: 'Luxury Golden Watch - Women',
        category: 'Accessories'
    },
    {
        id: 'pr006',
        image: 'product6.jpg',
        discountPriceCents: 4995,
        markedPriceCents: 7000,
        name: 'Garnier Even & Matte Vitamin C Sunscreen SPF30 50ml',
        category: 'Health & Beauty'
    },
    {
        id: 'pr007',
        image: 'product7.jpg',
        discountPriceCents: 12999,
        markedPriceCents: 18000,
        name: 'Apple AirPods Pro (2nd Generation)',
        category: 'Electronics'
    },
    {
        id: 'pr008',
        image: 'product8.jpg',
        discountPriceCents: 13995,
        markedPriceCents: 20000,
        name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
        category: 'Electronics'
    },
    {
        id: 'pr009',
        image: 'product9.jpg',
        discountPriceCents: 3495,
        markedPriceCents: 5000,
        name: 'Nike Air Max Shoes - Men',
        category: 'Footwear'
    },
    {
        id: 'pr010',
        image: 'product10.jpg',
        discountPriceCents: 2195,
        markedPriceCents: 3000,
        name: 'Adidas Backpack - 25L',
        category: 'Bags & Accessories'
    },
    {
        id: 'pr011',
        image: 'product11.jpg',
        discountPriceCents: 995,
        markedPriceCents: 1500,
        name: 'Organic Green Tea - 50 Bags',
        category: 'Groceries'
    },
    {
        id: 'pr012',
        image: 'product12.jpg',
        discountPriceCents: 3995,
        markedPriceCents: 6000,
        name: 'Casio Digital Watch - Unisex',
        category: 'Accessories'
    }
];
class Product {
    constructor(id, image, discountPriceCents, markedPriceCents, name, category) {
        this.id = id;
        this.image = image;
        this.discountPriceCents = discountPriceCents;
        this.markedPriceCents = markedPriceCents;
        this.name = name;
        this.category = category;
    }
}

// Grouping products by category
export const groupedByCategory = products.reduce((acc, product) => {
    const ProductInstance = new Product(product.id, product.image, product.discountPriceCents, product.markedPriceCents, product.name, product.category);
    if (!acc[product.category]) {
        acc[product.category] = [];
    }
    acc[product.category].push(ProductInstance);
    return acc;
}, {});

