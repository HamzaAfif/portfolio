# hamzaafif.me

Personal portfolio of Hamza AFIF — software engineer and AI developer, master's student at UQAM in Montreal.

Live at **[hamzaafif.me](https://hamzaafif.me)**.

## Stack

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies to install — open `index.html` and it runs.

## Layout

```
index.html            homepage: about, experience, certifications, projects, achievements, contact
404.html              not-found page
styles.css            shared styles for every page
main.js               homepage behaviour (nav, project filter, certification slider, reveals)
project-script.js     shared behaviour for the project pages
projets/              one page per project + project-specific styles
assets/               images (WebP) and PDFs
robots.txt            crawler rules, points at the sitemap
sitemap.xml           all 19 indexable URLs
site.webmanifest      PWA/install metadata
_headers              cache and security headers (Cloudflare Pages)
```

## Running it locally

```bash
python -m http.server 5599
```

Then open <http://127.0.0.1:5599>. A plain file open (`file://`) also works, but relative links behave better over HTTP.

## Adding a project

1. Copy an existing page in `projets/` as a starting point.
2. Update the `<title>`, `<meta name="description">`, `<link rel="canonical">`, the Open Graph tags, and the JSON-LD block in the head — each page needs its own.
3. Add a matching `.project-card` to the projects grid in `index.html`, with the right `data-category` (`AI`, `blockchain`, `web`, `software`, `networking`) so the filter picks it up.
4. Add the new URL to `sitemap.xml`.

## Images

Images are stored as resized WebP. Before committing a new one, resize it to the width it is actually displayed at (project screenshots max out at 1400px) and export as WebP — full-resolution PNG screenshots are what made this site slow in the first place.

Every `<img>` needs `width`, `height`, `loading="lazy"` and `decoding="async"`. The dimensions prevent layout shift as images load.

## Icons

Icons come from an inline SVG sprite at the top of `index.html` (the `<symbol>` blocks), used as:

```html
<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-mail"></use></svg>
```

They inherit `currentColor`, so they take the colour of whatever contains them. There is no icon-font dependency.

## Two things to know before editing

**Reveal animations are gated on `html.js`.** The inline script in each `<head>` swaps `no-js` for `js`. The CSS only hides `.reveal` elements when that class is present, so if JavaScript fails the page still renders in full. Don't move the hidden state out of that gate.

**`main` is not the deployed branch.** The site is built from `master`. The `main` branch still holds an old placeholder page.
