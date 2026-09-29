# Phase-wise Build Prompt: 965555.com "Lucky Number Lab"

Copy each phase into your AI builder (Claude, Cursor or similar) in order. Every phase inherits the **Global Rules**.

---

## GLOBAL RULES (paste with every phase)
- **Project:** 965555.com, "Lucky Number Lab: decode any number the Chinese way." A static, zero-backend site hosted free on **GitHub Pages** (repo `webworksa1/965555-com`). Plain HTML5 + CSS + vanilla JS. No build step required. Relative links only, so it works under `/965555-com/` and on the custom domain.
- **Top-of-page banner on EVERY page (first element in `<body>`):** "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership", linked to `https://web.works/contact`.
- **One email only**, for every form and contact: the owner's address. It must **never appear in HTML, visible text or plain source**. Store it obfuscated (a char-code array) in `assets/js/config.js`, decode it at runtime only when a form is submitted or a link is clicked. Forms post via FormSubmit AJAX, with a `mailto:` fallback built at click time.
- **Brand:** red `#C8102E`, gold `#D4A017`, ink `#1a1a1a`, paper `#fffaf2`. Dark mode. Fonts: Inter + Noto Serif SC (Google Fonts). Mobile-first. WCAG AA. Lighthouse 90+.
- **Legal:** "965555" is used only as a domain / numeric sequence. No trademark claims, not affiliated with any entity that uses the sequence. Footer disclosure plus a full Disclaimer page. Cultural content is "for education and entertainment".
- **Monetization hooks everywhere:** AdSense slots (config-driven, with a house-ad fallback), YouTube embeds (privacy-enhanced facade), affiliate slots, donate CTA, lead CTA.

---

## PHASE 1: Foundation and design system
Create `index.html`, `assets/css/style.css`, `assets/js/config.js`, `assets/js/app.js`, `assets/js/data.js`, `favicon.svg`, `manifest.webmanifest`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `ads.txt` (template), `404.html`.
- CSS tokens, light and dark themes, container, grid, cards, buttons (primary red, gold, ghost), badges, verdict colours (大吉 gold, 吉 green, 中平 grey, 凶 dark), tables, accordions, tabs, modal, toast, form controls, ad-slot boxes.
- `app.js` injects the shared header (logo, mega-nav: Tools / Meanings / Guides / Videos / Get Report / Support) and the footer (sitemap columns, newsletter, social, disclosure). It also handles the mobile drawer, theme toggle, cookie-consent bar, scroll-to-top and active nav state.
- `config.js`: `adsenseClient`, `ga4Id`, `formEndpoint`, obfuscated email, donation links, social URLs.

## PHASE 2: Number engine and data
`data.js`:
- Digits 0–9: hanzi, pinyin, Cantonese, homophones, score (−10…+10), meaning.
- 100+ combos: 168, 518, 520, 521, 1314, 5201314, 666, 888, 999, 88, 886, 233, 555, 5555, 250, 14, 74, 748, 94, 9420, 7456, 918, 995, 996, 3Q, 965 and others. Each has a reading, meaning, category (lucky, love, slang, unlucky) and score.
- 12 zodiac animals with lucky and unlucky numbers, colours and years.
- Kua direction tables.

Engine: `scoreNumber(str)` returns 0–100. The inputs:
- the average digit value
- combo bonuses and penalties
- a pattern bonus (AAAA, ABAB, ascending runs, ending 8)
- an any-4 penalty

It returns a verdict (大吉/吉/中平/小凶/凶), a per-digit breakdown, the combos found and a text explanation. Transparent methodology is shown on-page.

## PHASE 3: Core tools (one page each, tool in the hero, answer-first)
1. **Lucky Number Checker** (phone, plate, house, domain, any string). Score gauge, breakdown, share button, "Get full report" CTA.
2. **Number Meaning Lookup** `number.html?n=`: characters, pinyin, homophone chain, dictionary match, sub-combos, related numbers, deep link per number.
3. **Meanings Dictionary**: searchable and filterable table of all combos.
4. **Number Slang Decoder**: type a sentence of numbers, get a translation.
5. **Lucky Number Generator**: length, prefix, must include, no-4, count. Returns the top-scored numbers.
6. **Lucky Date Checker**: score any date, plus the top 20 digit-lucky dates in the next 12 months (wedding, launch, move).
7. **Zodiac Lucky Numbers**: birth year → animal, lucky and unlucky numbers, colours, compatibility.
8. **Kua Number Calculator**: birth date + gender → Kua, East/West group, four lucky directions.
9. **Red Envelope (Hongbao) Amount Picker**: budget + occasion → nearest auspicious amounts.

