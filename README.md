# Roomaity - Roommate Finder Platform

A modern static web platform prototype for finding compatible roommates in Saudi Arabia. It features full Arabic language support as the default and a responsive design.

## Features

- Arabic as the default language with English as secondary
- Separate sections for male and female users (culturally appropriate)
- Smart matching algorithm to find compatible roommates
- Responsive design for all devices
- RTL (Right-to-Left) layout support

## Technologies Used

- HTML5
- CSS3
- JavaScript
- ES6 Modules
- Responsive Design
- RTL Support

## Getting Started

To view the website locally, it's recommended to serve the files using a local web server. This is because the site uses ES6 modules, which may not load correctly if `index.html` is opened directly via the `file:///` protocol. A simple way to do this is to use Python's `http.server` (e.g., `python -m http.server 8000`) from the project root, or use a tool like VS Code's Live Server extension.

## Recent Improvements (2024-07-30)

- Reviewed and improved the overall website structure and code.
- Consolidated translation files: `enhanced-translations.js` is now the sole source for translations, and redundant code was removed.
- Improved CSS organization by removing the unused `simplified-visual-styles.css` theme file.
- Initiated JavaScript refactoring for better modularity by extracting the dark mode toggle into `js/modules/darkMode.js` and enabling ES6 module support in `index.html`.
- Enhanced accessibility (A11y) by updating image `alt` attributes and adding/improving ARIA labels for interactive elements.
- Documented existing HTML page structure, identified missing linked pages, and listed placeholder image assets in this README for future development clarity.

## Deployment

This website is designed to be deployed as a static site on GitHub Pages or any web hosting service.

## Website Structure and Content

### HTML Pages

The following HTML files are currently present in the repository:
- `index.html`
- `create-listing.html`
- `login.html`
- `profile.html`

#### Missing HTML Pages (Linked from `index.html`)
- `male-listings.html`
- `female-listings.html`
- `how-it-works.html`
- `about.html`
- `contact.html`
- `signup.html`
- `listing-detail.html`
- `safety-tips.html`
- `roommate-agreement.html`
- `faq.html`
- `blog.html`
- `privacy-policy.html`
- `search.html`
- `messages.html`

**Note:** These pages are linked from `index.html` but do not currently exist. Their creation is recommended for future development to ensure full site functionality.

### Placeholder Images

The following image files are referenced in `index.html` and are likely placeholders:
- `favicon.ico` (Note: a generic favicon might be present; it should be replaced with a branded one)
- `male-room-1.jpg`
- `male-room-2.jpg`
- `male-room-3.jpg`
- `female-room-1.jpg`
- `female-room-2.jpg`
- `female-room-3.jpg`
- `male-profile-1.jpg`
- `male-profile-2.jpg`
- `male-profile-3.jpg`
- `male-profile-4.jpg`
- `female-profile-1.jpg`
- `female-profile-2.jpg`
- `female-profile-3.jpg`
- `female-profile-4.jpg`
- `testimonial-1.jpg`
- `testimonial-2.jpg`
- `testimonial-3.jpg`

**Note:** These image paths are used in `index.html`. Actual image assets need to be added to the repository for these placeholders.

The files `roomaity-logo.png` and `logo-white.png` appear to be actual logo assets for the website.
