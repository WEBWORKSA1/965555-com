# 965555.com — Lucky Number Lab

**Decode any number the Chinese way.** A static, zero-backend website with free Chinese number-luck tools, guides and videos, plus built-in monetization (AdSense slots, YouTube embeds, sponsorships), a lead-generation concierge, donations, a monthly contest and careers. Hosted free on GitHub Pages.

## Features
- **Tools:** Lucky Number Checker (0–100 score), Number Meaning Lookup (`number.html?n=`), Slang Decoder, Number Generator, Lucky Date Checker (plus the top 20 dates), Zodiac Lucky Numbers, Kua Calculator, Red Envelope Amount Picker.
- **Content:** a dictionary of 100+ numbers, 6 in-depth guides, a printable cheat sheet and a curated video hub.
- **Revenue:**
  - AdSense-ready slots with house-ad fallback
  - Lead-gen concierge with 3 tabs and a multi-step form
  - Exit-intent lead magnet
  - Donations: PayPal tiers plus a pledge form
  - Contest, advertise/sponsor rate card, careers
- **Required elements:**
  - Top banner on every page linking to web.works/contact.
  - A single contact channel, obfuscated in `assets/js/config.js` and never present in plain text.
  - Trademark/copyright disclosure in the footer and on `disclaimer.html`.
- SEO: canonical, OG/Twitter, JSON-LD (WebSite + SearchAction, FAQPage, Article), `sitemap.xml`, `robots.txt`.

## Go-live checklist
1. **GitHub Pages:** Settings → Pages → Source "Deploy from a branch" → `gh-pages` (or `main`) / root.
2. **Custom domain:** add a `CNAME` file containing `965555.com`. Point DNS A records to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153 (plus a `www` CNAME to `webworksa1.github.io`). Then enable "Enforce HTTPS".
3. **Forms (FormSubmit):** submit any form once, then click the activation link FormSubmit emails to the inbox. After that, all forms deliver.
4. **AdSense:** after approval, set `adsenseClient` (and optional slot ids) in `assets/js/config.js` and update `ads.txt`.
5. **Analytics:** optionally set `ga4Id` in `config.js`.
6. **Extra donation platforms:** fill `donate.kofi` / `buymeacoffee` / `github` / `stripe` in `config.js` to show those buttons.

## Structure
```
*.html               pages (flat, relative links → works on github.io and custom domain)
assets/css/style.css design system (light/dark)
assets/js/config.js  site settings (ads, analytics, obfuscated contact, donation links)
assets/js/data.js    digits, 100+ combos, zodiac, Kua tables, videos
assets/js/app.js     layout, number engine, tools, forms, ads, videos
docs/RESEARCH.md     research on "965555" and the 26-site competitive survey
docs/BUILD-PROMPT.md phase-wise build prompt
```

## Legal
"965555" is used solely as a domain name and numeric sequence. No trademark rights are claimed, and the site is not affiliated with any entity that uses the same digits. See `disclaimer.html`.
