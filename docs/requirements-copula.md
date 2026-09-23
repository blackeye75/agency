# Agency website: requirements from the Copula reference

Source: three screen recordings of https://copula.agency in `reference/`
(`…19-44-33.mp4` = C1 hero → manifesto → services, `…19-49-15.mp4` = C2 services →
work → clients → about, `…19-50-02.mp4` = C3 clients → about → news → footer),
analysed frame by frame, plus five screenshots from 23-09-2026.
Colors are sampled from the video. Fonts come from public design listings
(Bebas Neue + Mulish); the site is built with Next.js and Motion (Framer Motion).
The recordings do not show the source code.

**Priority sections** (picked by the product owner): the **landing/hero (P1)**, the
**curved manifesto text (P2)**, the **"connection" coil + 9.6 badge (P3)**, the
**"Nice to bond with you" circle reveal (P4)**, the **about paragraph fill with
cycling photos (P5)** and the **footer (P6)**. Full specs in section 5.

**Not recorded:** the "+" menu, hover on the service accordion, page transitions,
the work/blog detail pages.

---

## 1. Tech stack (Copula's own, for reference)

| Need | Copula uses | Our plan |
|---|---|---|
| Framework | Next.js | Next.js (App Router), same as the Crency plan |
| Animation | Motion (Framer Motion) | GSAP + ScrollTrigger (already used for the Crency parts), so one engine for the whole site |
| Smooth scroll | Lenis-style eased scroll | Lenis |

## 2. Design tokens

| Token | Value | Use |
|---|---|---|
| `--orange` | `#EB4304` | Hero, about, CTA pills, service headings, coil |
| `--blue` | `#0500D4` | Manifesto, news, badges ("LET'S BOND", "9.6"), asterisk |
| `--cream` | `#F2EEE9` | Light sections, text on orange/blue |
| `--ink` | `#444444` | Headings on cream |
| `--stone` | `#BCB0A8` | Inactive list items (services, featured work) |
| `--night` | `#262626` | Footer |
| `--dot` | `#A9A9F5` | Cursor dot |

**Type**
- Display: **Bebas Neue**, all caps, very tight line height (~0.9). Huge: hero lines ~190px at 1920px.
- Body: **Mulish** (medium/semibold) for small copy, tags, footer.
- Section labels: small caps label with a flower asterisk icon, e.g. "✺ OUR MANIFESTO", "✺ SERVICES", top-left of each section.

