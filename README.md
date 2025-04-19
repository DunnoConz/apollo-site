# Apollo Documentation Site

This is the documentation site for Apollo, built with Nuxt.js and following the Diátaxis framework.

## Features

- Modern UI with Nuxt UI Pro
- Dark mode support
- Interactive playground
- Content-driven documentation
- Responsive design

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run generate
```

## Deployment

This site is deployed to GitHub Pages. The deployment is automated using GitHub Actions.

### Manual Deployment

1. Push your changes to the `main` branch
2. The GitHub Action will automatically build and deploy the site
3. The site will be available at `https://your-username.github.io/apollo-site/`

### Configuration

- The site is configured to use the repository name as the base URL
- All internal links are automatically adjusted for GitHub Pages
- The site is pre-rendered for optimal performance

## Documentation Structure

The documentation follows the Diátaxis framework:

- **Tutorials**: Step-by-step learning paths
- **How-to Guides**: Task-oriented guides
- **Reference**: Technical documentation
- **Explanation**: Background and context

## License

MIT
