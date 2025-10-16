# Screenshot to Code Project

## Project Overview
Production-ready Next.js 14 TypeScript application that converts Figma designs and screenshots to pixel-perfect, production-ready code using advanced AI (GPT-5 Vision + Claude Sonnet 4.5).

## Key Features
- 🔐 **Authentication**: Google & GitHub OAuth with NextAuth.js
- 🎨 **Figma to Code**: Direct Figma URL import with comprehensive design analysis
- 🖼️ **Screenshot to Code**: Upload any design screenshot
- 🤖 **AI-Powered**: GPT-5 Vision for design analysis + Claude Sonnet 4.5 for code generation
- 🌍 **Multi-Language**: Full TR/EN support with i18n system
- 🌓 **Dark/Light Mode**: Complete theme system with Tailwind
- 📱 **Responsive**: Mobile-first, pixel-perfect output
- ⚡ **Multi-Framework**: HTML, React, Vue, Svelte support
- 💳 **Payment Integration**: İyzico payment gateway
- 🎯 **Free Trial System**: 3 free generations per user

## Tech Stack
- Next.js 14.1.0 (App Router)
- React 18.2.0
- TypeScript 5.3.3
- Tailwind CSS 3.4.1
- OpenAI GPT-4/5 Vision API (optional, mocked if no key)
- Anthropic Claude Sonnet 4.5 API (optional, mocked if no key)
- Figma API (optional, mocked if no key)
- İyzico Payment Gateway
- Axios for API calls

## Project Structure
- `app/` - Next.js pages (landing, app)
- `pages/api/` - API routes (figma-to-code, vision, generate, upload, iyzico)
- `components/` - React components (FigmaImportPanel)
- `lib/` - Utilities (i18n, figmaUtils, demoData, freeTrialStore)
- `public/` - Static assets
- `.env.local` - Environment variables (not committed)

## Core Features

### 1. Figma to Code System (`/api/figma-to-code`)
- **Input**: Figma design URL
- **Process**:
  1. Fetch Figma file via Figma API
  2. Deep structural analysis (components, colors, typography, spacing)
  3. Export design as high-res image
  4. GPT-5 Vision visual analysis
  5. Claude Sonnet 4.5 code generation
- **Output**: Production-ready code (HTML/React/Vue/Svelte)
- **Features**:
  - Pixel-perfect accuracy
  - Full design token extraction
  - Responsive breakpoints
  - Accessibility (WCAG AA)
  - Clean, commented code

### 2. Multi-Language System (`lib/i18n.ts`)
- Type-safe translations interface
- 150+ translation keys
- TR/EN language toggle
- Currency conversion (USD ↔ TRY)
- Landing page, app page, modals fully translated

### 3. Theme System
- Class-based dark mode (`darkMode: 'class'`)
- Smooth transitions
- Custom cursor with trail effect
- Glassmorphism UI
- Gradient animations

## Development

### Setup
```bash
npm install
npm run dev
```
Server runs on: http://localhost:3000

### Environment Variables
Create `.env.local`:
```bash
# AI APIs (optional - app works in mock mode without them)
OPENAI_API_KEY=sk-xxx                    # GPT-5 Vision
CLAUDE_API_KEY=claude-xxx                # Claude Sonnet 4.5
FIGMA_ACCESS_TOKEN=figd_xxx              # Figma API

# Payment (optional)
IYZICO_API_KEY=your_iyzico_key
IYZICO_SECRET_KEY=your_iyzico_secret

# App Config
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Mock Mode
App fully functional without API keys:
- Figma import → Returns mock HTML
- Vision analysis → Returns mock component structure
- Code generation → Returns beautiful mock landing page

## API Routes

### `/api/figma-to-code` (POST)
Convert Figma design to code
```typescript
// Request
{
  "figmaUrl": "https://figma.com/design/...",
  "framework": "html" | "react" | "vue" | "svelte",
  "includeStyles": true,
  "responsive": true
}

// Response
{
  "success": true,
  "code": "<!DOCTYPE html>...",
  "analysis": { figma: {...}, vision: {...} },
  "framework": "html",
  "meta": {
    "model": "claude-sonnet-4",
    "figmaFile": "Design Name",
    "componentsCount": 25,
    "colorsCount": 12
  }
}
```

### `/api/vision` (POST)
Analyze screenshot with GPT-5 Vision
```typescript
// Request
{ "imageUrl": "/uploads/screenshot.png" }

// Response
{
  "components": [...],
  "colors": {...},
  "typography": {...},
  "layout": {...}
}
```

### `/api/generate` (POST)
Generate code with Claude Sonnet 4.5
```typescript
// Request
{ "vision": {...} }

// Response
{ "code": "<!DOCTYPE html>..." }
```

## Key Components

### FigmaImportPanel (`components/FigmaImportPanel.tsx`)
- Figma URL input with validation
- Framework selector (HTML/React/Vue/Svelte)
- Progress tracking (4 steps)
- Error handling
- Success feedback
- Multi-language support

### App Page (`app/app/page.tsx`)
- Tab system (Demo Designs vs Figma Import)
- Demo screenshot gallery
- Free trial management
- Code preview & download
- Dark/light mode toggle
- Language switcher

### Landing Page (`app/landing/page.tsx`)
- Hero section with live stats
- Features grid (6 cards)
- How It Works (3 steps)
- Pricing (3 plans with TRY/USD)
- FAQ (8 questions)
- Footer with links

## Utilities

### `lib/figmaUtils.ts`
- Figma URL validation
- File key & node ID extraction
- Framework constants
- Import function

### `lib/i18n.ts`
- Translation interface (150+ keys)
- useTranslation hook
- Currency helpers
- Price formatting

### `lib/freeTrialStore.ts`
- LocalStorage-based trial tracking
- 3 free uses per browser
- Decrement/check functions

## Design System
- **Colors**: Purple (#8b5cf6), Pink (#ec4899), Blue (#3b82f6)
- **Fonts**: Inter (system-ui fallback)
- **Spacing**: 8px base unit
- **Border Radius**: 8px, 12px, 16px, 24px
- **Shadows**: Layered with color glow
- **Animations**: Scale, rotate, fade, pulse

## Production Checklist
- [ ] Add real API keys
- [ ] Configure payment gateway
- [ ] Set up analytics
- [ ] Add error tracking (Sentry)
- [ ] Optimize images
- [ ] Add sitemap
- [ ] SEO meta tags
- [ ] Security headers
