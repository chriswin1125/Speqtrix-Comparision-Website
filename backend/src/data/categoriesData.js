export const CATEGORIES = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    icon: 'Smartphone',
    description: 'Flagships, mid-rangers, foldables, and gaming phones',
    specSections: ['General', 'Display', 'Performance', 'Camera', 'Battery', 'Connectivity', 'Design'],
    popularBrands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Nothing', 'Vivo', 'Oppo', 'Realme']
  },
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    icon: 'Laptop',
    description: 'Ultrabooks, workstations, creator & gaming laptops',
    specSections: ['General', 'Display', 'Performance', 'Memory & Storage', 'Battery & Power', 'Connectivity & Ports', 'Design & Build'],
    popularBrands: ['Apple', 'Dell', 'Lenovo', 'HP', 'Asus', 'Acer', 'MSI', 'Microsoft']
  },
  {
    id: 'smart-tvs',
    name: 'Smart TVs',
    slug: 'smart-tvs',
    icon: 'Tv',
    description: 'OLED, QD-OLED, Mini-LED, and 4K/8K displays',
    specSections: ['General', 'Display', 'Audio', 'Smart Features', 'Connectivity', 'Power & Dimensions'],
    popularBrands: ['LG', 'Samsung', 'Sony', 'TCL', 'Hisense', 'Panasonic', 'Xiaomi']
  },
  {
    id: 'air-conditioners',
    name: 'Air Conditioners',
    slug: 'air-conditioners',
    icon: 'Wind',
    description: 'Inverter split ACs, smart energy-saving cooling',
    specSections: ['General', 'Cooling & Performance', 'Energy Efficiency', 'Noise & Comfort', 'Smart Features', 'Warranty'],
    popularBrands: ['Daikin', 'LG', 'Voltas', 'Blue Star', 'Carrier', 'Samsung', 'Panasonic', 'Hitachi', 'Haier']
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches',
    slug: 'smartwatches',
    icon: 'Watch',
    description: 'Adventure, fitness trackers, and luxury wearables',
    specSections: ['General', 'Display', 'Health & Sensors', 'Battery & Charging', 'Durability', 'Connectivity'],
    popularBrands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'OnePlus', 'Amazfit', 'Huawei']
  },
  {
    id: 'headphones',
    name: 'Headphones & Earbuds',
    slug: 'headphones',
    icon: 'Headphones',
    description: 'Over-ear ANC, audiophile, and true wireless earbuds',
    specSections: ['General', 'Audio Quality', 'Active Noise Cancellation', 'Battery Life', 'Connectivity', 'Design & Comfort'],
    popularBrands: ['Sony', 'Apple', 'Bose', 'Sennheiser', 'Samsung', 'JBL', 'Nothing', 'Audio-Technica']
  },
  {
    id: 'gaming-consoles',
    name: 'Gaming Consoles',
    slug: 'gaming-consoles',
    icon: 'Gamepad2',
    description: 'Next-gen home consoles, handhelds, and hybrids',
    specSections: ['General', 'Compute & Graphics', 'Storage & Memory', 'Output & Video', 'Connectivity', 'Dimensions & Power'],
    popularBrands: ['Sony', 'Microsoft', 'Nintendo', 'Valve', 'Asus']
  },
  {
    id: 'monitors',
    name: 'Monitors',
    slug: 'monitors',
    icon: 'Monitor',
    description: 'OLED gaming, high-refresh, ultrawide, and color-critical displays',
    specSections: ['General', 'Panel & Display', 'Gaming Features', 'Color & Accuracy', 'Ports & Connectivity', 'Ergonomics'],
    popularBrands: ['Asus', 'Dell', 'LG', 'Samsung', 'Acer', 'BenQ', 'MSI', 'Gigabyte']
  },
  {
    id: 'refrigerators',
    name: 'Refrigerators',
    slug: 'refrigerators',
    icon: 'Refrigerator',
    description: 'French door, side-by-side, double door, and smart cooling',
    specSections: ['General', 'Capacity & Compartments', 'Cooling Technology', 'Energy & Power', 'Smart Features', 'Dimensions'],
    popularBrands: ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'Haier', 'Panasonic']
  },
  {
    id: 'washing-machines',
    name: 'Washing Machines',
    slug: 'washing-machines',
    icon: 'Sparkles',
    description: 'Front load, top load, AI inverter steam washers',
    specSections: ['General', 'Performance & Wash Programs', 'Energy & Water Efficiency', 'Motor & Noise', 'Smart Features', 'Warranty'],
    popularBrands: ['Bosch', 'LG', 'Samsung', 'IFB', 'Whirlpool', 'Haier']
  },
  {
    id: 'cameras',
    name: 'Cameras',
    slug: 'cameras',
    icon: 'Camera',
    description: 'Full-frame mirrorless, cinema, and compact creator cameras',
    specSections: ['General', 'Sensor & Image Quality', 'Video Capabilities', 'Autofocus & Stabilization', 'Build & Storage', 'Battery'],
    popularBrands: ['Sony', 'Canon', 'Nikon', 'Fujifilm', 'Panasonic', 'DJI']
  },
  {
    id: 'routers',
    name: 'Routers & Networking',
    slug: 'routers',
    icon: 'Wifi',
    description: 'Wi-Fi 7, Wi-Fi 6E mesh routers, and gaming gateways',
    specSections: ['General', 'Wireless Performance', 'Hardware & Ports', 'Coverage & Mesh', 'Security & Features'],
    popularBrands: ['Asus', 'Netgear', 'TP-Link', 'Linksys', 'Ubiquiti']
  },
  {
    id: 'tablets',
    name: 'Tablets',
    slug: 'tablets',
    icon: 'Tablet',
    description: 'Pro productivity tablets, e-readers, and compact slates',
    specSections: ['General', 'Display', 'Performance', 'Battery', 'Stylus & Accessories', 'Connectivity'],
    popularBrands: ['Apple', 'Samsung', 'Lenovo', 'OnePlus', 'Xiaomi', 'Microsoft']
  },
  {
    id: 'microwave-ovens',
    name: 'Microwave Ovens',
    slug: 'microwave-ovens',
    icon: 'Flame',
    description: 'Convection, grill, and smart inverter microwave ovens',
    specSections: ['General', 'Cooking Modes', 'Capacity & Power', 'Build & Features', 'Warranty'],
    popularBrands: ['LG', 'Samsung', 'Panasonic', 'IFB', 'Whirlpool', 'Bosch']
  }
];
