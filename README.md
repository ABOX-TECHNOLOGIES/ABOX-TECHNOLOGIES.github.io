# ABOX Technologies — aboxtechs.com

Static marketing site for **ABOX Technologies**, a consultancy that helps businesses transition into the AI era.

No build step. Plain HTML, CSS and vanilla JavaScript.

## Structure

```
index.html          Single-page site (English inline, Chinese via js/i18n.js)
css/style.css       Styles, dark theme, responsive layout
js/i18n.js          EN / ZH copy dictionary
js/main.js          Language/metadata toggle, accessible mobile nav, email copy, scroll reveal
assets/logo.svg     Full horizontal logo (mark + wordmark)
assets/logo-mark.svg  Mark only
assets/favicon.svg  Favicon (same mark)
CNAME               Custom domain for GitHub Pages (aboxtechs.com)
robots.txt, sitemap.xml
```

## Logo

The mark is an open box — a nod to Pandora's box — but what escapes is a glowing
network of nodes, circuit traces and data: the internet and AI, not the world's ills.
Logo colours: cyan `#22D3EE` to violet `#8B5CF6`. The page uses forest green
`#101714`, warm white `#F2F3EB`, and a lime accent `#C5F48A`.

## Page experience

The page covers services and their deliverables, illustrative AI use cases,
the four-stage engagement process, the brand story, FAQs, and contact.
Use cases describe possible projects; they are not customer case studies.

English and Chinese follow browser language, with the visitor's choice saved
locally. Language switching also updates the title, description, accessible
labels, and inquiry email draft. Contact opens the visitor's email app with a
short brief template; there is no form backend. Copying the email address uses
the browser clipboard on HTTPS and offers manual-copy guidance if unavailable.

Navigation supports keyboard use and Escape on mobile. Content and FAQs remain
available without JavaScript. System fonts avoid a third-party font request;
motion respects the visitor's reduced-motion preference.

GA4 (`G-6SJXYJMZ7C`) retains page tracking and adds `language_switch`,
`contact_email_click`, and `contact_email_copy` events. Event parameters include
interface language and button location, without email draft contents.

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
```

## Deploy

Any static host works. For GitHub Pages: push to a repo, enable Pages on the
`main` branch, and point the `aboxtechs.com` DNS (A / ALIAS records) at GitHub Pages.
The `CNAME` file is already in place.
