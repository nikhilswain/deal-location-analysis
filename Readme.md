# Location Analysis Tab – Starboard AI Technical Assignment

## Overview

This project implements a **"Location Analysis"** tab for Starboard AI’s Deal Screening Dashboard. The UI is designed to help investors quickly assess market conditions, regional dynamics, development pipelines, and zoning context for a potential real estate deal.

The solution is modular, responsive, and aligns with a clean enterprise-grade design system based on the provided Figma reference.

---

## Tech Stack

- **Framework:** Next.js (React + API routes for backend logic)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Charts:** Recharts
- **Maps:** Google Maps (iframe-based demo)
- **PDF Parsing:** `pdf-parse`, `pdf2table`, and custom regex methods for backend data extraction

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/nikhilswain/deal-location-analysis.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   If you run into issues, try:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` or the port mentioned in the terminal.

---

## How It Works

### Initial Load

- On first load, the UI displays a static version of the Location Analysis page with placeholder content.

### After PDF Upload

- Once a PDF is uploaded via the "OM Upload" input, the backend uses Next.js API routes to parse and extract text and tables using `pdf-parse` and `pdf2table`.
- Extracted data is processed using custom parsing logic and regular expressions to map into meaningful sections.
- The initial static layout and design have been preserved to maintain familiarity.
- Where relevant, some of the static content is dynamically updated with parsed data from the uploaded PDF, new sections are introduced for entirely new data.

### Key Behavior

- **Blue Highlighting:** Newly added or replaced data (from the uploaded PDF) is visually marked with a light blue background for clarity.
- **Toggles:**
  - **Text View:** View the raw extracted text from the PDF.
  - **JSON View:** View the structured JSON output derived from the raw text.

---

## Project Structure & Components

### 1. Navigation Bar

- Sticky top navigation bar
- Displays the current tab title: "Location Analysis"
- Responsive hamburger menu for smaller screens

### 2. Hero Section: Map + Deal Info

- Horizontal split: 60% map, 40% deal info card
- Embedded Google Map centered on the deal location
- Right panel includes:
  - Deal name, location, type, pricing
  - Two action buttons: - **Export to Excel** - **Generate PDF**
    > ✅ Both export features are fully implemented using mock data. The export logic is real and extendable to API-fed data.

### 3. Summary Section

- Two-column layout:
  - **Left:** Deal summary metrics (e.g., Cap Rate, IRR)
  - **Right:** Scrollable or collapsible asset-level data

### 4. Extended Deal Data Panels

- Modular, collapsible sections:
  - Projected Financial Metrics
  - Key Assumptions
  - Market Analysis
  - Lease Analysis
- Visualized with Recharts

### 5. Location Intelligence

#### Supply Pipeline (30%)

- List of nearby developments:
  - Address
  - Property type
  - Timeline
  - Square footage
  - Optional tenant info

#### Land Sale Comparables (70%)

- 2x2 responsive grid of cards
- Each card includes:
  - Land address
  - Price per square foot
  - Parcel size
  - Zoning code

### 6. Extra Analytical Panels

#### Demographic Trends

- Charts on:
  - Population growth
  - Income growth
  - Workforce composition

#### Proximity Insights

- Distance-based metrics:
  - Highways
  - Rail lines
  - Ports
  - Major tenants

#### Zoning Overlays

- Zoning codes with descriptions
- Clickable external zoning references

---

## Design Decisions

- **Component-Driven:** Modular components for scalability
- **Clean Styling:** Tailwind CSS + shadcn/ui to match design system
- **Responsive UI:** Works across screens
- **Mock Data, Real Logic:** Export flows are functional and ready for dynamic inputs

---

## Features

- Fully responsive layout
- Interactive Google Map view
- Collapsible, section-based structure
- Data-driven charts with Recharts
- Upload-driven dynamic content
- PDF + Excel export buttons
- Text and JSON view toggles for uploaded data
