export const mockProducts = [
  {
    id: "REF-2025-FASH-00123",
    title: "Premium Cotton T-Shirt",
    description: "Comfortable and stylish cotton t-shirt perfect for everyday wear.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    variants: [
      { size: "S", color: "White", stock: 50, price: 29.99 },
      { size: "M", color: "White", stock: 75, price: 29.99 },
      { size: "L", color: "Black", stock: 60, price: 29.99 },
    ],
    pricing: {
      DE: 29.99,
      ES: 27.99,
      PL: 119.99
    },
    type: "Apparel",
    tags: ["fashion", "cotton", "casual"],
    sku: "FASH-TSHIRT-001",
    vendor: "FashionCo",
    status: "pending",
    lifetimeOrders: 0,
    adsSpend: 0,
    compareAtTriggered: false,
    autoArchiveStatus: "Active"
  },
  {
    id: "REF-2025-JEWE-00124",
    title: "Silver Chain Necklace",
    description: "Elegant sterling silver necklace with delicate chain design.",
    images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"],
    variants: [
      { size: "18in", color: "Silver", stock: 30, price: 89.99 },
      { size: "20in", color: "Silver", stock: 25, price: 94.99 },
    ],
    pricing: {
      DE: 89.99,
      ES: 84.99,
      PL: 369.99
    },
    type: "Jewelry",
    tags: ["jewelry", "silver", "necklace"],
    sku: "JEWE-NECK-001",
    vendor: "JewelryHub",
    status: "approved",
    lifetimeOrders: 45,
    adsSpend: 350.50,
    compareAtTriggered: true,
    autoArchiveStatus: "Active"
  },
  {
    id: "REF-2025-FASH-00125",
    title: "Denim Jeans Classic Fit",
    description: "High-quality denim jeans with classic straight leg fit.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d"],
    variants: [
      { size: "30x32", color: "Blue", stock: 40, price: 59.99 },
      { size: "32x32", color: "Blue", stock: 45, price: 59.99 },
      { size: "34x32", color: "Black", stock: 35, price: 59.99 },
    ],
    pricing: {
      DE: 59.99,
      ES: 54.99,
      PL: 249.99
    },
    type: "Apparel",
    tags: ["fashion", "denim", "pants"],
    sku: "FASH-JEAN-001",
    vendor: "DenimWorld",
    status: "published",
    lifetimeOrders: 120,
    adsSpend: 890.25,
    compareAtTriggered: true,
    autoArchiveStatus: "Active"
  }
];

export const mockActivityLogs = [
  {
    timestamp: "2025-01-15 14:32:05",
    productId: "REF-2025-FASH-00123",
    action: "Product Upload",
    description: "New product uploaded with AI enrichment",
    logs: "AI: Generated title and description | Images: 4 processed | Variants: 3 created",
    retryAttempts: 0
  },
  {
    timestamp: "2025-01-15 14:28:12",
    productId: "REF-2025-JEWE-00124",
    action: "Product Approved",
    description: "Product approved for DE, ES stores",
    logs: "Shopify: Synced to 2 stores | Status: Published",
    retryAttempts: 0
  },
  {
    timestamp: "2025-01-15 14:15:33",
    productId: "REF-2025-FASH-00125",
    action: "KPI Check",
    description: "Lifecycle check passed - product remains active",
    logs: "Orders: 120 | Ads: $890.25 | Compare-at: Active | Status: Keep Active",
    retryAttempts: 0
  },
  {
    timestamp: "2025-01-15 13:45:21",
    productId: "REF-2025-FASH-00122",
    action: "Auto-Archive",
    description: "Product archived due to low performance",
    logs: "Orders: 2 | Ads: $450.00 | Threshold not met | Action: Archived",
    retryAttempts: 1
  },
  {
    timestamp: "2025-01-15 13:20:08",
    productId: "REF-2025-JEWE-00121",
    action: "Compare-at Price",
    description: "Compare-at price activated due to order threshold",
    logs: "Orders: 51 | Threshold: 50 | Old Price: $89.99 | New Compare-at: $119.99",
    retryAttempts: 0
  }
];

export const mockDashboardStats = {
  totalProducts: 156,
  pendingApproval: 12,
  published: 132,
  autoArchived: 12
};

export const mockKPIRules = {
  compareAtPercent: 30,
  orderThreshold: 50,
  autoArchiveDays: 90,
  minimumSales: 10,
  adsSpendLimit: 500,
  storeOverrides: {
    DE: { enabled: true },
    ES: { enabled: true },
    PL: { enabled: false }
  }
};
