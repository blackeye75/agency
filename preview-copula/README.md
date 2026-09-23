# Homepage preview: Copula style (plain HTML/CSS/JS)

A clickable preview modelled on the Copula reference recordings.
Section numbers in the code (P1…P6, C-S3…, CG1…) match `docs/requirements-copula.md`.
GSAP and Lenis are bundled in `vendor/`, so the folder works on its own.

## Open it

```bash
cd preview-copula
python3 -m http.server 8000   # then open http://localhost:8000
```

## What to try

| Section | What happens |
|---|---|
| Hero (P1) | The middle word cycles ALL-IN-ONE → PRODUCT → SOFTWARE, letters writing in and wiping out left to right. Hover the asterisk and the badge. |
| Manifesto (P2) | Pinned: "THE CODE BEHIND BRAND SUCCESS" travels along an S-curve from left to right as you scroll, then the paragraph fades up. Scroll back to reverse. |
| Services | Click an accordion heading: it opens, tags stagger in, the four circles rotate. |
| Featured work | Hover a name: it darkens and ↓ arrows appear. |
| Clients (P3) | The coil draws itself in place of the "O", the 9.6 badge pops in and its ring text spins, logos scroll. |
| Nice to build (P4) | Pinned: two orange circles close in from top and bottom; the heading only shows inside the orange. |
| About (P5) | Words fill from pale to solid as you scroll; the scalloped portrait cycles faces. |
| Footer (P6) | Giant nav slides up; hover a word. |

The header bar appears when you scroll **up** past the hero. The "+" button scrolls to the footer nav (Copula's menu wasn't recorded).

## Placeholders

Brand "nova", all client names, logos, portraits (drawn SVG stand-ins), blog posts and the 9.6 rating are made up.
