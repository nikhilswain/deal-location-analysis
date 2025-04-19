# Location Analysis Tab – Starboard AI Technical Assignment

## Overview

This project implements a "Location Analysis" tab for Starboard AI’s Deal Screening Dashboard. The UI is designed to help investors quickly assess the market conditions, regional dynamics, development pipeline, and zoning context surrounding a potential real estate deal.

The solution is modular, responsive, and follows a clean enterprise-grade design system consistent with the Figma reference.

## Tech Stack

- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Charts:** Recharts
- **Maps:** Google Maps (embedded via iframe for demonstration)

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
  - Two action buttons:
    - **Export to Excel**
    - **Generate PDF**

> ✅ Both export features are fully implemented using mock data to demonstrate the logic and structure. While the data is placeholder, the technical flow for export is functional and ready to accept dynamic inputs.

### 3. Summary Section

- Two-column layout:
  - **Left:** Deal summary metrics (e.g., Cap Rate, IRR)
  - **Right:** Scrollable or collapsible list of asset-level data (unit mix, sizes, etc.)

### 4. Extended Deal Data Panels

- Four modular, collapsible panels:
  - Projected Financial Metrics
  - Key Assumptions
  - Market Analysis
  - Lease Analysis
- Light visualizations using Recharts (e.g., bar and pie charts)

### 5. Location Intelligence

#### Supply Pipeline (Left Panel – 30%)

- Simple list view of nearby developments:
  - Address
  - Property type
  - Timeline
  - Square footage
  - Optional tenant data

#### Land Sale Comparables (Right Panel – 70%)

- 2x2 responsive card grid
- Each card shows:
  - Land address
  - Price per square foot
  - Parcel size
  - Zoning code

### 6. Extra Analytical Panels

#### Demographic Trends

- Visual breakdown using charts:
  - Population growth
  - Income growth
  - Workforce composition

#### Proximity Insights

- List of distance-based metrics:
  - Highways
  - Rail lines
  - Ports
  - Major tenants

#### Zoning Overlays

- Zoning code list with brief descriptions
- Clickable links to external municipal zoning references

## Design Decisions

- **Component-Driven:** Each section is its own component for reusability and scalability
- **Clean Styling:** Built with Tailwind CSS and shadcn/ui to align with the Figma system
- **Responsive UI:** Layouts adjust gracefully for tablets and mobile devices
- **Mocked Data with Real Logic:** Export to Excel and PDF use sample data but show real export logic, easily extendable to backend or API-fed data

## Features

- Fully responsive design
- Interactive Google Map
- Clean section layout with collapsible data views
- Recharts-powered visual summaries
- Working export buttons (Excel/PDF) to demonstrate implementation
- Ready-to-integrate structure for real datasets or APIs

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/nikhilswain/deal-location-analysis.git
   ```
