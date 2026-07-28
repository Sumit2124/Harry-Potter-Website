# The Wizarding Archive

The Wizarding Archive is a polished, static Harry Potter fan experience built with HTML, CSS, and vanilla JavaScript. It combines story guides, reusable detail routes, character profiles, atmospheric gallery cards, interactive quizzes, and search-friendly educational pages.

Live site: [wizarding-archive-sumit.netlify.app](https://wizarding-archive-sumit.netlify.app/)

This is an unofficial fan project created by [Sumit Thapliyal](https://github.com/Sumit2124). It has no backend requirement today, but its URL-based data model is ready to connect to an API later.

## Features

- Sticky navigation, magical cursor effects, transitions, and a themed page loader
- Reusable book and Horcrux detail pages powered by URL query parameters
- Character directory and detailed character profiles
- Wallpaper gallery and archive-style content sections
- Interactive Play page with house and character quizzes, a daily quiz, spell generator, Horcrux challenge, share-by-copy, and local score storage
- Search-focused guides for Horcruxes, characters, movie order, spells, books, wands, Patronuses, houses, the timeline, Deathly Hallows, and the ending
- Interactive Hogwarts map and complete spell encyclopedia with static SEO content plus JavaScript filtering
- Internal “keep exploring” paths, canonical URLs, descriptive meta descriptions, JSON-LD, robots.txt, and sitemap.xml
- Weekly character focus, Friday wallpaper prompts, hidden spell prompts, and a daily return loop
- Native social sharing with a safe clipboard fallback for desktop browsers
- Feedback capture stored locally in the browser until a backend is added

## Run locally

Because this is a static site, no installation is required. Open `index.html` in a browser.

For the most browser-like local experience, serve the folder with any static server. For example:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Main pages

| Page | Purpose |
| --- | --- |
| `index.html` | Netlify entry point and main archive hub |
| `ui/book.html?bookId=1` | Reusable book-detail route |
| `ui/horcrux.html?horcruxId=1` | Reusable Horcrux-detail route |
| `ui/characters.html` | Character directory |
| `ui/character.html?id=harry-potter` | Character profile route |
| `ui/magic.html` | Quizzes, spell generator, and return features |
| `ui/interactive-hogwarts-map.html` | Interactive Hogwarts location guide |
| `ui/complete-harry-potter-spell-encyclopedia.html` | Searchable spell encyclopedia |
| `ui/harry-potter-*.html` | Search-focused guide pages with metadata and internal links |

## Project structure

- `index.html`: Netlify’s root entry file; it links into the UI layer
- `ui/*.html`: all substantive HTML UI pages, including reusable detail routes and SEO guides
- `css/`: global design tokens, responsive layout, guide styles, and page-level styles
- `js/`: interactions, route data, loader behaviour, sharing, and weekly archive features
- `netlify.toml`: rewrites the original public page URLs to their `ui/` source files
- `ui/README.md`: explains the UI-layer boundary and Netlify compatibility routing
- `js/magic-page.js`, `js/archive-features.js`: interactive challenges, scores, weekly return loop, and feedback UI
- `js/share.js`: reusable sharing with a clipboard fallback
- `js/guide-support.js`, `css/guide.css`: guide-page content support, related links, sharing, and styles

## Future backend integration

The routes already use query parameters such as `bookId`, `horcruxId`, and `id`. Replace the static data objects in the matching JavaScript files with API calls when a backend is introduced. Feedback and score data currently use `localStorage`, so they are private to the visitor’s browser and are not a global leaderboard. Replace those storage calls with API endpoints when persistence is ready.

## Deploying

The project can be deployed directly as a static folder on Netlify, GitHub Pages, or any static host. After a deploy, submit `/sitemap.xml` in Google Search Console and request indexing for the homepage and highest-priority guides. Search visibility takes time; use Search Console to watch impressions, queries, clicks, and mobile usability.

## Contribution notes

Keep guide pages focused on one search intent, add a unique title, meta description, canonical URL, and at least two useful internal links. Update `sitemap.xml` whenever a new crawlable page is added. Avoid committing private API keys or copyrighted media files.

## Disclaimer

This is an unofficial fan project and is not affiliated with or endorsed by J. K. Rowling, Warner Bros., Wizarding World, or their respective rights holders.
