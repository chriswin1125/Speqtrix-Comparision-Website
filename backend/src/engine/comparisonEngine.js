/**
 * Comparison Engine for COMPARELY Platform
 * Evaluates 2, 3, or 4+ products of the same category with category-aware logic,
 * generates dynamic indicators (better, inferior, equal, neutral),
 * counts specification advantages, and synthesizes intelligent comparison summaries.
 */

// Rules dictionary for specification evaluation:
// type: 'higher_is_better' | 'lower_is_better' | 'boolean' | 'incomparable'
const SPEC_EVALUATION_RULES = {
  // Common / General
  'Weight': { type: 'lower_is_better', unit: 'g/kg', extractNum: true },
  'Price': { type: 'lower_is_better', unit: 'currency', extractNum: true },
  'RAM': { type: 'higher_is_better', unit: 'GB', extractNum: true },
  'Internal Storage': { type: 'higher_is_better', unit: 'GB', extractNum: true },
  'Storage': { type: 'higher_is_better', unit: 'GB', extractNum: true },
  'System Memory': { type: 'higher_is_better', unit: 'GB', extractNum: true },

  // Display
  'Refresh Rate': { type: 'higher_is_better', unit: 'Hz', extractNum: true },
  'Peak Brightness': { type: 'higher_is_better', unit: 'nits', extractNum: true },
  'Pixel Density': { type: 'higher_is_better', unit: 'ppi', extractNum: true },
  'Resolution': { type: 'higher_is_better', unit: 'pixels', special: 'resolution' },
  'Display Resolution': { type: 'higher_is_better', unit: 'pixels', special: 'resolution' },
  'Response Time': { type: 'lower_is_better', unit: 'ms', extractNum: true },

  // Battery & Power
  'Battery Capacity': { type: 'higher_is_better', unit: 'mAh/Wh', extractNum: true },
  'Charging Speed': { type: 'higher_is_better', unit: 'W', extractNum: true },
  'Estimated Battery Life': { type: 'higher_is_better', unit: 'hours', extractNum: true },
  'Battery Life': { type: 'higher_is_better', unit: 'hours', extractNum: true },
  'Battery with ANC ON': { type: 'higher_is_better', unit: 'hours', extractNum: true },
  'Power Consumption': { type: 'lower_is_better', unit: 'W', extractNum: true },
  'Annual Energy Consumption': { type: 'lower_is_better', unit: 'kWh', extractNum: true },

  // Performance / Benchmark
  'Antutu Benchmark Score': { type: 'higher_is_better', unit: 'score', extractNum: true },
  'Cinebench R23 Multi-Core': { type: 'higher_is_better', unit: 'score', extractNum: true },
  'Graphics (GPU)': { type: 'higher_is_better', unit: 'tflops', extractNum: true },
  'Total Bandwidth': { type: 'higher_is_better', unit: 'Mbps', extractNum: true },

  // Audio / Sound
  'Sound Output': { type: 'higher_is_better', unit: 'W', extractNum: true },
  'Microphone Array': { type: 'higher_is_better', unit: 'count', extractNum: true },
  'Noise Cancelling Mics': { type: 'higher_is_better', unit: 'count', extractNum: true },

  // Appliances (AC, Fridge, Washing)
  'ISEER Rating': { type: 'higher_is_better', unit: 'ratio', extractNum: true },
  'Energy Star Rating': { type: 'higher_is_better', unit: 'stars', extractNum: true },
  'Indoor Unit Noise Level': { type: 'lower_is_better', unit: 'dB', extractNum: true },
  'Noise Level': { type: 'lower_is_better', unit: 'dB', extractNum: true },
  'Cooling Capacity': { type: 'higher_is_better', unit: 'W', extractNum: true },
  'Air Throw': { type: 'higher_is_better', unit: 'meters', extractNum: true },
  'Compressor Warranty': { type: 'higher_is_better', unit: 'years', extractNum: true },

  // Wearables / Durability
  'Water Resistance': { type: 'higher_is_better', unit: 'meters', extractNum: true },

  // Cameras
  'Main Camera Sensor': { type: 'higher_is_better', unit: 'MP', extractNum: true },
  'Front Camera': { type: 'higher_is_better', unit: 'MP', extractNum: true },
  'AF Points': { type: 'higher_is_better', unit: 'points', extractNum: true },
  'Image Stabilization': { type: 'higher_is_better', unit: 'stops', extractNum: true },

  // Incomparable / Subjective
  'Processor': { type: 'incomparable' },
  'Operating System': { type: 'incomparable' },
  'Dimensions': { type: 'incomparable' },
  'Build Material': { type: 'incomparable' },
  'Model Number': { type: 'incomparable' },
  'Release Date': { type: 'incomparable' },
  'Ports': { type: 'incomparable' },
  'Wi-Fi': { type: 'incomparable' },
  'Bluetooth': { type: 'incomparable' }
};

/**
 * Extracts a representative numerical value from a spec string.
 * Example: "6000 mAh" -> 6000, "1.09 kg" -> 1.09, "5 Star (BEE)" -> 5
 */
