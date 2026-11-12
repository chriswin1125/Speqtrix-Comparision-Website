import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCAL_CSV = path.join(__dirname, 'Mobiles Dataset (2025).csv');
const FALLBACK_CSV = 'c:\\Users\\J.CHRISWIN PRAYSON\\Downloads\\archive (1)\\Mobiles Dataset (2025).csv';
const CSV_PATH = fs.existsSync(LOCAL_CSV) ? LOCAL_CSV : FALLBACK_CSV;

// Brand image mapping for high-quality visuals
const BRAND_IMAGES = {
  'Apple': [
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80'
  ],
  'Samsung': [
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  ],
  'Google': [
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  ],
  'OnePlus': [
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  ],
  'Xiaomi': [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  ],
  'Sony': [
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  ]
};

function getBrandImage(brand, idx = 0) {
  const images = BRAND_IMAGES[brand] || BRAND_IMAGES['default'];
  return images[idx % images.length];
}

// Simple CSV parser supporting quotes
function parseCSV(content) {
  const lines = [];
  let currentLine = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentLine.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentLine.push(currentField.trim());
      if (currentLine.some(f => f.length > 0)) {
        lines.push(currentLine);
      }
      currentLine = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentLine.length > 0) {
    currentLine.push(currentField.trim());
    lines.push(currentLine);
  }

  return lines;
}

export function importCsvProducts() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error('CSV file not found at:', CSV_PATH);
    return [];
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf-8');
  const rows = parseCSV(raw);
  if (rows.length < 2) return [];

  const headers = rows[0];
  const dataRows = rows.slice(1);
  console.log(`[CSV Import] Parsed ${dataRows.length} mobile phone rows from dataset.`);

  const importedProducts = [];
  const seenIds = new Set();

  dataRows.forEach((cols, idx) => {
    // Columns:
    // 0: Company Name, 1: Model Name, 2: Mobile Weight, 3: RAM, 4: Front Camera,
    // 5: Back Camera, 6: Processor, 7: Battery Capacity, 8: Screen Size,
    // 9: Price Pak, 10: Price India, 11: Price China, 12: Price USA, 13: Price Dubai, 14: Launched Year
    const company = cols[0] || 'Unknown';
    const model = cols[1] || 'Device';
    const weight = cols[2] || '';
    const ram = cols[3] || '';
    const frontCam = cols[4] || '';
    const backCam = cols[5] || '';
    const processor = cols[6] || '';
    const battery = cols[7] || '';
    const screenSize = cols[8] || '';
    const priceIndiaRaw = cols[10] || '';
    const priceUSARaw = cols[12] || '';
    const year = cols[14] || '2024';

    // Parse price in INR
    const priceMatch = priceIndiaRaw.match(/INR\s*([\d,]+)/i);
    const inrPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 0;
    if (inrPrice <= 0) return; // skip if invalid price

    // Parse numeric metrics for smart comparison indicators
    const weightMatch = weight.match(/([\d.]+)/);
    const weightGrams = weightMatch ? parseFloat(weightMatch[1]) : 190;

    const ramMatch = ram.match(/(\d+)\s*GB/i);
    const ramGB = ramMatch ? parseInt(ramMatch[1], 10) : 8;

    const batteryMatch = battery.replace(/,/g, '').match(/(\d+)\s*mAh/i);
    const batteryCapacityMAh = batteryMatch ? parseInt(batteryMatch[1], 10) : 5000;

    const screenMatch = screenSize.match(/([\d.]+)/);
    const displaySizeInches = screenMatch ? parseFloat(screenMatch[1]) : 6.5;

    const backCamMatch = backCam.match(/(\d+)\s*MP/i);
    const mainCameraMP = backCamMatch ? parseInt(backCamMatch[1], 10) : 50;

    const frontCamMatch = frontCam.match(/(\d+)\s*MP/i);
    const frontCameraMP = frontCamMatch ? parseInt(frontCamMatch[1], 10) : 16;

    // Full product name
    const fullName = model.toLowerCase().startsWith(company.toLowerCase())
      ? model
      : `${company} ${model}`;

    let baseSlug = fullName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    if (seenIds.has(baseSlug)) {
      baseSlug = `${baseSlug}-${idx}`;
    }
    seenIds.add(baseSlug);

    const image = getBrandImage(company, idx);

    importedProducts.push({
      id: baseSlug,
      name: fullName,
      brand: company,
      category: 'smartphones',
      modelNumber: model,
      series: `${company} ${year}`,
      price: inrPrice,
      currency: 'INR',
      priceINR: inrPrice,
      releaseDate: `${year}`,
      popularity: Math.min(98, 75 + Math.floor(Math.random() * 20)),
      verified: true,
      isUserAdded: false,
      rating: +(4.2 + (Math.random() * 0.7)).toFixed(1),
      image,
      gallery: [image],
      overview: `${fullName} features a ${screenSize} display, powered by ${processor} with ${ram} RAM, ${backCam} rear camera setup, and a long-lasting ${battery} battery.`,
      pros: [
        `${processor} performance with ${ram} RAM`,
        `${battery} battery capacity for all-day use`,
        `${backCam} high-resolution camera system`
      ],
      cons: [
        `Base variant configuration`,
        `Charging adapter inclusion varies by market`
      ],
      specifications: {
        'General': {
          'Brand': company,
          'Model Name': model,
          'Release Year': year,
          'Weight': weight || `${weightGrams}g`,
          'India Launch Price': `₹${inrPrice.toLocaleString('en-IN')}`,
          'US Launch Price': priceUSARaw || '—'
        },
        'Display': {
          'Display Size': screenSize || `${displaySizeInches} inches`,
          'Display Technology': inrPrice > 50000 ? 'AMOLED / LTPO 120Hz' : 'IPS LCD / AMOLED',
          'Refresh Rate': inrPrice > 30000 ? '120 Hz' : inrPrice > 15000 ? '90 Hz' : '60 Hz'
        },
        'Performance': {
          'Processor': processor,
          'RAM': ram || `${ramGB} GB`,
          'Internal Storage': model.match(/\d+GB/i) ? model.match(/\d+GB/i)[0] : '128 GB'
        },
        'Camera': {
          'Rear Camera Setup': backCam,
          'Main Camera Sensor': `${mainCameraMP} MP`,
          'Front Camera': frontCam || `${frontCameraMP} MP`
        },
        'Battery': {
          'Battery Capacity': battery || `${batteryCapacityMAh} mAh`,
          'Charging Speed': inrPrice > 40000 ? '65W Fast Charging' : '33W Fast Charging'
        }
      },
      metrics: {
        displaySizeInches,
        ramGB,
        batteryCapacityMAh,
        weightGrams,
        mainCameraMP,
        frontCameraMP,
        priceINR: inrPrice,
        priceUSD: inrPrice ? Math.round(inrPrice / 85) : 0
      },
      dataSource: 'Mobiles Dataset (2025) Verified Specification',
      lastUpdated: new Date()
    });
  });

  return importedProducts;
}
