export const SEED_PRODUCTS = [
  // ==================== SMARTPHONES ====================
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    modelNumber: 'SM-S938B',
    series: 'Galaxy S Series',
    price: 129999,
    currency: 'INR',
    priceINR: 129999,
    releaseDate: '2025-01-22',
    popularity: 99,
    verified: true,
    isUserAdded: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The pinnacle of Android engineering featuring Snapdragon 8 Elite, 200MP Quad-Tele camera system, embedded S-Pen, and an anti-reflective flat Dynamic AMOLED 2X display.',
    pros: ['Industry-best 200MP camera & 5x periscope telephoto', 'Integrated S-Pen stylus', 'Anti-reflective titanium glass build', '7 years of guaranteed OS updates'],
    cons: ['45W charging is slower than rivals', 'Hefty 218g weight in hand'],
    specifications: {
      'General': {
        'Operating System': 'Android 15 (One UI 7)',
        'Model Number': 'SM-S938B',
        'Release Date': 'January 2025',
        'Weight': '218 g',
        'Dimensions': '162.8 x 77.6 x 8.2 mm',
        'Water & Dust Resistance': 'IP68 (1.5m up to 30 mins)',
        'Build Material': 'Titanium Frame, Gorilla Armor 2 Glass'
      },
      'Display': {
        'Display Size': '6.9 inches',
        'Display Resolution': '3120 x 1440 pixels (QHD+)',
        'Pixel Density': '498 ppi',
        'Display Technology': 'Dynamic AMOLED 2X',
        'Refresh Rate': '120 Hz (LTPO 1-120Hz)',
        'Peak Brightness': '2600 nits',
        'HDR Support': 'HDR10+'
      },
      'Performance': {
        'Processor': 'Qualcomm Snapdragon 8 Elite for Galaxy (3nm)',
        'CPU Clock Speed': '4.47 GHz',
        'GPU': 'Adreno 830',
        'RAM': '12 GB (LPDDR5X)',
        'Internal Storage': '256 GB (UFS 4.0)',
        'Expandable Storage': 'No',
        'Antutu Benchmark Score': '3,050,000'
      },
      'Camera': {
        'Rear Camera Setup': 'Quad: 200MP + 50MP (5x Periscope) + 10MP (3x) + 50MP (Ultrawide)',
        'Main Camera Sensor': '200 MP, f/1.7, OIS, Super Quad Pixel AF',
        'Optical Zoom': '5x Optical, 10x Optical Quality, 100x Space Zoom',
        'Video Recording': '8K at 30fps, 4K at 120fps, HDR10+',
        'Front Camera': '12 MP, f/2.2, Dual Pixel AF, 4K 60fps'
      },
      'Battery': {
        'Battery Capacity': '5000 mAh',
        'Charging Speed': '45W Wired Fast Charging',
        'Wireless Charging': '15W Wireless, 4.5W Reverse Wireless',
        'Estimated Battery Life': '28 hours continuous video playback'
      },
      'Connectivity': {
        '5G Connectivity': 'Sub-6GHz and mmWave 5G',
        'Wi-Fi Version': 'Wi-Fi 7 (802.11be)',
        'Bluetooth Version': 'Bluetooth 5.4 with LE Audio',
        'NFC': 'Yes',
        'USB Interface': 'USB Type-C 3.2 Gen 2, DisplayPort Out'
      }
    },
    metrics: {
      displaySizeInches: 6.9,
      resolutionPixels: 3120 * 1440,
      refreshRateHz: 120,
      ramGB: 12,
      storageGB: 256,
      batteryCapacityMAh: 5000,
      chargingWatts: 45,
      weightGrams: 218,
      mainCameraMP: 200,
      frontCameraMP: 12,
      benchmarkScore: 3050000,
      brightnessNits: 2600,
      priceUSD: 1299
    }
  },
  {
    id: 'apple-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    modelNumber: 'A3296',
    series: 'iPhone Pro',
    price: 144900,
    currency: 'INR',
    priceINR: 144900,
    releaseDate: '2024-09-20',
    popularity: 98,
    verified: true,
    isUserAdded: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Apple flagship powerhouse featuring Grade 5 Titanium design, A18 Pro 3nm chip, Camera Control button, and class-leading video recording in 4K 120fps Dolby Vision.',
    pros: ['Unmatched A18 Pro single-core & video processing', 'Remarkable 33-hour battery endurance', 'Dedicated Camera Control touch button', 'Studio-quality 4-mic array'],
    cons: ['Charging capped at ~30W peak', 'No bundled charger or stylus'],
    specifications: {
      'General': {
        'Operating System': 'iOS 18 (Apple Intelligence)',
        'Model Number': 'A3296',
        'Release Date': 'September 2024',
        'Weight': '227 g',
        'Dimensions': '163 x 77.6 x 8.25 mm',
        'Water & Dust Resistance': 'IP68 (6m up to 30 mins)',
        'Build Material': 'Grade 5 Titanium Frame, Ceramic Shield Front'
      },
      'Display': {
        'Display Size': '6.9 inches',
        'Display Resolution': '2868 x 1320 pixels',
        'Pixel Density': '460 ppi',
        'Display Technology': 'Super Retina XDR OLED',
        'Refresh Rate': '120 Hz (ProMotion 1-120Hz)',
        'Peak Brightness': '2000 nits (1 nit minimum)',
        'HDR Support': 'Dolby Vision, HDR10'
      },
      'Performance': {
        'Processor': 'Apple A18 Pro (3nm 2nd Gen)',
        'CPU Clock Speed': '4.04 GHz',
        'GPU': 'Apple 6-core GPU with hardware ray tracing',
        'RAM': '8 GB (LPDDR5X Unified)',
        'Internal Storage': '256 GB (NVMe)',
        'Expandable Storage': 'No',
        'Antutu Benchmark Score': '2,920,000'
      },
      'Camera': {
        'Rear Camera Setup': 'Triple: 48MP Fusion + 48MP Ultrawide + 12MP 5x Telephoto',
        'Main Camera Sensor': '48 MP, f/1.78, 2nd-gen Sensor-shift OIS',
        'Optical Zoom': '5x Optical Zoom In, 2x Optical Zoom Out, 25x Digital',
        'Video Recording': '4K Dolby Vision at 120fps, ProRes, Log Video, ACES',
        'Front Camera': '12 MP TrueDepth, f/1.9, Autofocus, 4K 60fps'
      },
      'Battery': {
        'Battery Capacity': '4685 mAh',
        'Charging Speed': '30W Wired Fast Charging (50% in 30 mins)',
        'Wireless Charging': '25W MagSafe, 15W Qi2',
        'Estimated Battery Life': '33 hours video playback'
      },
      'Connectivity': {
        '5G Connectivity': 'Sub-6GHz and mmWave 5G',
        'Wi-Fi Version': 'Wi-Fi 7 (802.11be)',
        'Bluetooth Version': 'Bluetooth 5.3',
        'NFC': 'Yes',
        'USB Interface': 'USB Type-C 3.2 Gen 2 (up to 10Gbps)'
      }
    },
    metrics: {
      displaySizeInches: 6.9,
      resolutionPixels: 2868 * 1320,
      refreshRateHz: 120,
      ramGB: 8,
      storageGB: 256,
      batteryCapacityMAh: 4685,
      chargingWatts: 30,
      weightGrams: 227,
      mainCameraMP: 48,
      frontCameraMP: 12,
      benchmarkScore: 2920000,
      brightnessNits: 2000,
      priceUSD: 1199
    }
  },
  {
    id: 'google-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    brand: 'Google',
    category: 'smartphones',
    modelNumber: 'GZC4K',
    series: 'Pixel Pro',
    price: 124999,
    currency: 'INR',
    priceINR: 124999,
    releaseDate: '2024-08-22',
    popularity: 94,
    verified: true,
    isUserAdded: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The purest Android AI experience with Google Tensor G4, 16GB RAM for on-device Gemini Nano, best-in-class computational still photography, and Super Actua 3000 nits display.',
    pros: ['Class-leading still camera and Night Sight', '16GB RAM standard for local AI models', 'Blinding 3000 nits Super Actua screen', '7 years of Pixel drops & OS updates'],
    cons: ['Tensor G4 benchmark score lags Snapdragon 8 Elite in gaming', '37W charging is average'],
    specifications: {
      'General': {
        'Operating System': 'Android 15 (Pixel Experience)',
        'Model Number': 'GZC4K',
        'Release Date': 'August 2024',
        'Weight': '221 g',
        'Dimensions': '162.8 x 76.6 x 8.5 mm',
        'Water & Dust Resistance': 'IP68 (1.5m up to 30 mins)',
        'Build Material': 'Polished Aluminum Frame, Gorilla Glass Victus 2'
      },
      'Display': {
        'Display Size': '6.8 inches',
        'Display Resolution': '2992 x 1344 pixels',
        'Pixel Density': '486 ppi',
        'Display Technology': 'Super Actua LTPO OLED',
        'Refresh Rate': '120 Hz (1-120Hz smooth display)',
        'Peak Brightness': '3000 nits',
        'HDR Support': 'HDR10+'
      },
      'Performance': {
        'Processor': 'Google Tensor G4 (4nm with Titan M2 security)',
        'CPU Clock Speed': '3.1 GHz',
        'GPU': 'Mali-G715 MC7',
        'RAM': '16 GB (LPDDR5X)',
        'Internal Storage': '128 GB / 256 GB (UFS 3.1)',
        'Expandable Storage': 'No',
        'Antutu Benchmark Score': '1,450,000'
      },
      'Camera': {
        'Rear Camera Setup': 'Triple: 50MP Main + 48MP Ultrawide with Macro + 48MP 5x Telephoto',
        'Main Camera Sensor': '50 MP Octa PD, f/1.68, 1/1.31" sensor, OIS',
        'Optical Zoom': '5x Optical Zoom, 30x Super Res Zoom with Video Boost',
        'Video Recording': '8K at 30fps (via Cloud Video Boost), 4K at 60fps',
        'Front Camera': '42 MP Dual PD, f/2.2, 103° ultrawide with AF'
      },
      'Battery': {
        'Battery Capacity': '5060 mAh',
        'Charging Speed': '37W Wired Fast Charging (70% in 30 mins)',
        'Wireless Charging': '23W Fast Wireless (Pixel Stand), Battery Share',
        'Estimated Battery Life': '24+ hours beyond 100 hours with Extreme Battery Saver'
      },
      'Connectivity': {
        '5G Connectivity': 'Sub-6GHz and mmWave 5G with Satellite SOS',
        'Wi-Fi Version': 'Wi-Fi 7 (802.11be)',
        'Bluetooth Version': 'Bluetooth 5.3',
        'NFC': 'Yes',
        'USB Interface': 'USB Type-C 3.2'
      }
    },
    metrics: {
      displaySizeInches: 6.8,
      resolutionPixels: 2992 * 1344,
      refreshRateHz: 120,
      ramGB: 16,
      storageGB: 128,
      batteryCapacityMAh: 5060,
      chargingWatts: 37,
      weightGrams: 221,
      mainCameraMP: 50,
      frontCameraMP: 42,
      benchmarkScore: 1450000,
      brightnessNits: 3000,
      priceUSD: 1099
    }
  },
  {
    id: 'oneplus-13',
    name: 'OnePlus 13',
    brand: 'OnePlus',
    category: 'smartphones',
    modelNumber: 'PJZ110',
    series: 'OnePlus Flagship',
    price: 69999,
    currency: 'INR',
    priceINR: 69999,
    releaseDate: '2024-11-01',
    popularity: 95,
    verified: true,
    isUserAdded: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Flagship killer evolution with huge 6000 mAh Glacier battery, blazing 100W wired charging, triple 50MP Hasselblad camera array, and IP68 + IP69 dual water protection.',
    pros: ['Massive 6000 mAh silicon-carbon battery', 'Blistering 100W charging (full in 36m)', 'Triple 50MP Hasselblad tuned cameras', 'Exceptional value at $899'],
    cons: ['No mmWave 5G in standard global SKU', 'USB cable is proprietary for top 100W speed'],
    specifications: {
      'General': {
        'Operating System': 'OxygenOS 15 (Android 15)',
        'Model Number': 'PJZ110',
        'Release Date': 'November 2024',
        'Weight': '213 g',
        'Dimensions': '162.9 x 76.5 x 8.5 mm',
        'Water & Dust Resistance': 'IP68 and IP69 (High pressure steam resistant)',
        'Build Material': 'Aluminum Alloy frame, Crystal Shield Glass / Eco Leather'
      },
      'Display': {
        'Display Size': '6.82 inches',
        'Display Resolution': '3168 x 1440 pixels (2K)',
        'Pixel Density': '510 ppi',
        'Display Technology': 'BOE X2 Oriental LTPO AMOLED',
        'Refresh Rate': '120 Hz (1-120Hz intelligent dynamic)',
        'Peak Brightness': '4500 nits (1600 nits HBM)',
        'HDR Support': 'Dolby Vision, HDR10+, DisplayMate A++'
      },
      'Performance': {
        'Processor': 'Qualcomm Snapdragon 8 Elite (3nm)',
        'CPU Clock Speed': '4.32 GHz',
        'GPU': 'Adreno 830',
        'RAM': '16 GB (LPDDR5X)',
        'Internal Storage': '512 GB (UFS 4.0)',
        'Expandable Storage': 'No',
        'Antutu Benchmark Score': '3,110,000'
      },
      'Camera': {
        'Rear Camera Setup': 'Triple 50MP: 50MP Sony LYT-808 + 50MP Periscope + 50MP Ultrawide',
        'Main Camera Sensor': '50 MP, 1/1.4", f/1.6, OIS, Hasselblad Master Optics',
        'Optical Zoom': '3x Optical Periscope, 120x Digital',
        'Video Recording': '8K at 30fps, 4K at 60fps Dolby Vision',
        'Front Camera': '32 MP, f/2.4, 4K at 60fps'
      },
      'Battery': {
        'Battery Capacity': '6000 mAh',
        'Charging Speed': '100W SuperVOOC Wired (100% in 36 mins)',
        'Wireless Charging': '50W AIRVOOC Wireless',
        'Estimated Battery Life': '2.1 days of regular daily usage'
      },
      'Connectivity': {
        '5G Connectivity': 'Dual SIM 5G Sub-6',
        'Wi-Fi Version': 'Wi-Fi 7 (802.11be)',
        'Bluetooth Version': 'Bluetooth 5.4 with aptX HD & LDAC',
        'NFC': 'Yes with 360-degree antenna',
        'USB Interface': 'USB Type-C 3.2 Gen 1'
      }
    },
    metrics: {
      displaySizeInches: 6.82,
      resolutionPixels: 3168 * 1440,
      refreshRateHz: 120,
      ramGB: 16,
      storageGB: 512,
      batteryCapacityMAh: 6000,
      chargingWatts: 100,
      weightGrams: 213,
      mainCameraMP: 50,
      frontCameraMP: 32,
      benchmarkScore: 3110000,
      brightnessNits: 4500,
      priceUSD: 899
    }
  },

  // ==================== LAPTOPS ====================
  {
    id: 'apple-macbook-pro-16-m4-max',
    name: 'Apple MacBook Pro 16" (M4 Max)',
    brand: 'Apple',
    category: 'laptops',
    modelNumber: 'MX2V3LL/A',
    series: 'MacBook Pro',
    price: 349900,
    currency: 'INR',
    priceINR: 349900,
    releaseDate: '2024-11-08',
    popularity: 97,
    verified: true,
    isUserAdded: false,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The industry-defining pro laptop delivering monumental compute efficiency, Liquid Retina XDR screen with nano-texture option, up to 24 hours of battery life, and Thunderbolt 5 ports.',
    pros: ['Unrivaled performance-per-watt on battery and AC', 'Up to 24 hours of real-world battery life', '1600 nits Liquid Retina XDR with 120Hz ProMotion', 'Full speed on battery without throttling'],
    cons: ['RAM and storage not user-upgradeable', 'Substantial financial investment'],
    specifications: {
      'General': {
        'Operating System': 'macOS Sequoia',
        'Model Number': 'MX2V3LL/A',
        'Release Date': 'November 2024',
        'Weight': '2.14 kg (4.71 lbs)',
        'Dimensions': '35.57 x 24.81 x 1.68 cm',
        'Build Material': '100% Recycled CNC Aluminum Unibody'
      },
      'Performance': {
        'Processor': 'Apple M4 Max (14-Core CPU: 10 performance & 4 efficiency)',
        'Processor Generation': '4th Gen Apple Silicon (3nm)',
        'GPU': 'Apple 32-Core GPU (Hardware ray tracing, 546 GB/s bandwidth)',
        'NPU': '16-core Neural Engine (38 TOPS)',
        'Cinebench R23 Multi-Core': '31,500 pts'
      },
      'Memory & Storage': {
        'RAM': '36 GB Unified Memory (Up to 128 GB configurable)',
        'RAM Type': 'Unified LPDDR5X (546 GB/s memory bandwidth)',
        'Storage': '1 TB Ultra-fast NVMe SSD (7,400 MB/s read)',
        'Expandable Storage': 'SDXC Card Slot (UHS-II)'
      },
      'Display': {
        'Display Size': '16.2 inches',
        'Display Resolution': '3456 x 2234 pixels (Liquid Retina XDR)',
        'Pixel Density': '254 ppi',
        'Refresh Rate': '120 Hz ProMotion',
        'Display Technology': 'Mini-LED Backlit (10,000 local dimming zones)',
        'Peak Brightness': '1600 nits HDR, 1000 nits SDR outdoor'
      },
      'Battery & Power': {
        'Battery Capacity': '100 Wh Lithium-Polymer',
        'Battery Life': 'Up to 24 hours Apple TV playback, 17 hours wireless web',
        'Power Adapter': '140W USB-C Power Adapter (MagSafe 3 Fast Charge)'
      },
      'Connectivity & Ports': {
        'Ports': '3x Thunderbolt 5 (USB-C up to 120Gbps), HDMI 2.1 (8K 60Hz), SDXC card slot, 3.5mm headphone jack, MagSafe 3',
        'Wi-Fi': 'Wi-Fi 6E (802.11ax)',
        'Bluetooth': 'Bluetooth 5.3',
        'Webcam': '12MP Center Stage Camera with Desk View (1080p FHD)'
      }
    },
    metrics: {
      screenSizeInches: 16.2,
      ramGB: 36,
      storageGB: 1000,
      batteryWattHours: 100,
      batteryLifeHours: 24,
      weightKg: 2.14,
      refreshRateHz: 120,
      brightnessNits: 1600,
      benchmarkScore: 31500,
      priceUSD: 3499
    }
  },
  {
    id: 'dell-xps-16-9640',
    name: 'Dell XPS 16 (9640)',
    brand: 'Dell',
    category: 'laptops',
    modelNumber: 'XPS9640-9944SLV',
    series: 'XPS Series',
    price: 289990,
    currency: 'INR',
    priceINR: 289990,
    releaseDate: '2024-03-15',
    popularity: 93,
    verified: true,
    isUserAdded: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Dell statement ultrabook featuring futuristic seamless glass touch pad, zero-lattice keyboard, Intel Core Ultra 9 with AI Boost, RTX 4070, and stunning 4K+ OLED InfinityEdge display.',
    pros: ['Stunning CNC aluminum & Gorilla Glass seamless design', 'Vibrant 4K+ OLED touch screen with 100% DCI-P3', 'Powerful discrete RTX 4070 8GB GPU', 'Huge 99.5 Wh battery capacity'],
    cons: ['Capacitive touch function row lacks tactile feel', 'Only USB-C ports (requires adapters for USB-A/HDMI)'],
    specifications: {
      'General': {
        'Operating System': 'Windows 11 Home / Pro',
        'Model Number': 'XPS9640-9944SLV',
        'Release Date': 'March 2024',
        'Weight': '2.13 kg (4.70 lbs)',
        'Dimensions': '35.81 x 24.0 x 1.87 cm',
        'Build Material': 'CNC Machined Aluminum, Gorilla Glass 3 Palmrest'
      },
      'Performance': {
        'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1 GHz)',
        'Processor Generation': 'Intel Meteor Lake (Intel 4 process)',
        'GPU': 'NVIDIA GeForce RTX 4070 Laptop GPU (8GB GDDR6, 60W TGP)',
        'NPU': 'Intel AI Boost NPU',
        'Cinebench R23 Multi-Core': '18,900 pts'
      },
      'Memory & Storage': {
        'RAM': '32 GB LPDDR5X (7467 MT/s)',
        'RAM Type': 'Dual-channel Soldered LPDDR5X',
        'Storage': '1 TB M.2 PCIe 4.0 NVMe SSD',
        'Expandable Storage': '1x User-accessible M.2 2280 NVMe slot'
      },
      'Display': {
        'Display Size': '16.3 inches',
        'Display Resolution': '3840 x 2400 pixels (4K+ UHD+)',
        'Pixel Density': '277 ppi',
        'Refresh Rate': '90 Hz OLED Touch',
        'Display Technology': 'InfinityEdge OLED (100% DCI-P3, DisplayHDR 500)',
        'Peak Brightness': '500 nits'
      },
      'Battery & Power': {
        'Battery Capacity': '99.5 Wh 6-cell Lithium-ion',
        'Battery Life': 'Up to 10 hours mixed productivity',
        'Power Adapter': '130W Type-C AC Adapter'
      },
      'Connectivity & Ports': {
        'Ports': '3x Thunderbolt 4 (Type-C with DP and PD), 1x MicroSD card reader v6.0, 1x 3.5mm Headphone/Mic Jack',
        'Wi-Fi': 'Intel Killer Wi-Fi 7 BE1750 (802.11be)',
        'Bluetooth': 'Bluetooth 5.4',
        'Webcam': '1080p FHD RGB-IR with Windows Hello facial recognition'
      }
    },
    metrics: {
      screenSizeInches: 16.3,
      ramGB: 32,
      storageGB: 1000,
      batteryWattHours: 99.5,
      batteryLifeHours: 10,
      weightKg: 2.13,
      refreshRateHz: 90,
      brightnessNits: 500,
      benchmarkScore: 18900,
      priceUSD: 2899
    }
  },
  {
    id: 'asus-rog-zephyrus-g16-2024',
    name: 'ASUS ROG Zephyrus G16 (2024)',
    brand: 'Asus',
    category: 'laptops',
    modelNumber: 'GU605MZ-QR043W',
    series: 'ROG Zephyrus',
    price: 269990,
    currency: 'INR',
    priceINR: 269990,
    releaseDate: '2024-02-28',
    popularity: 94,
    verified: true,
    isUserAdded: false,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Ultra-thin gaming masterpiece featuring an CNC aluminum chassis, ROG Nebula 2.5K 240Hz OLED panel, RTX 4080 12GB graphics, Slash Lighting array, and vapor chamber cooling.',
    pros: ['Ultra-slim 1.49cm aluminum chassis weighing only 1.95kg', 'Breathtaking 240Hz 0.2ms 2.5K OLED gaming display', 'Beastly RTX 4080 GPU for AAA ray-traced gaming', 'Rich 6-speaker audio system with dual woofers'],
    cons: ['Fans can be audible under maximum turbo mode', 'Soldered LPDDR5X RAM cannot be upgraded'],
    specifications: {
      'General': {
        'Operating System': 'Windows 11 Pro',
        'Model Number': 'GU605MZ-QR043W',
        'Release Date': 'February 2024',
        'Weight': '1.95 kg (4.30 lbs)',
        'Dimensions': '35.4 x 24.6 x 1.49 cm',
        'Build Material': 'CNC Aluminum Alloy Unibody with Slash Lighting'
      },
      'Performance': {
        'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1 GHz)',
        'Processor Generation': 'Intel 14th Gen Meteor Lake',
        'GPU': 'NVIDIA GeForce RTX 4080 Laptop GPU (12GB GDDR6, 115W TGP)',
        'NPU': 'Intel AI Boost NPU',
        'Cinebench R23 Multi-Core': '19,500 pts'
      },
      'Memory & Storage': {
        'RAM': '32 GB LPDDR5X (7467 MT/s)',
        'RAM Type': 'Dual-channel Onboard',
        'Storage': '2 TB PCIe 4.0 NVMe M.2 SSD',
        'Expandable Storage': '2x M.2 PCIe 4.0 slots (1 slot free)'
      },
      'Display': {
        'Display Size': '16.0 inches',
        'Display Resolution': '2560 x 1600 pixels (2.5K QHD+)',
        'Pixel Density': '188 ppi',
        'Refresh Rate': '240 Hz (0.2ms response time)',
        'Display Technology': 'ROG Nebula Display OLED (G-SYNC, 100% DCI-P3)',
        'Peak Brightness': '500 nits (DisplayHDR True Black 500)'
      },
      'Battery & Power': {
        'Battery Capacity': '90 Wh 4-cell Li-ion',
        'Battery Life': 'Up to 9 hours video playback',
        'Power Adapter': '240W AC Adapter (supports 100W USB-C PD)'
      },
      'Connectivity & Ports': {
        'Ports': '1x Thunderbolt 4, 1x USB 3.2 Gen 2 Type-C, 2x USB 3.2 Gen 2 Type-A, 1x HDMI 2.1 FRL, 1x SD Card reader (UHS-II), 3.5mm combo audio',
        'Wi-Fi': 'Wi-Fi 6E (802.11ax)',
        'Bluetooth': 'Bluetooth 5.3',
        'Webcam': '1080p FHD IR Camera for Windows Hello'
      }
    },
    metrics: {
      screenSizeInches: 16.0,
      ramGB: 32,
      storageGB: 2000,
      batteryWattHours: 90,
      batteryLifeHours: 9,
      weightKg: 1.95,
      refreshRateHz: 240,
      brightnessNits: 500,
      benchmarkScore: 19500,
      priceUSD: 2699
    }
  },
  {
    id: 'lenovo-thinkpad-x1-carbon-gen-12',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'laptops',
    modelNumber: '21KC000AUS',
    series: 'ThinkPad X1',
    price: 199990,
    currency: 'INR',
    priceINR: 199990,
    releaseDate: '2024-04-10',
    popularity: 91,
    verified: true,
    isUserAdded: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The gold standard of enterprise executive mobility with featherlight 1.09 kg carbon fiber and magnesium chassis, legendary ThinkPad keyboard with TrackPoint, and MIL-STD 810H durability.',
    pros: ['Ultra-lightweight 1.09 kg chassis', 'Exceptional tactile ThinkPad keyboard with Communications Bar', 'Comprehensive enterprise security and vPro', 'Sublime 2.8K 120Hz OLED matte display'],
    cons: ['Integrated Intel Arc graphics not built for heavy 3D gaming', 'Battery life with OLED is around 11 hours'],
    specifications: {
      'General': {
        'Operating System': 'Windows 11 Pro',
        'Model Number': '21KC000AUS',
        'Release Date': 'April 2024',
        'Weight': '1.09 kg (2.42 lbs)',
        'Dimensions': '31.28 x 21.47 x 1.49 cm',
        'Build Material': 'Carbon Fiber top lid, Magnesium Alloy bottom'
      },
      'Performance': {
        'Processor': 'Intel Core Ultra 7 155H (16 Cores, up to 4.8 GHz)',
        'Processor Generation': 'Intel 14th Gen Meteor Lake',
        'GPU': 'Intel Arc Graphics (Integrated 8 Xe cores)',
        'NPU': 'Intel AI Boost',
        'Cinebench R23 Multi-Core': '14,800 pts'
      },
      'Memory & Storage': {
        'RAM': '32 GB LPDDR5X (6400 MT/s)',
        'RAM Type': 'Soldered Dual-Channel',
        'Storage': '1 TB M.2 2280 PCIe 4.0 NVMe SSD (Opal 2.0 encrypted)',
        'Expandable Storage': '1x M.2 slot upgradeable'
      },
      'Display': {
        'Display Size': '14.0 inches',
        'Display Resolution': '2880 x 1800 pixels (2.8K)',
        'Pixel Density': '242 ppi',
        'Refresh Rate': '120 Hz (DisplayHDR True Black 500)',
        'Display Technology': 'OLED Anti-glare / Anti-reflection, 100% DCI-P3',
        'Peak Brightness': '500 nits'
      },
      'Battery & Power': {
        'Battery Capacity': '57 Wh Li-Polymer',
        'Battery Life': 'Up to 12.5 hours mixed workflow',
        'Power Adapter': '65W USB-C Slim GaN Rapid Charge (80% in 60m)'
      },
      'Connectivity & Ports': {
        'Ports': '2x Thunderbolt 4 (40Gbps), 2x USB-A 3.2 Gen 1, 1x HDMI 2.1, 1x 3.5mm audio jack, Nano-SIM (optional)',
        'Wi-Fi': 'Intel Wi-Fi 6E AX211',
        'Bluetooth': 'Bluetooth 5.3',
        'Webcam': '8MP UHD MIPI Camera with Computer Vision human presence detection'
      }
    },
    metrics: {
      screenSizeInches: 14.0,
      ramGB: 32,
      storageGB: 1000,
      batteryWattHours: 57,
      batteryLifeHours: 12.5,
      weightKg: 1.09,
      refreshRateHz: 120,
      brightnessNits: 500,
      benchmarkScore: 14800,
      priceUSD: 1999
    }
  },

  // ==================== SMART TVS ====================
  {
    id: 'lg-oled-evo-g4-65',
    name: 'LG OLED evo G4 65" 4K Smart TV',
    brand: 'LG',
    category: 'smart-tvs',
    modelNumber: 'OLED65G4SUB',
    series: 'LG OLED Gallery G4',
    price: 279990,
    currency: 'INR',
    priceINR: 279990,
    releaseDate: '2024-03-25',
    popularity: 96,
    verified: true,
    isUserAdded: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'LG flagship MLA (Micro Lens Array) 2nd Gen OLED TV featuring the bleeding-edge α11 AI Processor 4K, 144Hz PC gaming mode, zero-gap wall mount design, and 5-year OLED panel warranty.',
    pros: ['Industry-defining MLA panel reaching 1500+ nits peak white', 'α11 AI processor 4K with Peak Highlighter & AI Super Upscaling', '4x full-bandwidth 48Gbps HDMI 2.1 ports with 144Hz & G-SYNC', '5-year manufacturer panel warranty included'],
    cons: ['Tabletop stand sold separately (designed primarily for flush wall mounting)', 'No HDR10+ support (LG supports Dolby Vision and HDR10)'],
    specifications: {
      'General': {
        'Operating System': 'webOS 24 (4 guaranteed yearly upgrades with Re:New)',
        'Model Number': 'OLED65G4SUB',
        'Release Date': 'March 2024',
        'Dimensions (without stand)': '144.1 x 82.6 x 2.4 cm',
        'Weight (without stand)': '23.8 kg',
        'Mount Type': 'Flush Wall Mount (included in box)'
      },
      'Display': {
        'Screen Size': '65 inches',
        'Display Technology': 'OLED evo with Micro Lens Array (MLA 2.0)',
        'Resolution': '3840 x 2160 pixels (4K UHD)',
        'Refresh Rate': '144 Hz Native (VRR, G-SYNC, FreeSync Premium)',
        'HDR Support': 'Dolby Vision, HDR10, HLG, Filmmaker Mode',
        'Peak Brightness': '1550 nits (10% window HDR)',
        'Color Gamut': '100% DCI-P3, Perfect Color & Infinite Contrast'
      },
      'Audio': {
        'Sound Output': '60 Watts Total',
        'Speaker Configuration': '4.2 Channel down-firing with dual woofers',
        'Audio Technology': 'Dolby Atmos, α11 AI Sound Pro (Virtual 11.1.2 upmix), WOW Orchestra',
        'eARC Support': 'Yes (eARC on HDMI 2)'
      },
      'Smart Features': {
        'Processor': 'α11 AI Processor 4K (4x AI graphics power)',
        'Voice Assistants': 'LG ThinQ, Amazon Alexa built-in, Apple HomeKit / AirPlay 2',
        'Smart Ecosystem': 'Matter compatible, Multi-View 4-way split, Web browser'
      },
      'Connectivity': {
        'HDMI Ports': '4x HDMI 2.1 (48Gbps, 4K 144Hz, VRR, ALLM, QMS)',
        'USB Ports': '3x USB 2.0',
        'Wi-Fi': 'Wi-Fi 6 (802.11ax)',
        'Bluetooth': 'Bluetooth 5.1 with Surround Ready'
      }
    },
    metrics: {
      screenSizeInches: 65,
      refreshRateHz: 144,
      brightnessNits: 1550,
      soundOutputWatts: 60,
      hdmiPortsCount: 4,
      usbPortsCount: 3,
      priceUSD: 2799
    }
  },
  {
    id: 'samsung-s95d-qd-oled-65',
    name: 'Samsung S95D QD-OLED 65" 4K Smart TV',
    brand: 'Samsung',
    category: 'smart-tvs',
    modelNumber: 'QN65S95DAFXZA',
    series: 'Samsung QD-OLED Flagship',
    price: 299990,
    currency: 'INR',
    priceINR: 299990,
    releaseDate: '2024-04-05',
    popularity: 95,
    verified: true,
    isUserAdded: false,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Revolutionary 3rd Generation Quantum Dot OLED featuring anti-glare OLED Glare Free matte coating, Slim One Connect box, NQ4 AI Gen2 Processor, and 70W 4.2.2ch Object Tracking Sound+.',
    pros: ['Game-changing OLED Glare Free coating kills ambient reflections', 'Stupendous color volume with Quantum Dot pure RGB primaries', 'External One Connect Box keeps cables totally invisible', '4K 144Hz across all 4 HDMI 2.1 ports'],
    cons: ['Lacks Dolby Vision support (Samsung uses HDR10+ Adaptive)', 'Matte finish can slightly lift deep blacks under very direct sunlight'],
    specifications: {
      'General': {
        'Operating System': 'Tizen OS 8.0 (Daily Board, Samsung Gaming Hub)',
        'Model Number': 'QN65S95DAFXZA',
        'Release Date': 'April 2024',
        'Dimensions (without stand)': '144.3 x 82.8 x 1.1 cm (Ultra-slim 11mm)',
        'Weight (without stand)': '18.9 kg',
        'Mount Type': 'VESA 400x300, Slim Fit Wall Mount compatible'
      },
      'Display': {
        'Screen Size': '65 inches',
        'Display Technology': '3rd Gen QD-OLED (Quantum Dot OLED with Glare-Free filter)',
        'Resolution': '3840 x 2160 pixels (4K UHD)',
        'Refresh Rate': '144 Hz (FreeSync Premium Pro, VRR)',
        'HDR Support': 'HDR10+, HDR10+ Gaming, HDR10, HLG',
        'Peak Brightness': '1650 nits (10% window HDR)',
        'Color Gamut': '99.8% DCI-P3, 90% Rec.2020 (Pantone Validated)'
      },
      'Audio': {
        'Sound Output': '70 Watts RMS',
        'Speaker Configuration': '4.2.2 Channel with up-firing height channels',
        'Audio Technology': 'Dolby Atmos, Object Tracking Sound+ (OTS+), Q-Symphony',
        'eARC Support': 'Yes (HDMI 3)'
      },
      'Smart Features': {
        'Processor': 'NQ4 AI Gen2 Processor (20 neural networks)',
        'Voice Assistants': 'Bixby, Amazon Alexa built-in',
        'Smart Ecosystem': 'SmartThings Hub built-in, Matter, SolarCell Remote'
      },
      'Connectivity': {
        'HDMI Ports': '4x HDMI 2.1 (40Gbps, 4K 144Hz, eARC, ALLM)',
        'USB Ports': '3x USB-A, 1x USB-C (on One Connect box)',
        'Wi-Fi': 'Wi-Fi 5 (802.11ac)',
        'Bluetooth': 'Bluetooth 5.2'
      }
    },
    metrics: {
      screenSizeInches: 65,
      refreshRateHz: 144,
      brightnessNits: 1650,
      soundOutputWatts: 70,
      hdmiPortsCount: 4,
      usbPortsCount: 3,
      priceUSD: 2999
    }
  },

  // ==================== AIR CONDITIONERS ====================
  {
    id: 'daikin-1-5-ton-5-star-inverter-ac',
    name: 'Daikin 1.5 Ton 5 Star Inverter Split AC',
    brand: 'Daikin',
    category: 'air-conditioners',
    modelNumber: 'FTKM50U',
    series: 'Daikin FTKM Series',
    price: 48990,
    currency: 'INR',
    priceINR: 48990,
    releaseDate: '2024-02-15',
    popularity: 95,
    verified: true,
    isUserAdded: false,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Premium Japanese inverter split AC engineered for extreme climates up to 54°C, featuring Patented Swing Compressor, 5.2 ISEER star rating, Coanda airflow, and PM2.5 titanium air purifying filter.',
    pros: ['Supreme ISEER 5.2 energy efficiency rating', 'Whisper-quiet 30 dB indoor operation', 'Patented Neo Swing Compressor eliminates friction', 'Cooling operation sustained up to 54°C ambient'],
    cons: ['Wi-Fi smart dongle is an optional accessory in basic package', 'Slightly higher initial investment than entry 3-star brands'],
    specifications: {
      'General': {
        'AC Type': 'Split Inverter AC',
        'Model Number': 'FTKM50U',
        'Capacity': '1.5 Ton (5280 Watts full cooling capacity)',
        'Suitability': 'Medium rooms (120 to 180 sq ft)',
        'Refrigerant': 'R32 Green Eco-friendly refrigerant',
        'Dimensions Indoor Unit': '88.5 x 29.8 x 22.9 cm (11.5 kg)'
      },
      'Cooling & Performance': {
        'Cooling Capacity': '5280 W (Rated) / 6000 W (Max Turbo)',
        'Compressor Type': 'Patented Swing Inverter Compressor',
        'Air Flow': '572 CFM (16.2 CMM)',
        'Air Throw': 'Up to 16 meters (Coanda 3D Airflow)',
        'Operating Temp Range': 'Up to 54°C ambient temperature'
      },
      'Energy Efficiency': {
        'Energy Star Rating': '5 Star (BEE Certified)',
        'ISEER Rating': '5.20',
        'Annual Energy Consumption': '785.6 kWh / year',
        'Power Consumption': '1310 Watts rated'
      },
      'Noise & Comfort': {
        'Indoor Unit Noise Level': '30 dB (Silent sleep mode)',
        'Outdoor Unit Noise Level': '51 dB',
        'Dehumidification': '1.8 Liters / hour',
        'Filtration': 'PM 2.5 Micro Filter + Titanium Apatite deodorizer'
      },
      'Smart Features': {
        'Smart Connectivity': 'Wi-Fi Enabled (Daikin Mobile Controller app)',
        'Voice Assistant': 'Amazon Alexa & Google Assistant compatible',
        'Modes': 'Econo Mode, Power Chill, Good Sleep Timer, Dew Clean'
      },
      'Warranty': {
        'Comprehensive Warranty': '1 Year on Unit & PCB',
        'Compressor Warranty': '10 Years on Inverter Compressor',
        'PCB Warranty': '5 Years on printed circuit board'
      }
    },
    metrics: {
      capacityTons: 1.5,
      energyRatingStars: 5,
      iseerRating: 5.2,
      annualEnergyKwh: 785.6,
      coolingCapacityWatts: 5280,
      noiseLevelDb: 30,
      warrantyYearsCompressor: 10,
      priceUSD: 650
    }
  },
  {
    id: 'lg-1-5-ton-5-star-ai-dual-inverter-ac',
    name: 'LG 1.5 Ton 5 Star AI DUAL Inverter AC',
    brand: 'LG',
    category: 'air-conditioners',
    modelNumber: 'TS-Q19YNZE',
    series: 'LG DUALCOOL Series',
    price: 46990,
    currency: 'INR',
    priceINR: 46990,
    releaseDate: '2024-03-01',
    popularity: 96,
    verified: true,
    isUserAdded: false,
    rating: 4.82,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'High-tech AI convertible split AC with Dual Rotary Inverter compressor, 6-in-1 convertible cooling modes, AI VIRAAT fast chilling mode, built-in LG ThinQ Wi-Fi, and 100% ocean black fin copper protection.',
    pros: ['Ultra-silent 28 dB indoor operation', 'AI Convertible 6-in-1 cooling adjusts tonnage dynamically', 'Built-in Wi-Fi with LG ThinQ voice control', 'Ocean Black Fin anti-corrosion coating'],
    cons: ['Remote control backlighting could be brighter', 'Requires regular filter cleaning notification awareness'],
    specifications: {
      'General': {
        'AC Type': 'Split Inverter AC',
        'Model Number': 'TS-Q19YNZE',
        'Capacity': '1.5 Ton (5000 W rated cooling capacity)',
        'Suitability': 'Medium rooms (150 to 180 sq ft)',
        'Refrigerant': 'R32 Eco Refrigerant',
        'Dimensions Indoor Unit': '89.5 x 30.7 x 23.5 cm (11.0 kg)'
      },
      'Cooling & Performance': {
        'Cooling Capacity': '5000 W (40% to 110% AI Convertible 6-in-1)',
        'Compressor Type': 'Dual Rotary Inverter Compressor',
        'Air Flow': '650 CFM',
        'Air Throw': 'Up to 15 meters with 4-Way Swing',
        'Operating Temp Range': 'Up to 52°C ambient temperature'
      },
      'Energy Efficiency': {
        'Energy Star Rating': '5 Star (BEE Certified)',
        'ISEER Rating': '5.20',
        'Annual Energy Consumption': '772.3 kWh / year',
        'Power Consumption': '1290 Watts rated'
      },
      'Noise & Comfort': {
        'Indoor Unit Noise Level': '28 dB (Super Silent)',
        'Outdoor Unit Noise Level': '52 dB',
        'Dehumidification': '2.0 Liters / hour',
        'Filtration': 'HD Filter with Anti-Virus & Anti-Bacterial protection'
      },
      'Smart Features': {
        'Smart Connectivity': 'Built-in Wi-Fi (LG ThinQ app)',
        'Voice Assistant': 'Works with Google Assistant and Amazon Alexa',
        'Modes': 'AI VIRAAT mode, Diet Mode, Auto Clean, Low Gas Detection'
      },
      'Warranty': {
        'Comprehensive Warranty': '1 Year on Product',
        'Compressor Warranty': '10 Years on Dual Inverter Compressor',
        'PCB Warranty': '5 Years on PCB'
      }
    },
    metrics: {
      capacityTons: 1.5,
      energyRatingStars: 5,
      iseerRating: 5.2,
      annualEnergyKwh: 772.3,
      coolingCapacityWatts: 5000,
      noiseLevelDb: 28,
      warrantyYearsCompressor: 10,
      priceUSD: 620
    }
  },

  // ==================== SMARTWATCHES ====================
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 (49mm Titanium)',
    brand: 'Apple',
    category: 'smartwatches',
    modelNumber: 'MRF43LL/A',
    series: 'Apple Watch Ultra',
    price: 89900,
    currency: 'INR',
    priceINR: 89900,
    releaseDate: '2024-09-20',
    popularity: 97,
    verified: true,
    isUserAdded: false,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The definitive rugged smartwatch crafted from aerospace-grade natural/black titanium, featuring S9 SiP with Double Tap gesture, 3000 nits display, precision dual-frequency GPS, and EN13319 dive computer certification.',
    pros: ['Sublime 3000 nits display visible under searing sun', 'Precision dual-frequency L1 + L5 GPS', 'Full EN13319 certification for scuba diving to 40m', 'S9 SiP enables hands-free Double Tap pinch gesture'],
    cons: ['36-72 hour battery requires regular charging compared to Garmin', 'Only compatible with Apple iPhones'],
    specifications: {
      'General': {
        'Operating System': 'watchOS 11',
        'Model Number': 'MRF43LL/A',
        'Release Date': 'September 2024',
        'Weight': '61.4 g (without band)',
        'Dimensions': '49 x 44 x 14.4 mm',
        'Case Material': 'Aerospace-Grade Titanium with Sapphire Crystal Front'
      },
      'Display': {
        'Display Size': '1.92 inches (49mm)',
        'Display Resolution': '502 x 410 pixels',
        'Display Technology': 'Always-On LTPO OLED Display',
        'Peak Brightness': '3000 nits (1 nit night mode)',
        'Touch Features': 'Double Tap Gesture, Customizable Action Button'
      },
      'Health & Sensors': {
        'Heart Rate Sensor': '3rd Gen Optical Heart Rate Sensor with ECG App',
        'Blood Oxygen': 'SpO2 Sensor (subject to regional clearance)',
        'Temperature Sensing': 'Dual-sensor wrist temperature tracking (sleep & cycle)',
        'Dive Sensors': 'Depth Gauge to 40m, Water Temperature Sensor, Oceanic+ App'
      },
      'Battery & Charging': {
        'Battery Capacity': '542 mAh',
        'Battery Life': '36 hours normal use, up to 72 hours in Low Power Mode',
        'Charging Type': 'Fast Magnetic USB-C Charger (0 to 80% in 60 mins)'
      },
      'Durability': {
        'Water Resistance': '100m Water Resistance (WR100, EN13319 Dive Certified)',
        'Dust Resistance': 'IP6X Dust Resistant',
        'Military Standard': 'Tested to MIL-STD 810H'
      },
      'Connectivity': {
        'Cellular': 'LTE and UMTS (eSIM Built-in)',
        'GPS': 'Precision Dual-frequency GPS (L1 and L5)',
        'Wi-Fi': 'Wi-Fi 4 (802.11n)',
        'Bluetooth': 'Bluetooth 5.3',
        'NFC / Wallet': 'Apple Pay with GymKit'
      }
    },
    metrics: {
      screenSizeInches: 1.92,
      brightnessNits: 3000,
      batteryLifeHours: 72,
      batteryCapacityMAh: 542,
      waterResistanceMeters: 100,
      weightGrams: 61.4,
      storageGB: 64,
      priceUSD: 799
    }
  },
  {
    id: 'samsung-galaxy-watch-ultra',
    name: 'Samsung Galaxy Watch Ultra (47mm)',
    brand: 'Samsung',
    category: 'smartwatches',
    modelNumber: 'SM-L705U',
    series: 'Galaxy Watch Ultra',
    price: 59999,
    currency: 'INR',
    priceINR: 59999,
    releaseDate: '2024-07-24',
    popularity: 94,
    verified: true,
    isUserAdded: false,
    rating: 4.84,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'Extreme adventure wearable crafted with cushion-design Grade 4 titanium chassis, 3nm Exynos W1000 penta-core processor, 3000 nits sapphire display, multi-sport quick button, and up to 100 hours of battery.',
    pros: ['3nm Exynos W1000 delivers lightning-smooth Wear OS UI', 'Huge 590 mAh battery lasts up to 100 hours in power saving', '100m water resistance + 10 ATM rated', 'Emergency siren 86 dB audible up to 180 meters'],
    cons: ['Cushion shape is polarizing for dress occasions', 'Advanced health metrics require Samsung Galaxy smartphone'],
    specifications: {
      'General': {
        'Operating System': 'Wear OS 5 powered by Samsung (One UI 6 Watch)',
        'Model Number': 'SM-L705U',
        'Release Date': 'July 2024',
        'Weight': '60.5 g (without strap)',
        'Dimensions': '47.4 x 47.4 x 12.1 mm',
        'Case Material': 'Grade 4 Titanium Case, Sapphire Crystal Front'
      },
      'Display': {
        'Display Size': '1.5 inches',
        'Display Resolution': '480 x 480 pixels (Super AMOLED)',
        'Display Technology': 'Always-On Super AMOLED with Sapphire Glass',
        'Peak Brightness': '3000 nits (Night Mode Red UI)',
        'Touch Features': 'Quick Button, Digital Bezel, Pinch Gestures'
      },
      'Health & Sensors': {
        'Heart Rate Sensor': 'BioActive Sensor (Optical Heart Rate + Electrical ECG + Bioelectrical Impedance BIA)',
        'Health Metrics': 'Vascular Age (AGEs index), Blood Pressure, Body Composition, Sleep Apnea detection',
        'Emergency Features': '86 dB Emergency Siren, Fall Detection, SOS'
      },
      'Battery & Charging': {
        'Battery Capacity': '590 mAh',
        'Battery Life': 'Up to 100 hours in Exercise Power Saving, 48 hours normal',
        'Charging Type': 'WPC Fast Wireless Charging (10W)'
      },
      'Durability': {
        'Water Resistance': '10 ATM (100 meters) & IP68',
        'Dust Resistance': 'IP68 Dust Resistant',
        'Military Standard': 'MIL-STD-810H durability rated for altitude -500m to 9000m'
      },
      'Connectivity': {
        'Cellular': '4G LTE (eSIM)',
        'GPS': 'Dual-Frequency GPS (L1 + L5)',
        'Wi-Fi': 'Wi-Fi 802.11a/b/g/n (2.4GHz + 5GHz)',
        'Bluetooth': 'Bluetooth 5.3',
        'NFC / Wallet': 'Samsung Wallet & Google Wallet'
      }
    },
    metrics: {
      screenSizeInches: 1.5,
      brightnessNits: 3000,
      batteryLifeHours: 100,
      batteryCapacityMAh: 590,
      waterResistanceMeters: 100,
      weightGrams: 60.5,
      storageGB: 32,
      priceUSD: 649
    }
  },

  // ==================== HEADPHONES & EARBUDS ====================
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'headphones',
    modelNumber: 'WH1000XM5/B',
    series: '1000X Series',
    price: 29990,
    currency: 'INR',
    priceINR: 29990,
    releaseDate: '2022-05-20',
    popularity: 98,
    verified: true,
    isUserAdded: false,
    rating: 4.86,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The benchmark of noise cancellation featuring dual processors (QN1 + V1), 8 microphones, specially engineered 30mm carbon composite drivers, LDAC high-res audio, and 30 hours of battery life.',
    pros: ['Gold standard Active Noise Cancellation with auto-optimizer', 'Supreme comfort with soft-fit leather and featherlight 250g weight', 'Exceptional microphone voice pickup with 4 beamforming mics and AI DNN', 'Quick charge provides 3 hours playback in 3 minutes'],
    cons: ['Earcups do not fold inwards into a compact ball like XM4', 'No IP water resistance rating'],
    specifications: {
      'General': {
        'Headphone Type': 'Over-Ear Circumaural, Closed-Back',
        'Model Number': 'WH1000XM5/B',
        'Release Date': 'May 2022',
        'Weight': '250 g',
        'Ear Cushion': 'Soft Fit Synthetic Leather'
      },
      'Audio Quality': {
        'Driver Size': '30 mm with Carbon Fiber Composite Dome',
        'Frequency Response': '4 Hz - 40,000 Hz (JEITA)',
        'Hi-Res Audio': 'Hi-Res Audio Wireless Certified & LDAC support',
        'Sound Enhancement': 'DSEE Extreme AI upscaling engine, 360 Reality Audio'
      },
      'Active Noise Cancellation': {
        'ANC Processors': 'Dual Processor (HD Noise Cancelling Processor QN1 + Integrated Processor V1)',
        'Microphone Array': '8 Microphones total (4 on each ear cup)',
        'Ambient Sound Mode': '20-level Ambient Sound Control with Speak-to-Chat'
      },
      'Battery Life': {
        'Battery with ANC ON': '30 Hours continuous playback',
        'Battery with ANC OFF': '40 Hours continuous playback',
        'Charging Speed': 'USB PD Fast Charging (3 minutes gives 3 hours playback)',
        'Full Charge Time': '3.5 Hours via USB-C'
      },
      'Connectivity': {
        'Bluetooth Version': 'Bluetooth 5.2',
        'Supported Codecs': 'LDAC, AAC, SBC',
        'Multipoint Connection': 'Yes (simultaneously pair 2 devices)',
        'Wired Connection': '3.5 mm gold-plated audio cable (included)'
      }
    },
    metrics: {
      batteryLifeHours: 30,
      weightGrams: 250,
      driverSizeMm: 30,
      noiseCancellingMics: 8,
      priceUSD: 399
    }
  },
  {
    id: 'apple-airpods-max-usbc',
    name: 'Apple AirPods Max (USB-C)',
    brand: 'Apple',
    category: 'headphones',
    modelNumber: 'MW463AM/A',
    series: 'AirPods Max',
    price: 59900,
    currency: 'INR',
    priceINR: 59900,
    releaseDate: '2024-09-20',
    popularity: 96,
    verified: true,
    isUserAdded: false,
    rating: 4.82,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'High-fidelity audio masterpiece engineered with anodized aluminum ear cups, breathable knit-mesh canopy, Apple-designed 40mm dynamic driver, personalized Spatial Audio with head tracking, and modern USB-C charging.',
    pros: ['Best-in-class Transparency Mode in any consumer headphone', 'Personalized Spatial Audio with dynamic head tracking', 'Luxurious acoustic seal with anodized aluminum and stainless steel', 'Modern USB-C port with lossless audio support'],
    cons: ['Heavier at 385g compared to Sony/Bose rivals', 'Included Smart Case offers minimal travel protection'],
    specifications: {
      'General': {
        'Headphone Type': 'Over-Ear Circumaural, Acoustic-Seal Closed Back',
        'Model Number': 'MW463AM/A',
        'Release Date': 'September 2024',
        'Weight': '384.8 g',
        'Canopy & Ear Cushion': 'Knit Mesh Headband Canopy, Acoustically Engineered Memory Foam'
      },
      'Audio Quality': {
        'Driver Size': '40 mm Apple-Designed Dynamic Driver',
        'Total Harmonic Distortion': 'Less than 1% across audible range',
        'Spatial Audio': 'Personalized Spatial Audio with Dynamic Head Tracking',
        'Chipset': 'Apple H1 Headphone Chip in each ear cup (10 audio cores)'
      },
      'Active Noise Cancellation': {
        'ANC Technology': 'Pro-level Active Noise Cancellation with Adaptive EQ',
        'Transparency Mode': 'Ultra-natural Audio Transparency Mode',
        'Microphone Array': '9 Microphones total (8 for ANC, 3 for voice pickup)'
      },
      'Battery Life': {
        'Battery with ANC ON': '20 Hours continuous playback or talk time',
        'Charging Speed': '5 minutes of charge gives 1.5 hours of listening time',
        'Charging Interface': 'USB Type-C port'
      },
      'Connectivity': {
        'Bluetooth Version': 'Bluetooth 5.0',
        'Supported Codecs': 'AAC, SBC, Apple Lossless over USB-C',
        'Seamless Switching': 'Automatic device switching across iCloud Apple ecosystem'
      }
    },
    metrics: {
      batteryLifeHours: 20,
      weightGrams: 384.8,
      driverSizeMm: 40,
      noiseCancellingMics: 8,
      priceUSD: 549
    }
  },

  // ==================== GAMING CONSOLES ====================
  {
    id: 'sony-playstation-5-pro',
    name: 'Sony PlayStation 5 Pro',
    brand: 'Sony',
    category: 'gaming-consoles',
    modelNumber: 'CFI-7000B',
    series: 'PlayStation 5',
    price: 69990,
    currency: 'INR',
    priceINR: 69990,
    releaseDate: '2024-11-07',
    popularity: 97,
    verified: true,
    isUserAdded: false,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The pinnacle of console gaming performance featuring an upgraded GPU with 67% more compute units, advanced Ray Tracing at up to 3x speed, PlayStation Spectral Super Resolution (PSSR) AI upscaling, and 2TB SSD.',
    pros: ['PSSR AI upscaling delivers 4K 60fps fidelity mode quality at performance frame rates', 'Massive 2TB custom NVMe SSD included standard', 'Up to 3x faster ray tracing reflections and shadows', 'Wi-Fi 7 wireless network readiness'],
    cons: ['Disc Drive and vertical stand sold separately', '$699 price point is premium for a console'],
    specifications: {
      'General': {
        'Console Type': 'Home Gaming Console',
        'Model Number': 'CFI-7000B',
        'Release Date': 'November 2024',
        'Weight': '3.1 kg',
        'Dimensions': '388 x 89 x 216 mm'
      },
      'Compute & Graphics': {
        'Processor (CPU)': 'AMD Zen 2 (8 Cores / 16 Threads, up to 3.85 GHz boost)',
        'Graphics (GPU)': 'RDNA 3-derived architecture (16.7 TFLOPs FP32, 67% more compute units)',
        'AI Upscaling': 'PlayStation Spectral Super Resolution (PSSR)',
        'Ray Tracing': 'Advanced 2x-3x Ray Tracing Hardware Engine'
      },
      'Storage & Memory': {
        'System Memory': '16 GB GDDR6 (576 GB/s) + 2 GB DDR5 for OS',
        'Internal Storage': '2 TB Custom NVMe SSD (5.5 GB/s Raw Read)',
        'Expandable Storage': '1x Standard M.2 NVMe SSD slot (PCIe Gen 4)'
      },
      'Output & Video': {
        'Video Output': 'HDMI 2.1 (supports 4K 120Hz, 8K 60Hz, VRR)',
        'Audio Output': 'Tempest 3D AudioTech, Dolby Atmos, DTS:X',
        'Optical Disc': 'Optional modular Ultra HD Blu-ray disc drive'
      },
      'Connectivity': {
        'Wi-Fi': 'Wi-Fi 7 (IEEE 802.11be)',
        'Ethernet': 'Gigabit Ethernet (10BASE-T, 100BASE-TX, 1000BASE-T)',
        'USB Ports': '2x USB-C front (10Gbps), 2x USB-A rear (10Gbps)',
        'Bluetooth': 'Bluetooth 5.1'
      }
    },
    metrics: {
      teraflops: 16.7,
      ramGB: 16,
      storageGB: 2000,
      weightKg: 3.1,
      powerWatts: 390,
      priceUSD: 699
    }
  },
  {
    id: 'microsoft-xbox-series-x',
    name: 'Microsoft Xbox Series X (1TB)',
    brand: 'Microsoft',
    category: 'gaming-consoles',
    modelNumber: 'RRT-00001',
    series: 'Xbox Series',
    price: 55990,
    currency: 'INR',
    priceINR: 55990,
    releaseDate: '2020-11-10',
    popularity: 93,
    verified: true,
    isUserAdded: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The fastest, most powerful Xbox ever engineered, featuring 12 teraflops of graphical processing power, 1TB NVMe SSD with Xbox Velocity Architecture, 4K Blu-ray disc drive, and Quick Resume.',
    pros: ['Game Pass Ultimate integration offers unmatched subscription value', 'Quick Resume lets you switch between 5+ games instantly', 'Built-in 4K UHD Blu-ray disc drive included', 'Backwards compatibility with four generations of Xbox titles'],
    cons: ['Proprietary storage expansion cards are pricier than standard M.2 NVMe', 'Fewer 2024 first-party exclusive graphical showcases than rivals'],
    specifications: {
      'General': {
        'Console Type': 'Home Gaming Console with 4K UHD Blu-ray',
        'Model Number': 'RRT-00001',
        'Release Date': 'November 2020',
        'Weight': '4.45 kg',
        'Dimensions': '151 x 151 x 301 mm'
      },
      'Compute & Graphics': {
        'Processor (CPU)': 'Custom AMD Zen 2 (8 Cores @ 3.8 GHz, 3.66 GHz with SMT)',
        'Graphics (GPU)': 'Custom RDNA 2 (12.15 TFLOPs, 52 CUs @ 1.825 GHz)',
        'Ray Tracing': 'Hardware-accelerated DirectX Raytracing (DXR)',
        'Variable Rate Shading': 'VRS Tier 2 supported'
      },
      'Storage & Memory': {
        'System Memory': '16 GB GDDR6 (10GB @ 560 GB/s, 6GB @ 336 GB/s)',
        'Internal Storage': '1 TB Custom NVMe SSD (2.4 GB/s Raw, 4.8 GB/s Compressed)',
        'Expandable Storage': 'Seagate / Western Digital Storage Expansion Card slot'
      },
      'Output & Video': {
        'Video Output': 'HDMI 2.1 (4K at 120Hz, 8K HDR, VRR, ALLM, Dolby Vision Gaming)',
        'Audio Output': 'Dolby Atmos, DTS:X, Windows Sonic Spatial Sound',
        'Optical Disc': 'Built-in 4K UHD Blu-Ray Drive'
      },
      'Connectivity': {
        'Wi-Fi': 'Dual Band Wi-Fi 5 (802.11ac)',
        'Ethernet': 'Gigabit Ethernet',
        'USB Ports': '3x USB 3.1 Gen 1 ports',
        'Wireless Controller': 'Xbox Wireless radio + Bluetooth'
      }
    },
    metrics: {
      teraflops: 12.15,
      ramGB: 16,
      storageGB: 1000,
      weightKg: 4.45,
      powerWatts: 315,
      priceUSD: 499
    }
  },

  // ==================== MONITORS ====================
  {
    id: 'asus-rog-swift-oled-pg32ucdm',
    name: 'ASUS ROG Swift OLED PG32UCDM 32" 4K 240Hz',
    brand: 'Asus',
    category: 'monitors',
    modelNumber: 'PG32UCDM',
    series: 'ROG Swift',
    price: 129990,
    currency: 'INR',
    priceINR: 129990,
    releaseDate: '2024-02-15',
    popularity: 96,
    verified: true,
    isUserAdded: false,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The holy grail of gaming monitors combining 32-inch 4K resolution with 240Hz QD-OLED panel, 0.03ms response time, custom graphene heatsink, Dolby Vision, and 90W USB-C Power Delivery.',
    pros: ['Pristine 4K clarity paired with lightning 240Hz refresh rate', 'Instantaneous 0.03ms response time with zero ghosting', 'Graphene film & custom heatsink cooling without noisy fans', 'KVM switch and 90W USB-C Type-C hub built-in'],
    cons: ['QD-OLED black levels raise slightly in brightly lit rooms', 'Premium price tag'],
    specifications: {
      'General': {
        'Monitor Type': '32-inch Flat 4K Gaming Monitor',
        'Model Number': 'PG32UCDM',
        'Release Date': 'February 2024',
        'Dimensions (with stand)': '71.8 x 57.9 x 27.4 cm',
        'Weight (with stand)': '8.8 kg'
      },
      'Panel & Display': {
        'Screen Size': '31.5 inches',
        'Display Technology': '3rd Gen QD-OLED',
        'Resolution': '3840 x 2160 pixels (4K UHD)',
        'Pixel Pitch': '140 ppi (Sharp text rendering)',
        'Aspect Ratio': '16:9',
        'Peak Brightness': '1000 nits (3% window HDR), 450 nits (10%)',
        'Contrast Ratio': '1,500,000:1 (Infinite)'
      },
      'Gaming Features': {
        'Refresh Rate': '240 Hz',
        'Response Time': '0.03 ms (GTG)',
        'Variable Refresh Rate': 'NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro',
        'HDR Standards': 'Dolby Vision, HDR10, DisplayHDR True Black 400'
      },
      'Color & Accuracy': {
        'Color Gamut': '99% DCI-P3, 10-bit Color (1.07 Billion Colors)',
        'Color Accuracy': 'Factory Pre-Calibrated Delta E < 2'
      },
      'Ports & Connectivity': {
        'Video Ports': '1x DisplayPort 1.4 (DSC), 2x HDMI 2.1 (full 48Gbps)',
        'USB-C': '1x USB-C (DisplayPort Alt Mode & 90W USB Power Delivery)',
        'USB Hub': '3x USB 3.2 Gen 1 Type-A, 1x Optical S/PDIF Out, 3.5mm Earphone Jack',
        'KVM Switch': 'Smart KVM Switch to control 2 PCs with 1 keyboard/mouse'
      }
    },
    metrics: {
      screenSizeInches: 31.5,
      refreshRateHz: 240,
      responseTimeMs: 0.03,
      resolutionPixels: 3840 * 2160,
      brightnessNits: 1000,
      usbCPowerDeliveryWatts: 90,
      priceUSD: 1299
    }
  },

  // ==================== CAMERAS ====================
  {
    id: 'sony-alpha-a7-iv',
    name: 'Sony Alpha A7 IV Full-Frame Camera',
    brand: 'Sony',
    category: 'cameras',
    modelNumber: 'ILCE-7M4',
    series: 'Alpha Series',
    price: 242990,
    currency: 'INR',
    priceINR: 242990,
    releaseDate: '2021-12-15',
    popularity: 95,
    verified: true,
    isUserAdded: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The benchmark hybrid mirrorless camera with 33MP Exmor R back-illuminated sensor, BIONZ XR processing, 759-point real-time eye autofocus, 4K 60p 10-bit 4:2:2 video, and 5.5-stop in-body stabilization.',
    pros: ['33MP full-frame sensor strikes ideal balance of resolution and speed', 'Industry-leading real-time eye tracking for humans, animals, and birds', 'Full-size HDMI port and CFexpress Type A / SD dual slots', 'Fully articulating side-opening vari-angle LCD'],
    cons: ['4K 60p video has a 1.5x Super35 crop', 'Rolling shutter is average when shooting fast action with electronic shutter'],
    specifications: {
      'General': {
        'Camera Type': 'Full-Frame Mirrorless Interchangeable Lens Camera',
        'Model Number': 'ILCE-7M4',
        'Release Date': 'December 2021',
        'Weight': '658 g (with battery and memory card)',
        'Dimensions': '131.3 x 96.4 x 79.8 mm',
        'Lens Mount': 'Sony E-Mount'
      },
      'Sensor & Image Quality': {
        'Sensor Type': '33.0 Megapixel Full-Frame (35.9 x 23.9 mm) Exmor R BSI CMOS',
        'Image Processor': 'BIONZ XR Engine (8x more processing power)',
        'ISO Sensitivity': 'ISO 100 - 51,200 (Expandable to ISO 50 - 204,800)',
        'Dynamic Range': '15 stops of dynamic range'
      },
      'Autofocus & Stabilization': {
        'AF Points': '759 phase-detection points covering 94% of frame',
        'Subject Detection': 'Real-Time Eye AF for Humans, Animals, and Birds (Photos & 4K Video)',
        'Image Stabilization': '5-Axis In-Body Image Stabilization (5.5 stops of compensation)'
      },
      'Video Capabilities': {
        'Video Recording': '4K 60p (Super35 crop) / 4K 30p (7K oversampled no crop)',
        'Color Profile': '10-bit 4:2:2 All-Intra, S-Cinetone, S-Log3, HLG',
        'Continuous Record': 'No 29-minute limit (heat dissipating structure)'
      },
      'Build & Storage': {
        'Memory Slots': 'Dual Slots: Slot 1 CFexpress Type A / SD UHS-II, Slot 2 SD UHS-II',
        'Viewfinder': '3.68 million-dot Quad-VGA OLED EVF (120fps)',
        'LCD Screen': '3.0-inch 1.03M-dot Vari-angle Touchscreen'
      },
      'Battery': {
        'Battery Model': 'NP-FZ100 Rechargeable Li-ion',
        'Battery Life': 'Approx. 580 shots (LCD) / 520 shots (EVF)',
        'Charging': 'USB Power Delivery via USB-C'
      }
    },
    metrics: {
      megapixels: 33,
      sensorSizeMm: 35.9,
      afPoints: 759,
      continuousFps: 10,
      stabilizationStops: 5.5,
      weightGrams: 658,
      priceUSD: 2498
    }
  },

  // ==================== ROUTERS & NETWORKING ====================
  {
    id: 'asus-rog-rapture-gt-axe16000',
    name: 'ASUS ROG Rapture GT-AXE16000 Quad-Band Wi-Fi 6E Gaming Router',
    brand: 'Asus',
    category: 'routers',
    modelNumber: 'GT-AXE16000',
    series: 'ROG Rapture',
    price: 59990,
    currency: 'INR',
    priceINR: 59990,
    releaseDate: '2022-09-10',
    popularity: 92,
    verified: true,
    isUserAdded: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    overview: 'The world first quad-band Wi-Fi 6E gaming router featuring up to 16,000 Mbps aggregate speed, dual 10Gbps Ethernet ports, 2.0 GHz quad-core 64-bit CPU, and ROG game acceleration suites.',
    pros: ['Monstrous aggregate wireless speed up to 16,000 Mbps', 'Dual 10G Ethernet ports for 10Gbps ISP or multi-gig NAS', 'Dedicated 6 GHz Wi-Fi band delivers clean zero-interference channels', 'Lifetime free AiProtection Pro commercial-grade network security'],
    cons: ['Substantial physical footprint with 8 large antennas', 'Requires high-speed multi-gig internet to fully utilize'],
    specifications: {
      'General': {
        'Device Type': 'Quad-Band Gaming & High-Performance Router',
        'Model Number': 'GT-AXE16000',
        'Release Date': 'September 2022',
        'Dimensions': '35.4 x 35.4 x 19.3 cm',
        'Weight': '2.42 kg'
      },
      'Wireless Performance': {
        'Wi-Fi Standard': 'Wi-Fi 6E (802.11ax) Quad-Band',
        'Total Bandwidth': '16,000 Mbps (16 Gbps aggregate)',
        'Band Breakdown': '6GHz (4804 Mbps) + 5GHz-1 (4804 Mbps) + 5GHz-2 (4804 Mbps) + 2.4GHz (1148 Mbps)',
        'Antennas': '8 External Antennas + 4 Internal Antennas'
      },
      'Hardware & Ports': {
        'Processor': '2.0 GHz Quad-Core 64-bit CPU',
        'Memory': '2 GB DDR4 RAM & 256 MB Flash',
        'WAN Ports': '1x 2.5 Gbps WAN/LAN port, Dual 10 Gbps WAN/LAN ports',
        'LAN Ports': '4x 1 Gbps Gigabit LAN ports, 2x 10 Gbps ports',
        'USB Ports': '1x USB 3.2 Gen 1, 1x USB 2.0'
      },
      'Coverage & Mesh': {
        'Coverage Area': 'Up to 4,000 sq ft',
        'Mesh Support': 'ASUS AiMesh compatible with other ASUS routers',
        'Beamforming': 'AiRadar Universal Beamforming'
      },
      'Security & Features': {
        'Security': 'Trend Micro AiProtection Pro, WPA3 Personal/Enterprise',
        'Gaming Features': 'Triple-level Game Acceleration, Mobile Game Mode, OpenNAT',
        'VPN Support': 'WireGuard, OpenVPN, IPSec, Fusion VPN client'
      }
    },
    metrics: {
      maxSpeedMbps: 16000,
      ethernetPortsCount: 7,
      maxEthernetSpeedGbps: 10,
      ramGB: 2,
      priceUSD: 599
    }
  }
];
