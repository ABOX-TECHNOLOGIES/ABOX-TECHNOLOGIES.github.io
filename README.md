# ABOX Technologies — aboxtechs.com

Static marketing site for **ABOX Technologies**, a consultancy that helps businesses transition into the AI era.

No build step. Plain HTML, CSS and vanilla JavaScript.

## Structure

```
index.html          Single-page site (English inline, Chinese via js/i18n.js)
css/style.css       Styles, dark theme, responsive layout
js/i18n.js          EN / ZH copy dictionary
js/main.js          Language toggle, mobile nav, scroll reveal
assets/logo.svg     Full horizontal logo (mark + wordmark)
assets/logo-mark.svg  Mark only
assets/favicon.svg  Favicon (same mark)
CNAME               Custom domain for GitHub Pages (aboxtechs.com)
robots.txt, sitemap.xml
```

## Logo

The mark is an open box — a nod to Pandora's box — but what escapes is a glowing
network of nodes, circuit traces and data: the internet and AI, not the world's ills.
Colours: cyan `#22D3EE` to violet `#8B5CF6` on deep navy `#070B14`.

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
```

## Deploy

Any static host works. For GitHub Pages: push to a repo, enable Pages on the
`main` branch, and point the `aboxtechs.com` DNS (A / ALIAS records) at GitHub Pages.
The `CNAME` file is already in place.
