
# Project Directory Structure

## Fixed Directory Structure

```
mini-gemma-chat/
├── public/                    # Static assets
│   ├── models/               # AI model files
│   │   └── README.md         # Instructions for model download
│   ├── favicon.ico           # Favicon
│   ├── manifest.json         # PWA manifest
│   ├── pwa-192x192.png       # PWA icon (192x192)
│   ├── pwa-512x512.png       # PWA icon (512x512)
│   └── robots.txt            # SEO robots file
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ChatBox.tsx
│   │   ├── Composer.tsx
│   │   ├── Header.tsx
│   │   └── Message.tsx
│   ├── lib/                  # Core functionality
│   │   ├── llm.ts
│   │   ├── storage.ts
│   │   └── theme.ts
│   ├── styles/               # CSS styles
│   │   └── index.css
│   └── main.ts               # App entry point
├── tests/                    # Test files
│   ├── unit/                 # Unit tests
│   │   └── example.test.ts
│   └── e2e/                  # E2E tests (directory created)
├── .github/                  # GitHub workflows
│   └── workflows/
│       └── deploy.yml
├── dist/                     # Build output (created during build)
├── index.html                # Main HTML file
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── vitest.config.ts          # Vitest configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # Project documentation
```

## Added Missing Components

1. **public/** directory with standard web assets
2. **public/models/** directory for AI model storage
3. **tests/** directory structure for unit and e2e tests
4. **vitest.config.ts** for test configuration
5. **PWA icons** (placeholder files ready for actual images)
6. **Standard web files** (robots.txt, manifest.json, favicon.ico)
7. **Test scripts** in package.json

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run analyze` - Analyze bundle size

The project structure is now complete and follows best practices for a modern Vite + TypeScript project.