function parseSpecNumber(valStr) {
  if (typeof valStr === 'number') return valStr;
  if (!valStr || typeof valStr !== 'string') return null;

  // Handle resolutions like "3120 x 1440"
  const resMatch = valStr.match(/(\d{3,4})\s*x\s*(\d{3,4})/i);
  if (resMatch) {
    return parseInt(resMatch[1], 10) * parseInt(resMatch[2], 10);
  }

  // Handle prices e.g. "₹79,999", "INR 79,999", "$1,299" -> 79999
  const priceMatch = valStr.match(/(?:[\$₹]|INR)\s*([\d,]+)/i);
  if (priceMatch) {
    return parseFloat(priceMatch[1].replace(/,/g, ''));
  }

  // Standard numbers like "5000 mAh", "16 GB", "120 Hz", "2.14 kg"
  const cleaned = valStr.replace(/,/g, '');
  const match = cleaned.match(/[-+]?\d*\.?\d+/);
  if (match) {
    return parseFloat(match[0]);
  }
  return null;
}

/**
 * Evaluates an array of specification values for a given key across N products.
 * Returns an array of evaluation tokens:
 * - 'better': Green Up Arrow 🟢 ↑
 * - 'inferior': Red Down Arrow 🔴 ↓
 * - 'equal': Neutral Gray Equals = ⚪
 * - 'neutral': Incomparable / subjective / missing data
 */
export function evaluateSpecRow(specKey, values) {
  const rule = SPEC_EVALUATION_RULES[specKey];
  const count = values.length;

  // If no rule or rule is incomparable
  if (!rule || rule.type === 'incomparable') {
    return values.map(() => ({
      status: 'neutral',
      indicator: '',
      reason: 'Subjective or architectural difference'
    }));
  }

  // Extract parsed numbers
  const parsed = values.map(val => parseSpecNumber(val));
  const validParsed = parsed.filter(v => v !== null && !isNaN(v));

  // If not all values could be parsed or less than 2 valid values
  if (validParsed.length < 2) {
    return values.map(() => ({
      status: 'neutral',
      indicator: '',
      reason: 'Specification values not directly numerically comparable'
    }));
  }

  // Check if all parsed values are identical
  const allIdentical = parsed.every(p => p !== null && p === parsed[0]);
  if (allIdentical) {
    return values.map(() => ({
      status: 'equal',
      indicator: '=',
      label: 'Identical specification'
    }));
  }

  const maxVal = Math.max(...validParsed);
  const minVal = Math.min(...validParsed);

  return parsed.map(val => {
    if (val === null || isNaN(val)) {
      return { status: 'neutral', indicator: '', reason: 'Data not available' };
    }

    if (rule.type === 'higher_is_better') {
      if (val === maxVal && maxVal !== minVal) {
        return { status: 'better', indicator: '↑', label: 'Higher is better' };
      } else if (val === minVal && maxVal !== minVal) {
        return { status: 'inferior', indicator: '↓', label: 'Lower value' };
      } else {
        return { status: 'equal', indicator: '=', label: 'Intermediate value' };
      }
    } else if (rule.type === 'lower_is_better') {
      if (val === minVal && maxVal !== minVal) {
        return { status: 'better', indicator: '↑', label: 'Lower is better' };
      } else if (val === maxVal && maxVal !== minVal) {
        return { status: 'inferior', indicator: '↓', label: 'Higher value' };
      } else {
        return { status: 'equal', indicator: '=', label: 'Intermediate value' };
      }
    }

    return { status: 'neutral', indicator: '', reason: 'Neutral spec' };
  });
}

/**
 * Executes a full comparative analysis across 2 to 4+ products.
 */
export function analyzeComparison(products) {
  if (!products || products.length < 2) {
    return {
      error: 'At least 2 products are required for comparison.',
      canCompare: false
    };
  }

  // Validate category homogeneity
  const firstCategory = products[0].category;
  const isHomogeneous = products.every(p => p.category === firstCategory);

  if (!isHomogeneous) {
    return {
      error: `All products in a comparison must belong to the same category. Product 1 is "${firstCategory}", but you have mixed categories.`,
      canCompare: false,
      mismatchedCategories: products.map(p => ({ id: p.id, name: p.name, category: p.category }))
    };
  }

  // Gather all unique section names and spec keys
  const sectionMap = new Map(); // sectionName -> Set(specKeys)
  products.forEach(product => {
    if (product.specifications) {
      Object.entries(product.specifications).forEach(([section, specs]) => {
        if (!sectionMap.has(section)) {
          sectionMap.set(section, new Set());
        }
        if (specs && typeof specs === 'object') {
          Object.keys(specs).forEach(key => sectionMap.get(section).add(key));
        }
      });
    }
  });

  // Track advantage counts per product
  const advantageCounts = products.map(() => 0);
  const disadvantageCounts = products.map(() => 0);
  const detailedSections = [];

  sectionMap.forEach((specKeySet, sectionName) => {
    const rows = [];
    specKeySet.forEach(specKey => {
      const values = products.map(p => {
        const val = p.specifications?.[sectionName]?.[specKey];
        return val !== undefined ? String(val) : '—';
      });

      const evaluations = evaluateSpecRow(specKey, values);

      // Accumulate score
      evaluations.forEach((evalResult, idx) => {
        if (evalResult.status === 'better') advantageCounts[idx]++;
        if (evalResult.status === 'inferior') disadvantageCounts[idx]++;
      });

      rows.push({
        specKey,
        values: products.map((p, idx) => ({
          productId: p.id,
          value: values[idx],
          status: evaluations[idx].status,
          indicator: evaluations[idx].indicator,
          label: evaluations[idx].label || evaluations[idx].reason || ''
        }))
      });
    });

    detailedSections.push({
      sectionName,
      rows
    });
  });

  // Synthesize Intelligent Summary
  const summary = generateComparisonSummary(products, advantageCounts, firstCategory);

  return {
    canCompare: true,
    category: firstCategory,
    productsCount: products.length,
    productSummaries: products.map((p, idx) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      modelNumber: p.modelNumber,
      price: p.price,
      currency: p.currency,
      image: p.image,
      rating: p.rating,
      verified: p.verified,
      isUserAdded: p.isUserAdded,
      dataSource: p.dataSource,
      advantagesCount: advantageCounts[idx],
      disadvantagesCount: disadvantageCounts[idx]
    })),
    sections: detailedSections,
    verdict: summary
  };
}

