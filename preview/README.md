# Homepage preview (plain HTML/CSS/JS)

A clickable preview of the agency homepage, modelled on the Crency reference recordings.
Section numbers in the code (S1…S10, 5A…5G, G1…G11) match `docs/requirements.md`.

## Open it

Double-click `index.html`, or serve the folder (recommended, so fonts and scroll behave like production):

```bash
cd preview
python3 -m http.server 8000   # then open http://localhost:8000
```

GSAP and Lenis are bundled in `vendor/`, so the page works offline except for the Google Fonts.

## What's in it

| Section | What to try |
|---|---|
| Hero (S1) | Letters rise in, a pen draws the curve, badges pop as it passes. Scroll back up to replay the letters. |
| Wavy edges (5A) | Scroll slowly past any dark/light boundary: the curve rolls from hill to dip. |
| Icon story (5B) | Pinned: the about text fades, icons scatter, then fly into the sentence. Scroll up to reverse. |
| Trust (S4) | Mascot grows and shrinks with scroll; lime highlighter sweeps in. |
| Services (S5) | Pinned 3D card flip. |
| Cases (S6) | Drag or swipe the fan, use the arrow buttons, click a side card, or focus it and press ← →. Starting case is random. |
| Signposts (S7) | Slide in from opposite sides. |
| Audit (S8) | Score chips count up once. |
| Mood picker (S9) | Pick a sticker: the button text changes. |
| Marquee (S10) | Speeds up while you scroll. |
| Cursor (5D) | "You" by default, "Click" over links, "Drag" over the cases. Desktop only. |
| Buttons (5E) | Hover any "get my …" button. |
| Menu (5F) | "Open: Menu" in the bottom bar. Esc closes. |
| Page transition (5G) | Any nav, menu or footer link plays the transition, then jumps to that section. |

Mobile (< 768px) turns off the pinned sections and the custom cursor; "reduce motion" shows everything static.

## Placeholders to replace

- Brand name **Nova Studio** / **NOVA** (index.html, main.js case cards) and `hello@example.com`.
- All case studies, ratings and quotes in `CASES` in `main.js` are made up.
- Stats in the hero badges and the about paragraph.
- Custom letterforms are approximated with the Unbounded font (`.alt` classes in styles.css); the real site will need drawn SVG glyphs.
