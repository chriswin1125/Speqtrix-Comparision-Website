# COMPARELY — Premium Electronics Comparison Engine

> **"Compare Smarter. Choose Better."**  
> A high-performance, commercial-grade electronics discovery and multi-device benchmarking platform built with React, Node.js, Express, and MongoDB.

---

## 🌟 Key Features & Capabilities

### 1. Intelligent Multi-Product Comparison Matrix (Up to 4 Devices)
- Compare **2, 3, or up to 4 products simultaneously** side-by-side in a responsive, sticky-header comparison matrix.
- **Strict Category Homogeneity Rules**: Automatically locks and filters secondary product slots to match the primary product's category (e.g. comparing Smartphones with Smartphones, Laptops with Laptops, ACs with ACs).
- **Slot Controls**: Swap product positions (Move Left / Move Right), remove individual products, or replace a slot with another model.
- **Highlight Differences Toggle**: One-click filter to hide identical specifications and isolate distinguishing hardware differences.
- **Shareable Comparison URLs**: Instant clipboard link generation preserving exact comparison states (e.g. `?ids=samsung-galaxy-s25-ultra,apple-iphone-16-pro-max`).

### 2. Category-Calibrated 3-Way Smart Indicators
Specifications are evaluated using dynamic, domain-specific rules:
- **🟢 Upward Arrow (`↑`)**: Marks the statistically or empirically superior hardware specification.
- **🔴 Downward Arrow (`↓`)**: Marks the comparatively lower specification when higher is advantageous.
- **⚪ Neutral Equal Sign (`=`)**: Identical values across compared devices.
- **Domain-Specific Logic**:
  - *Laptops / Phones*: Higher RAM, higher storage, higher battery capacity/runtime, higher refresh rate, higher benchmark scores (`higher_is_better`).
  - *Portability*: Lower weight in grams / kg (`lower_is_better`).
  - *Air Conditioners & Appliances*: Higher ISEER & Star rating (`higher_is_better`), lower annual kWh consumption (`lower_is_better`), lower decibel noise level (`lower_is_better`).
  - *Subjective Specs*: Operating systems, build materials, and processors without direct benchmarks remain neutrally presented with zero fabricated scores.

### 3. Executive Comparison Summary
- Specification advantages score counter per device (e.g. `+10 Superior Specs`).
- **Category Specialists Highlights**:
  - 🏆 *Performance Leader*
  - 🖥️ *Display Specialist*
  - 🔋 *Endurance Leader*
  - 🏷️ *Best Value for Money*
- Decisive hardware verdict or balanced trade-off assessment.

### 4. Zero-Empty-Search Fallback System
- **Real-Time Live Search**: Instant suggestions, category filters, brand pills, and search history.
- **Smart Fallback Engine**: If a product has no exact factory match:
  - Discloses that verified records are not yet indexed.
  - Automatically queries alternative model numbers and related series.
  - Suggests high-value alternatives in the same category.
  - Presents an instant **"Enter Specs Manually"** shortcut.

### 5. Custom Product Submission ("Add a Product")
- Allows users to enter custom, concept, or unreleased device specifications (Brand, Model, Category, Price, Image, and dynamic Spec Fields).
- Participates directly in the comparison matrix with a clear, transparent **`User-Provided Specification`** badge to maintain data integrity.

### 6. Architectural Scale Across 14+ Consumer Categories
- **Smartphones** (Apple, Samsung, Google, OnePlus, Xiaomi)
- **Laptops & Workstations** (Apple MacBook Pro, Dell XPS, ASUS ROG Zephyrus, Lenovo ThinkPad)
- **Smart TVs & OLEDs** (LG OLED evo G4, Samsung QD-OLED S95D, Sony Bravia)
- **Air Conditioners** (Daikin 5.2 ISEER Inverter, LG AI DUAL Inverter, Voltas, Blue Star)
- **Smartwatches & Wearables** (Apple Watch Ultra 2, Galaxy Watch Ultra, Garmin)
- **Headphones & Audiophile ANC** (Sony WH-1000XM5, Apple AirPods Max USB-C, Bose)
- **Gaming Consoles** (Sony PlayStation 5 Pro, Xbox Series X, Nintendo Switch OLED)
- **Monitors** (ASUS ROG Swift 4K 240Hz QD-OLED, Alienware Ultrawide)
- **Cameras** (Sony Alpha A7 IV, Canon EOS R6)
- **Routers & Networking** (ASUS ROG Rapture Wi-Fi 6E Quad-Band, Netgear Nighthawk)
- **Refrigerators, Washing Machines, Tablets, and Microwave Ovens**

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js (ES Modules), Mongoose, Morgan, CORS |
| **Database** | MongoDB with seamless in-memory / JSON persistence fallback engine |
| **Styling & UX** | Custom dark/light mode toggle, glassmorphism, responsive grid layouts |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ (tested on v22)
- npm v9+

### 1. Run Backend Server
```bash
cd backend
npm install
npm start
```
*Backend runs at:* `http://localhost:5000`  
*(Automatically connects to MongoDB if running locally or seeds embedded storage)*

### 2. Run Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at:* `http://localhost:3000`

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health check & live database status (MongoDB / Embedded) |
| `/api/products` | `GET` | Query catalog with category, brand, search, price & sort filters |
| `/api/products/:id` | `GET` | Get full technical specification sheet and gallery |
| `/api/products/search` | `GET` | Live autocomplete search with fuzzy matching & fallback |
| `/api/products/categories`| `GET` | Category metadata with live product counts |
| `/api/products/brands` | `GET` | Distinct brand directory |
| `/api/products/popular-comparisons` | `GET` | Pre-curated trending comparisons |
| `/api/products/custom` | `POST` | Register user-provided custom device |
| `/api/compare?ids=id1,id2,id3` | `GET` | Run multi-device comparison analysis & return 3-way indicators |
