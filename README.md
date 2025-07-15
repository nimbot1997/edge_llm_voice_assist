

# SmolLM Chat

A privacy-first, zero-server AI chat webapp that runs **SmolLM-360M-int4** entirely in your browser using **WebGPU** and **MediaPipe**.

## Features

- **Privacy-first**: All processing happens locally in your browser
- **Zero-server**: No data sent to external servers after initial model download
- **WebGPU acceleration**: Leverages GPU for fast inference
- **Responsive design**: Works on mobile and desktop
- **Persistent history**: Chat history survives page reloads
- **Theme toggle**: Light and dark modes
- **Offline support**: Works without internet after initial setup

## Requirements

- Chrome 113+ or Edge 113+ (for WebGPU support)
- HTTPS (required for WebGPU)
- ~250MB free storage for the model

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Deploy to Vercel**:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/smolllm-chat)

   Or run locally:
   ```bash
   npm install
   npm run dev
   ```

3. **Open in browser**:
   - Navigate to `https://localhost:5173` (or the URL shown in terminal)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

1. **First run**: The model will download (~230MB) and initialize
2. **Chat**: Type your message and press Enter or click send
3. **Theme**: Click the sun/moon icon to toggle between light and dark modes
4. **Delete data**: Click the trash icon to clear all chat history and model cache
5. **Offline**: After first load, the app works offline

## Performance

- **Model load time**: < 15s on 4G, < 500ms on repeat visits
- **Token generation**: < 250ms/token on Pixel 8
- **Bundle size**: ≤ 120 kB gzipped (UI only)

## Development

### Project Structure
```
smolllm-chat/
├── src/
│   ├── components/     # UI components
│   ├── lib/           # Core functionality
│   ├── styles/        # CSS styles
│   └── main.ts        # App entry point
├── public/
│   └── models/        # Model files (optional - now downloaded on-demand)
└── dist/              # Built files
```

### Scripts
- `npm run dev` - Start development server with HTTPS
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run analyze` - Analyze bundle size

## Browser Support

- Chrome 113+
- Edge 113+
- Other Chromium-based browsers with WebGPU support

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Model won't load
- Ensure you're using HTTPS
- Check browser console for WebGPU support
- Verify model file exists in `public/models/`

### Slow performance
- Ensure WebGPU is enabled in browser
- Check GPU drivers are up to date
- Close other GPU-intensive applications

### Storage issues
- Ensure ~250MB free space for model
- Check browser storage permissions
- Clear browser cache if needed