**Shapes** (the brand's signature)
- **Scalloped badge**: a circle with ~8 round bumps (like a flower/cloud), used for "LET'S BOND" (blue on orange, orange in the footer) and the "9.6" rating badge.
- **Scalloped oval photo mask**: tall oval with scalloped top and bottom, used for team and blog photos.
- **Six-arm asterisk** in blue next to "AGENCY".
- **Four circles** (2 solid, 2 rings) in a 2×2 grid, in the services section.

## 3. Global features

| # | Feature | Behavior | How to build it |
|---|---|---|---|
| CG1 | Smooth scroll | Eased scroll | Lenis |
| CG2 | Cursor dot | A small lavender dot (~14px) trails the mouse with a slight delay. No label, no state change seen | `quickTo` x/y, `mix-blend-mode` none. Desktop only |
| CG3 | Header | Hero: transparent bar with the "copula" wordmark left, a round cream "+" button right, and a thin cream line under it. After the hero, a **cream sticky bar** slides down when scrolling **up** and hides when scrolling down | Scroll-direction ScrollTrigger |
| CG4 | Section labels | "✺ LABEL" top-left of every section, sticky while the section is pinned | Plain markup |
| CG5 | Hard color cuts | Sections change color with **straight edges** (orange → blue → cream → orange → blue → dark). The one exception is P4, where the change is a shaped reveal | — |
| CG6 | Awwwards "Honors" tab | Black vertical tab on the right edge. That's Awwwards' badge, **not part of the design; skip it** | — |

## 4. Sections (in page order)

| # | Section | Background | Summary |
|---|---|---|---|
| C-S1 | Hero | orange | "YOUR / [ALL-IN-ONE → CREATIVE → DIGITAL] / AGENCY ✱ (LET'S BOND)". **P1** |
| C-S2 | Manifesto | blue | Curved line "THE BOND BEHIND BRAND SUCCESS" sweeps across, then a centred paragraph fades in. **P2** |
| C-S3 | Services | cream | Accordion list + four-circle graphic + orange CTA pill |
| C-S4 | Featured work | cream | Huge stacked client names; hover darkens one and shows ↓ arrows |
| C-S5 | Clients | cream | "WHEN THE C〰NNECTION IS REAL, IT SHOWS" + 9.6 badge + logo marquee. **P3** |
| C-S6 | Nice to bond | cream → orange | Two circles close in to reveal "NICE TO BOND WITH YOU". **P4** |
| C-S7 | About | orange | Paragraph fills word by word, scalloped photo cycles through team faces. **P5** |
| C-S8 | Latest news | blue | Headline + three blog cards with scalloped duotone photos + "SEE MORE" |
| C-S9 | Footer | dark | Wordmark, dictionary definition, giant nav, orange badge, socials, legal. **P6** |

### C-S3 Services
- Left: an accordion of three headings in Bebas: **PERFORMANCE & GROWTH** (active, orange) with a line of copy ("We track, measure, and optimize to ensure lasting results.") and **outlined pill tags** (Digital advertising strategy, Analytics & reporting, Campaign tracking & optimization, Conversion rate optimization (CRO), SEO, Email marketing, Web design & development); **CREATIVE SOLUTIONS** and **DIGITAL PRESENCE** inactive in `--stone`.
- Right: the **four-circle graphic** (top-left solid, top-right ring, bottom-left ring, bottom-right solid) in orange. It rises in with the section.
- Below: a full-width **orange pill CTA**: "READY WHEN YOU ARE. REACH OUT AND SEE WHAT HAPPENS WHEN THE RIGHT MINDS CONNECT" with the blue scalloped "LET'S BOND" badge at its right end.
- **Our version:** clicking a heading opens it (height animates, tags stagger in) and closes the others; each item could swap the circle graphic's arrangement.

### C-S4 Featured work
- Label "✺ FEATURED WORK", then three huge centred names in `--stone`: LEERDAMMER, MINORES, DM DROGERIE MARKT B&H.
- **Hover:** the hovered name turns `--ink` and a **↓ arrow** fades in at both the far left and far right of the row; the other rows stay grey.
- **Our version:** each row links to a case study; on hover, show a small preview image following the cursor (optional).

### C-S8 Latest news
- "✺ LATEST NEWS" centred; headline "WE CREATE, BUT WE ALSO REFLECT. EXPLORE WHAT WE'VE BEEN THINKING ABOUT LATELY." in cream.
- Three cards: a **scalloped-oval photo** with a **blue/orange duotone** treatment, then "Blog • Marketing, AI" meta and a two-line title. "SEE MORE" underlined link below.
- **How:** the duotone is a CSS `filter: grayscale(1)` plus a blue→orange gradient with `mix-blend-mode: screen`/`multiply`, or pre-processed images.

## 5. Priority effects: detailed specs

### P1: Landing hero (C1 0–6s, C3 end)
**Layout**
- Full-screen orange. Header row (CG3). Under it, top-left in small bold Mulish: "New name, same / Degordian DNA" (our version: a short tagline).
- Bottom-left, three lines of Bebas at ~190px, cream: **YOUR** / **[rotating word]** / **AGENCY** followed by a big blue **six-arm asterisk** and a blue **scalloped "LET'S BOND" badge**.

**Rotating word** (the key effect)
- Words cycle: **ALL-IN-ONE → CREATIVE → DIGITAL → …**, each held ~2.5s.
- **In:** letters appear **one by one from left to right**, each fading from ~30% to full cream and sliding up slightly (~0.08s stagger, ~0.4s each).
- **Out:** letters disappear **left to right** the same way (fade + slight lift), so the word "wipes" away from the left before the next one writes in.
- The line keeps its height when empty, so nothing below jumps.
- **How:** an array of words; for each, split into `<span>` letters; a GSAP timeline `from({opacity:0, yPercent:40}, stagger:.06)` then `to({opacity:0, yPercent:-30}, stagger:.04)`, repeat forever. `aria-live="off"`, with the full phrase ("Your all-in-one, creative, digital agency") in a visually hidden span for screen readers.
- **Badge:** the scalloped "LET'S BOND" badge slowly rotates its outline (text stays upright) and scales to 1.08 on hover; the asterisk rotates ~45° on hover.
- **Scroll-out:** the hero scrolls away normally; the blue manifesto slides up over it with a straight edge.

### P2: Curved manifesto line (C1 6–14s)
- Blue section, **pinned** for about 150vh of scroll.
- The sentence **"THE BOND BEHIND BRAND SUCCESS"** (Bebas, cream, ~90px) runs along an **S-shaped wave path** (rising on the left, dipping in the middle, rising again on the right).
- **Tied to scroll:** the text **enters from the left edge, travels left → right along the curve**, sits roughly centred at the middle of the pin, then continues and **exits off the right edge**. Letters rotate to follow the curve.
- Then the manifesto paragraph appears centred: "WE BRING STRATEGY, CREATIVITY, AND AGILE APPROACH TOGETHER TO HELP BRANDS CONNECT WITH PEOPLE, AND TURN THAT CONNECTION INTO REAL RESULTS." It **fades from ~15% to full** (the whole block, scrubbed), then the section unpins.
- **How:** an SVG `<path>` (the wave) + `<text><textPath startOffset="…">`; ScrollTrigger scrubs `startOffset` from `-100%` to `100%` (text length measured once). Path width = 120% of the viewport so the text can enter and leave off-screen. Reverse on scroll up is automatic.
- **Mobile:** same effect with a flatter curve and smaller text (~12vw).

### P3: "When the c〰nnection is real, it shows" (C2 12–17s)
- Label "✺ OUR CLIENTS". Three lines of huge Bebas in `--ink`: **WHEN THE / C〰〰〰〰NNECTION / IS REAL, IT SHOWS**.
- The **"O" in CONNECTION is replaced by an orange coil**: a hand-drawn spring (~11 loops) the width of several letters, sitting on the baseline, with a stroke ending in a tail into the "N".
- **Motion:** the coil **draws itself in** (stroke from left to right) as it enters the viewport. **Our addition:** scrub the coil's horizontal stretch slightly with scroll (loops spread apart and relax), which fits the "bond" idea.
- **9.6 badge:** a blue scalloped badge overlapping the end of "CONNECTION", with a big cream "9.6" and ring text "OVERALL CLIENT RATING SCORE" running around it. The ring text **rotates slowly**; the badge pops in (scale 0 → 1, `back.out`) when the line appears.
- **Logo marquee** below: a row of client logos in `--ink`, **scrolling right → left continuously**, looping.
- **How:** coil = one SVG path, `stroke-dasharray` / DrawSVG on enter; badge = SVG circle-with-bumps + `<textPath>` on a circle; marquee = two copies + infinite `xPercent: -50` tween.

### P4: "Nice to bond with you" circle reveal (C3 11–18s, C2 18–24s)
The standout transition between the cream clients area and the orange about section.
- The section is **pinned** (~150vh).
- Start: cream screen. **Two huge orange circles** (each ~1.6× the viewport width) sit mostly off-screen: one centred **above** the top edge, one centred **below** the bottom edge; only their curved edges show.
- **Tied to scroll:** both circles move toward the middle (or grow), so their edges sweep in from top and bottom. The cream gap between them narrows into a **horizontal "bow-tie"**: two cream wedges pointing into the centre from the left and right edges.
- The wedges shrink to small triangles at the edges and vanish; the screen is solid orange.
- **"NICE TO / BOND / WITH YOU"** (Bebas, cream, ~170px, centred) is **only visible inside the orange shapes**: it is clipped by the circles, so it appears piece by piece as the orange covers it.
- Then "✺ ABOUT US" label appears and the heading scrolls up normally into the about section.
- **How:** an orange layer containing the heading, with an SVG `clipPath` of two circles (`<circle cy="-r+offset">` and `<circle cy="h+r-offset">`) or CSS `clip-path` via two radial gradients in a `mask`. ScrollTrigger scrubs `offset` (or radius) from 0 to the value where the circles fully overlap. Reverses on scroll up.

### P5: About paragraph fill + cycling photo (C3 18–33s)
- Orange section, label "✺ ABOUT US".
- Paragraph in Bebas (~64px, 5 lines): "WE'RE THINKERS, MAKERS, AND DOERS, COFFEE LOVERS (MOSTLY ALL), FOOD OBSESSED, CURIOUS BY NATURE, STRATEGIC BY CHOICE. WE EXPLORE, QUESTION, AND CONNECT UNTIL THE ANSWER FITS. EVERY PROJECT IS A JOURNEY, AND WE'RE HERE FOR THE RIDE."
- **Fill on scroll:** the text starts pale (cream at ~45% opacity on orange) and **fills to solid cream word by word, left to right, line by line**, tied to scroll (scrubbed; reverses on scroll up).
- **"BOND MORE WITH US"** underlined link below.
- **Cycling photo:** bottom-right, a **scalloped-oval photo mask** (~330×330px) showing team portraits that **change every ~0.8s** (hard cut), looping. Some photos are black & white, some colour.
- **How:** SplitText by words; one scrubbed ScrollTrigger (`start: "top 70%"`, `end: "bottom 40%"`) animating `opacity` 0.45 → 1 with a stagger across words. Photos: an `<img>` stack inside an element with `clip-path: url(#scallop-oval)`; a `setInterval` (or GSAP repeat) toggles which one is visible; pause when off-screen and when reduced motion is on.

### P6: Footer (C3 36–38s, screenshot 1)
- Dark `--night` background, full height.
- **Left:** a giant "copula" wordmark (our logo) in cream; under it a dictionary-style entry: "[koh-poo-la] noun • latin" and a definition sentence with the key words in orange italics. **Our version:** do the same with our agency name (its pronunciation, origin and meaning).
- **Centre:** a giant vertical nav in Bebas (~90px): **ABOUT / BLOG / WORK / CONTACT**.
- **Top-right:** the orange scalloped **"LET'S BOND"** badge.
- **Bottom row:** "Developed and designed by …, 2026. All rights reserved." · social icons (Facebook, LinkedIn, Instagram, TikTok) · Terms and Conditions · Privacy Policy · Cookie policy.
- **Motion (our addition):** nav words slide up out of a mask on enter; hovering a nav word shifts it right and turns it orange; the badge rotates slowly.

## 6. Assets to produce
- [ ] Our wordmark in a rounded geometric style (Copula's is a light rounded sans).
- [ ] Scalloped badge and scalloped-oval mask (SVG, reusable).
- [ ] Six-arm asterisk and the "✺" flower label icon.
- [ ] Coil path for the "O" (SVG).
- [ ] Team portraits (6–10) for the about cycle; blog cover photos.
- [ ] Client logos (monochrome SVG) for the marquee.
- [ ] Copy: rotating hero words, manifesto line and paragraph, about paragraph, footer definition.

## 7. Build order (Copula parts)
1. Tokens, fonts (Bebas Neue, Mulish), header and cursor dot.
2. **P1 hero with rotating word**, **P2 curved manifesto**.
3. **P4 circle reveal** and **P5 about fill + photos**.
4. **P3 coil + badge + marquee**, services, featured work.
5. News, **P6 footer**.
6. Mobile and reduced-motion pass.

## 8. Next step: merging with Crency
Once both specs are settled, `docs/merge-plan.md` will map each section of the final site to either the Crency or the Copula version (or a blend), with one shared set of tokens.
