# Konvikti Landing Zone

[![Production Build](https://github.com/benjamsf/react-konvikti-lz/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/benjamsf/react-konvikti-lz/actions/workflows/build.yml)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/pvarki/react-konvikti-lz/releases)
[![Node](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-5.x-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.x-06b6d4.svg?logo=tailwindcss)](https://tailwindcss.com/)

A web application for Ylioppilaskoti Konvikti (Claustrum Theologicum), a student housing organization for theology students at the University of Helsinki. The application serves as the public-facing website providing information about the organization, housing applications, news, and organizational details.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Content Management with Sanity](#content-management-with-sanity)
- [Internationalization](#internationalization)
- [Environment Variables](#environment-variables)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Konvikti Landing Zone is a single-page application built with React that provides:

- **Home View**: Introduction to Konvikti with an intro video and key highlights
- **Application View**: Information for prospective residents and the application process
- **Blog and News**: Announcements, news, events, and resident application posts managed via CMS
- **Organization View**: Staff directory, board members, history timeline, values, and official documents

The application uses a swipe-based navigation pattern (LandingZoneSwiper) allowing users to navigate between views horizontally, similar to mobile app experiences.

---

## Tech Stack

| Category             | Technology               |
| -------------------- | ------------------------ |
| Framework            | React 18 with TypeScript |
| Build Tool           | Vite                     |
| Styling              | Tailwind CSS             |
| Navigation           | Swiper.js                |
| CMS                  | Sanity.io                |
| Data Fetching        | React Query              |
| Internationalization | react-i18next            |
| UI Components        | Radix UI                 |
| Icons                | Radix Icons              |

---

## Project Structure

```
konvikti-lz/
├── public/                     # Static assets
├── sanity/                     # Sanity Studio (separate project)
│   └── schemaTypes/            # Content schemas
│       ├── blogPost.ts
│       ├── staffMember.ts
│       ├── boardMember.ts
│       ├── organizationRules.ts
│       ├── siteSettings.ts
│       └── index.ts
├── src/
│   ├── assets/                 # Images, icons, fonts
│   │   ├── heroimages/
│   │   ├── littleimgs/
│   │   └── staff/
│   ├── components/             # Reusable UI components
│   │   ├── Blog/               # Blog-related components
│   │   │   ├── AsukashakuSection.tsx
│   │   │   ├── BlogFeed.tsx
│   │   │   ├── BlogPostCard.tsx
│   │   │   └── BlogPostDetail.tsx
│   │   ├── legal/              # Legal documents
│   │   │   └── PrivacyPolicyModal.tsx
│   │   ├── Button.tsx
│   │   ├── CollapsibleRulesCard.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── StaffGrid.tsx
│   │   ├── StaffList.tsx
│   │   ├── Timeline.tsx
│   │   ├── VisionSection.tsx
│   │   ├── YouTubeModal.tsx
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── useBlogPosts.ts
│   │   ├── useOrgData.ts
│   │   └── useSiteSettings.ts
│   ├── lib/                    # Utilities and clients
│   │   └── sanityClient.ts
│   ├── locales/                # Translation files
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── fi/
│   │       ├── translation.json
│   │       ├── common.json
│   │       └── org.json
│   ├── styles/                 # Additional CSS
│   │   └── scrollbar.css
│   ├── types/                  # TypeScript type definitions
│   │   └── blog.ts
│   ├── views/                  # Page-level components
│   │   └── LandingZone/
│   │       ├── HomeView.tsx
│   │       ├── InfoView.tsx
│   │       ├── BlogNewsView.tsx
│   │       ├── OrgView.tsx
│   │       └── LandingZoneSwiper.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                        # Environment variables (not committed)
├── .env.example                # Environment template
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Sanity.io account (for CMS)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/konvikti-lz.git
cd konvikti-lz
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment template and configure:

```bash
cp .env.example .env
```

4. Fill in the environment variables (see [Environment Variables](#environment-variables)).

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Development

### Available Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start development server with hot reload           |
| `npm run build`      | Build for production (runs TypeScript check first) |
| `npm run build:vite` | Build without TypeScript check                     |
| `npm run preview`    | Preview production build locally                   |
| `npm run lint`       | Run ESLint                                         |
| `npm run type-check` | Run TypeScript compiler check                      |

### Code Style

- TypeScript strict mode is enabled
- Follow existing patterns for components and hooks
- Use Tailwind CSS utility classes for styling
- Avoid hardcoding secrets or API keys
- Keep components focused and single-purpose

### Adding a New View

1. Create the view component in `src/views/LandingZone/`
2. Add it to `LandingZoneSwiper.tsx` as a new `SwiperSlide`
3. Update the `views` array with the translation key
4. Add navigation item in `Sidebar.tsx` if needed

### Adding a New Component

1. Create the component in `src/components/`
2. Export it if it will be used across multiple views
3. For Sanity-backed components, create corresponding:
   - Schema in `sanity/schemaTypes/`
   - Hook in `src/hooks/`

---

## Content Management with Sanity

The application uses Sanity.io as a headless CMS for managing dynamic content. Non-technical team members can edit content through Sanity Studio without code changes.

### Sanity Studio

Sanity Studio is a separate application located in the `sanity/` directory (or `src/sanity/konvikti-studio/` depending on your setup). To run it:

```bash
cd sanity
npm install
npm run dev
```

Studio will be available at `http://localhost:3333`.

### Content Types

| Schema                | Description                                        | Editable Fields                                                  |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------------------- |
| **blogPost**          | News, announcements, events, resident applications | Title, content, category, cover image, publish date, haku status |
| **staffMember**       | Organization staff with photos                     | Name, title (FI/EN), description (FI/EN), photo, order           |
| **boardMember**       | Board of directors                                 | Name, role (FI/EN), order                                        |
| **organizationRules** | Official association rules                         | Title (FI/EN), rich text content (FI/EN), last updated date      |
| **siteSettings**      | Global site configuration                          | Intro video URL, social media links, contact email               |

### Adding Content

1. Open Sanity Studio
2. Select the content type from the sidebar
3. Click "Create new" or edit existing
4. Fill in required fields (marked with asterisk)
5. Click "Publish" to make changes live

### Bilingual Content

Most content types support both Finnish and English:

- Fields ending in `_fi` are Finnish (required)
- Fields ending in `_en` are English (optional, falls back to Finnish)

The application automatically displays the correct language based on user selection.

---

## Internationalization

The application supports Finnish (default) and English using react-i18next.

### Translation Files

Located in `src/locales/`:

```
locales/
├── fi.json
└── en.json
```

### Adding Translations

1. Add the key-value pair to the appropriate JSON file
2. Use in components:

```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("myKey.title", "Default fallback")}</h1>;
}
```

### Language Switching

Users can switch languages via the dropdown in the Footer. The selection is persisted and affects both static translations and Sanity content.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Sanity CMS
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production

# Google Forms (for applications)
VITE_GOOGLE_APPLICATION_FORM=https://docs.google.com/forms/d/e/xxx/viewform
VITE_GOOGLE_RECRUITMENT_FORM=https://docs.google.com/forms/d/e/xxx/viewform
```

### Getting Sanity Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the Project ID from the dashboard
4. Dataset is typically `production`

---

## Building for Production

```bash
npm run build
```

This will:

1. Run TypeScript type checking
2. Bundle the application with Vite
3. Output to `dist/` directory

### Build Considerations

- Ensure all environment variables are set in your CI/CD environment
- The Sanity Studio folder should be excluded from the main app's TypeScript config (add to `tsconfig.json` exclude array)
- Static assets are hashed for cache busting

---

## Deployment

The application can be deployed to any static hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Similar automatic deployment from Git
- **GitHub Pages**: Use GitHub Actions workflow
- **Self-hosted**: Serve the `dist/` folder with any web server

### CI/CD Notes

If you encounter TypeScript errors related to Sanity Studio during CI builds, ensure your `tsconfig.json` excludes the Sanity folder:

```json
{
  "exclude": ["node_modules", "sanity", "src/sanity/**/*"]
}
```

### Environment Variables in CI

Set the following secrets in your CI/CD platform:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- Any other `VITE_*` variables your app requires

---

## Contributing

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes

### Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes with clear commit messages
3. Ensure `npm run build` passes locally
4. Submit a pull request to `develop`
5. Request review from a team member

### Commit Messages

Follow conventional commits:

- `feat: add new component`
- `fix: resolve navigation issue`
- `docs: update README`
- `style: format code`
- `refactor: restructure hooks`
