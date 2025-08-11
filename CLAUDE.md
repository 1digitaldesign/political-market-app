# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application that visualizes political trends through market-style analytics. The app presents a satirical/theoretical analysis combining physics, mathematics, and political science concepts to model political system dynamics.

## Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint

# TypeScript checking
npx tsc --noEmit     # Check for TypeScript errors without building
```

## Architecture

### Core Application Structure
- **Main Component**: `src/components/PoliticalMarketApp.tsx` - Single monolithic component containing all views, data, and logic (~850 lines)
- **Entry Point**: `src/app/page.tsx` - Minimal wrapper that imports and renders PoliticalMarketApp
- **Layout**: `src/app/layout.tsx` - Root layout with metadata and font configuration

### Data Architecture
The app uses static data embedded directly in PoliticalMarketApp.tsx:
- **commodities**: Political metrics with φ-ratio based values
- **trajectoryData**: Historical/projected timeline from 1789-2065
- **sectors**: Market-style political sector indicators 
- **stressIndicators**: System pressure measurements
- **civilizationBases**: Multi-base number system calculations (Babylonian-60, Mayan-20, Decimal-10, Binary-2, Duodecimal-12)
- **equations**: Mathematical formulas combining physics concepts with political analysis

### View System
Controlled by `selectedView` state with four main views:
1. **overview**: Market sectors + trajectory chart
2. **stress**: System stress indicators + correction probability
3. **commodities**: Political commodities market visualization
4. **calibration**: Historical calibration points + multi-civilization analysis

### Key Dependencies
- **recharts**: All data visualizations (LineChart, RadarChart, ComposedChart)
- **Tailwind CSS**: All styling via utility classes
- **React 19**: Using client-side components ('use client' directive)

## Important Context

### Theoretical Framework
The app presents a satirical "Grand Unified Theory" that maps political dynamics to astrophysical phenomena:
- Uses Chandrasekhar limit, Schwarzschild radius, and black hole physics as political metaphors
- Incorporates historical cycles (160-year, 503-year Rome period)
- References multiple civilizations' counting systems as analytical frameworks
- Current equations array contains DC Comics references that may be replaced with religious/philosophical texts

### Data Files in /temp
The `/temp` directory contains supporting theoretical documents:
- `SOP1.txt`: Main theoretical framework document
- Historical source texts (Gibbon, Einstein, Newton extracts)
- These inform the mathematical models but aren't directly imported

### Deployment
Configured for Vercel deployment with `vercel.json` present. The app is static and requires no backend services.

## Development Patterns

### State Management
All state is managed locally within PoliticalMarketApp using React hooks. No global state management or context providers.

### Styling Convention
Pure Tailwind utility classes, no custom CSS beyond `globals.css`. Dark theme by default with gray-900 backgrounds.

### Data Updates
All data is hardcoded. To update metrics or projections, modify the data arrays directly in PoliticalMarketApp.tsx.

### Component Pattern
Uses inline functional components for repeated elements (MarketSectorCard, StressIndicator, CommodityCard) defined within the main component.