# UI layer

All substantive HTML UI now lives in this folder. The one exception is the root `index.html`, which remains as Netlify’s entry point and navigation hub.

The presentation layer is split across:

- `ui/*.html` for the main archive, reusable book/Horcrux/character routes, the Play page, guide pages, and the magical family tree.
- `css/` for the visual system and page-level styles.
- `js/` for interactions, reusable route data, loader behaviour, sharing, and weekly archive features.
- `netlify.toml` for compatibility rewrites from the original public URLs to these `ui/` files.

Each UI page uses `<base href="../">` so its CSS and JavaScript continue to resolve from the shared root-level `css/` and `js/` folders. Existing deployed URLs such as `/book.html?bookId=2` remain stable through Netlify rewrites, while source files are organized under `ui/`.