/**
 * Category-aware Intelligent Summary Generator
 */
function generateComparisonSummary(products, advantageCounts, category) {
  // Best in class calculations
  let bestDisplay = null;
  let bestBattery = null;
  let bestPerformance = null;
  let bestValue = null;

  // Best Value (ratio of rating or features to price)
  const validPrices = products.filter(p => p.price && p.price > 0);
  if (validPrices.length > 0) {
    const lowestPrice = [...validPrices].sort((a, b) => a.price - b.price)[0];
    bestValue = {
      productId: lowestPrice.id,
      productName: lowestPrice.name,
      reason: `Lowest entry cost at ₹${lowestPrice.price.toLocaleString('en-IN')} while retaining core features.`
    };
  }

  // Find product with highest battery capacity or runtime
  let highestBattery = -1;
  let batteryLeader = null;
  products.forEach(p => {
    const cap = p.metrics?.batteryCapacityMAh || p.metrics?.batteryWattHours || p.metrics?.batteryLifeHours || 0;
    if (cap > highestBattery) {
      highestBattery = cap;
      batteryLeader = p;
    }
  });
  if (batteryLeader) {
    bestBattery = {
      productId: batteryLeader.id,
      productName: batteryLeader.name,
      reason: `Highest energy reserve / tested endurance in this lineup.`
    };
  }

  // Find product with best display (refresh rate * brightness or resolution)
  let highestDisplayScore = -1;
  let displayLeader = null;
  products.forEach(p => {
    const score = (p.metrics?.refreshRateHz || 60) * (p.metrics?.brightnessNits || 1000);
    if (score > highestDisplayScore) {
      highestDisplayScore = score;
      displayLeader = p;
    }
  });
  if (displayLeader) {
    bestDisplay = {
      productId: displayLeader.id,
      productName: displayLeader.name,
      reason: `Superior panel technology with outstanding refresh rate and peak brightness.`
    };
  }

  // Find product with highest benchmark score or compute metrics
  let highestBench = -1;
  let perfLeader = null;
  products.forEach(p => {
    const bench = p.metrics?.benchmarkScore || p.metrics?.teraflops || 0;
    if (bench > highestBench) {
      highestBench = bench;
      perfLeader = p;
    }
  });
  if (perfLeader) {
    bestPerformance = {
      productId: perfLeader.id,
      productName: perfLeader.name,
      reason: `Dominates synthetic compute and high-load benchmarks.`
    };
  }

  // Overall leader check
  const maxAdvantages = Math.max(...advantageCounts);
  const minAdvantages = Math.min(...advantageCounts);
  const leaders = products.filter((_, idx) => advantageCounts[idx] === maxAdvantages);

  let overallVerdict = '';
  if (maxAdvantages === minAdvantages) {
    overallVerdict = 'Both products stand exceptionally neck-and-neck with well-balanced trade-offs across all key specifications.';
  } else if (leaders.length === 1 && maxAdvantages - minAdvantages >= 3) {
    overallVerdict = `${leaders[0].name} holds the empirical hardware advantage with ${maxAdvantages} superior specification points.`;
  } else {
    overallVerdict = 'Each device excels in distinct areas—choose based on whether battery, raw performance, or pricing is your primary priority.';
  }

  return {
    overallVerdict,
    hasDecisiveWinner: leaders.length === 1 && maxAdvantages - minAdvantages >= 3,
    overallLeader: leaders.length === 1 ? leaders[0].name : null,
    bestDisplay,
    bestBattery,
    bestPerformance,
    bestValue,
    highlights: products.map(p => ({
      id: p.id,
      name: p.name,
      keyAdvantage: p.pros?.[0] || 'Strong balanced specifications across the board'
    }))
  };
}
