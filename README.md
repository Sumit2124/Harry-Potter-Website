# The Wizarding Archive

A static Harry Potter fan archive built with HTML, CSS, and vanilla JavaScript. It is designed to work without a backend today while keeping the content and routes easy to connect to an API later.

## Features

- Sticky navigation, magical cursor effects, transitions, and a themed page loader
- Reusable book and Horcrux detail pages powered by URL query parameters
- Character directory and detailed character profiles
- Wallpaper gallery and archive-style content sections
- Interactive Play page with house and character quizzes, a daily quiz, spell generator, Horcrux challenge, share-by-copy, and local score storage
- Search-focused guides for Horcruxes, characters, movie order, and spells, including descriptive metadata and JSON-LD structured data
- Feedback capture stored locally in the browser until a backend is added

## Run locally

Because this is a static site, no installation is required. Open `index.html` in a browser.

For the most browser-like local experience, serve the folder with any static server. For example, if Node.js is installed:

```bash
npx serve .
```

Then open the local address shown by the command.

## Main pages

| Page | Purpose |
| --- | --- |
| `index.html` | Main archive and navigation hub |
| `book.html?bookId=1` | Reusable book-detail route |
| `horcrux.html?horcruxId=1` | Reusable Horcrux-detail route |
| `characters.html` | Character directory |
| `character.html?id=harry-potter` | Character profile route |
| `magic.html` | Quizzes, spell generator, and return features |
| `harry-potter-*.html` | Search-focused guide pages |

## Project structure

- `index.html`, `style.css`, `script.js`: homepage structure, styling, and interaction
- `book-*`, `horcrux-*`, `character-*`: reusable detail page logic and styles
- `magic-page.*`: interactive community and sharing features
- `guide.*`: guide-page content rendering and styles
- `wand.*`, `page-loader.js`, `magic-ui.js`: global magical interface effects

## Future backend integration

The routes already use query parameters such as `bookId`, `horcruxId`, and `id`. Replace the static data objects in the matching JavaScript files with API calls when a backend is introduced. Feedback and score data currently use `localStorage`; these can later be sent to a database or form endpoint.

## Disclaimer

This is an unofficial fan project and is not affiliated with or endorsed by J. K. Rowling, Warner Bros., Wizarding World, or their respective rights holders.