## PHASE 4: Content and SEO
- Guides (1,200–2,000 words, table of contents, FAQ schema, internal links, video embed):
  - Meaning of 965555
  - Complete Chinese Lucky Numbers Guide
  - Why Chinese Buyers Pay Millions for Numeric Domains
  - Lucky Phone Numbers
  - Lucky License Plates
  - Auspicious Wedding Dates
- Videos hub: curated YouTube embeds with a lazy facade, categorised.
- Schema.org: WebSite + SearchAction, Organization, FAQPage, Article, BreadcrumbList. OG and Twitter cards on every page. `sitemap.xml`.
- Expansion path: a generator script that emits static `number/<n>.html` pages (0–9999) for programmatic SEO.

## PHASE 5: Lead generation (dedicated, high-converting)
`get-your-report.html`, the "Lucky Number Concierge", with three tabs:
1. **Free Personalised Lucky Number Report.** Name, email, birth date, number to analyse, goal. Promise: delivered in 24–48h.
2. **Buy / Sell a Lucky Number or Numeric Domain.** Type, budget range, timeline.
3. **Business Launch Consultation.** Company name, launch window, market (CN/HK/SG/TW/global).

Supporting elements:
- Social proof, benefit bullets, a 3-step "how it works" and an FAQ.
- A privacy line, an urgency element ("limited free reports this month") and one sticky CTA.
- A progressive multi-step form with a progress bar.
- Hidden UTM, referrer and lead-score fields.
- A success screen that offers the cheat sheet plus a donate upsell.
- Global capture:
  - an exit-intent modal (free "Lucky Numbers Cheat Sheet"; the printable `cheat-sheet.html`)
  - an inline CTA after every tool result
  - a newsletter in the footer

## PHASE 6: Revenue and community pages
- **Donate / Support:** tiers $5 · $18 · $88 · $168 · $888 named after lucky numbers. Fund-allocation bars (operations, promotion/marketing, hiring talent, contest prizes). PayPal link built at runtime from the obfuscated email. Pledge form. Supporter wall.
- **Contest:** monthly "Lucky Number Story" contest. Prizes, rules, eligibility, timeline, entry form, sponsor slot, winners list. "No purchase necessary."
- **Advertise / Sponsor / Partner:** audience stats, ad formats, starting rate card, sponsorship packages, partnership types (affiliate, content, API, domain brokerage), inquiry form. Banner link to web.works/contact.
- **Careers:** open roles (bilingual writer, feng shui consultant, video creator, SEO, moderator) and an application form.

## PHASE 7: Trust and legal
About (mission, methodology), FAQ, Contact (form only), Privacy (AdSense/cookies/GA disclosures, GDPR/CCPA), Terms, Disclaimer (trademark/copyright disclosure, entertainment disclaimer, affiliate disclosure, contest rules reference), cookie consent.

## PHASE 8: QA, performance and deploy
- Validate links. Grep the build to confirm the email string never appears in plain text.
- Check responsiveness at 360, 768 and 1280 px. Keyboard navigation. Lazy-load images and iframes.
- Push to `main` and publish via GitHub Pages (branch `gh-pages` or `main` /root).
- Post-launch:
  - apply for AdSense and paste the publisher ID into `config.js` and `ads.txt`
  - verify Search Console and submit the sitemap
  - add the custom domain (a `CNAME` file plus DNS A records 185.199.108–111.153)
  - activate FormSubmit by confirming the first submission email

## PHASE 9: Growth (post-launch)
- Programmatic `number/<n>` pages.
- Chinese (zh-Hans/zh-Hant) versions with hreflang.
- A monthly auspicious-dates email.
- Paid PDF reports (Gumroad / Lemon Squeezy).
- Affiliate feng shui store and vanity-number/domain marketplace listings.
- A YouTube channel ("Number of the Day" Shorts) embedded back into the site.
- A public JSON API of number meanings for partners.
