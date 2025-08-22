# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Ploutos cryptocurrency website - a multi-page marketing and information platform for the Ploutos token ($PLTL) built on the BASE network. The site features internationalization (English/French), a React-based dashboard, and integration with trading platforms.

## Architecture

### Static Website Structure
- **Main Pages**: `index.html`, `eula.html`, `privacy.html`, `terms.html`
- **Trading Pages**: `trade/mainnet.html`, `trade/testnet.html`
- **Dashboard**: React app in `/dashboard/` (pre-built production files)
- **Shared Components**: Loaded via `assets/js/components.js` (header/footer)
- **Translations**: Managed through `translations/translations.js` with `data-translate` attributes
- **Styling**: Bootstrap-based with custom CSS in `style.css`

### Key Implementation Patterns

1. **Component Loading**: Headers and footers are dynamically injected using JavaScript
```javascript
document.getElementById('header-container').innerHTML = headerHTML;
```

2. **Internationalization**: Language switching via `setLanguage()` function
```javascript
setLanguage('en'); // or 'fr'
```

3. **Navigation**: Hash-based anchor links for single-page sections (`/#home`, `/#about`, etc.)

4. **External Integrations**:
   - Airdrop app: `https://app.ploutoslabs.io`
   - Whitepaper: GitBook URLs (language-specific)

## Development Commands

Since this is a static website with no build process:

### Local Development
```bash
# Serve the site locally (use any static server)
python3 -m http.server 8000
# or
npx serve .
```

### Dashboard Development
The dashboard is a pre-built React application. Source code is not available in this repository.

## File Organization

- `/assets/` - All static resources (CSS, JS, images, fonts)
- `/dashboard/` - Pre-built React dashboard application
- `/trade/` - Trading interface pages
- `/translations/` - Internationalization logic
- `/venobox/` - Lightbox/modal library

## Important Notes

- The site uses jQuery and various plugins (Owl Carousel, Swiper, etc.)
- Mobile responsiveness handled via Bootstrap grid and custom media queries
- Language preference is not persisted - defaults to English on page load
- All external links should open in new tabs (`target="_blank"`)
- Dashboard is served from `/dashboard/` path