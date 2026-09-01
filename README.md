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



## After editing CSS or JS, run this

```bash
python tools/stamp-assets.py
```

`_headers` caches `styles.css`, `main.js`, `project-script.js` and
`project-styles.css` for a week. Without a versioned URL an edit takes up to
seven days to reach anyone who has already visited the site, and in the
meantime they see new markup styled by old CSS. The script appends a content
hash (`styles.css?v=5627567e`) to every reference in every HTML file, so the
URL changes only when the file changes.

Forgetting it is not a silent failure you will notice locally — your own
browser will look fine while visitors get the stale stylesheet.
