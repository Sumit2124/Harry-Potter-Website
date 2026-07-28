# Search page template

Use this when adding a new search-focused guide page to The Wizarding Archive.

## Page target

- Search intent:
- Public URL:
- Source file in `ui/`:
- Primary keyword:
- Related internal links:

## Required metadata

```html
<title>Focused Page Title | The Wizarding Archive</title>
<meta name="description" content="One clear, helpful description of the page in about 140-160 characters.">
<link rel="canonical" href="https://wizarding-archive-sumit.netlify.app/example-page.html">
```

## Required structured data

Use `WebPage` for interactive/utility pages and `Article` for detailed guide pages.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Focused Page Title",
  "description": "Short page summary.",
  "url": "https://wizarding-archive-sumit.netlify.app/example-page.html",
  "isPartOf": {
    "@type": "WebSite",
    "name": "The Wizarding Archive",
    "url": "https://wizarding-archive-sumit.netlify.app/"
  }
}
</script>
```

## Content checklist

- One clear H1.
- Direct answer in the first paragraph.
- Descriptive H2 sections.
- Static HTML content; do not rely only on JavaScript to render the useful answer.
- At least three internal links to related guides, character pages, book pages, or play pages.
- Descriptive alt text for meaningful images.
- Back button or next-step links.
- Mobile-friendly layout.

## Routing checklist

- Add a Netlify rewrite in `netlify.toml` if the public URL is clean/root-level.
- Add the public URL to root `sitemap.xml`.
- Confirm `robots.txt` still points to root sitemap.

## Validation

```bash
for file in js/*.js; do node --check "$file" || exit 1; done
xmllint --noout sitemap.xml
git diff --check
```
