# Agency website: requirements from the Crency reference

Source: two screen recordings of https://crency.agency in `reference/`
(`…02-15-25.mp4` = part 1, `…02-31-29.mp4` = part 2), analysed frame by frame.
Colors are sampled from the video. Fonts and libraries are inferred from how the
site looks and moves; the recordings do not show Crency's source code.

**Not yet recorded:** the page transitions, the menu overlay, the remaining
service cards, the case studies, the footer and the contact flow.

---

## 1. Tech stack

| Need | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Animation | GSAP 3.13+ (free, all plugins): ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, Flip, plus `@gsap/react` (`useGSAP`) |
| Smooth scroll | Lenis, synced to ScrollTrigger via `gsap.ticker` |
| Styling | Tailwind CSS or CSS Modules with CSS custom properties for tokens |
| Assets | Inline SVG for icons, stickers, the mascot and the custom letterforms |
| Hosting | Vercel |

## 2. Design tokens

| Token | Value | Use |
|---|---|---|
| `--ink` | `#120030` | Hero background, dark sections, text on light backgrounds |
| `--lilac` | `#CEBCF2` | Hero text, background of the light sections |
| `--lime` | ~`#D4FF3A` | Pen line, cursor label, highlights, CTA pill |
| `--pink` | ~`#E6368C` | Stickers, service card |
| `--red` | `#D81E24` | Stickers |
| `--blue` | ~`#1F3BFF` | Stickers |
| `--orange` | ~`#E8641E` | Stickers |
| `--violet` | ~`#4B1FE0` | Stickers |

**Type**
- Display: a heavy condensed sans, all caps, very large (Druk or Tusker Grotesk style). Free stand-in: Anton.
- Body and statement text: a bold grotesk (Inter Tight or Satoshi, weights 600–800).
- Custom letterforms: some letters are swapped for wide or stretched shapes (the `e`, `O` and `S`, a slanted `T`, the `L` and `R`, the script `B` in "Build", the `e` in "Clean"). Build these as inline SVGs sized in `em`.

## 3. Global features

| # | Feature | Behavior | How to build it |
|---|---|---|---|
| G1 | Smooth scroll | Eased scrolling with momentum | Lenis; expose its scroll speed for G5 |
| G2 | "You" cursor | A lime arrow with a "You" pill trails the mouse (Figma multiplayer style) | `quickTo` on x/y. Hide on touch devices and when the user asks for reduced motion |
| G3 | Top nav | Pill-shaped: logo, about us, cases, services, blog, "let's talk". Fades in during the intro; hides on scroll down, returns on scroll up | Scroll-direction ScrollTrigger |
| G4 | Bottom dock | Fixed frosted-glass pill: `Open: Menu` · `get my website` · `View: Cases`. Appears at the end of the intro | `backdrop-filter: blur()` on a translucent background |
| G5 | Wavy section edges | Dark/light sections meet on a curved edge that bends with scroll speed and relaxes to rest | SVG path; the middle control point's y is set from Lenis speed and eased back |
| G6 | Replay on re-entry | Text reveals replay when scrolling back into a section | ScrollTrigger `toggleActions` / `onEnterBack` |
| G7 | Reduced motion | Everything readable and static when `prefers-reduced-motion` is set | `gsap.matchMedia()` |
| G8 | Mobile | Simpler versions of the pinned sequences, no custom cursor | `gsap.matchMedia()` breakpoints |

## 4. Sections (in page order)

### S1: Hero, "WEBSITES PEOPLE TRUST. DESIGNED TO SELL." (dark)
- **Letter intro** (~1.5s): each character rises out of a line mask with a random tilt (about ±8°) and a lower starting opacity, staggered; the three lines follow one after another. Built with `SplitText({type: "lines,chars", mask: "lines"})`.
- **Pen-tool line** (~4s): a lime SVG curve with anchor-point dots draws across the headline (DrawSVG), with a pen-nib icon riding the tip (MotionPath, `autoRotate`).
- **Stickers pop in as the pen passes** (scale 0→1, `back.out`, small rotation): "4.9/5 · 647 reviews" (pink starburst), "Post-launch support" (blue tag), "500+ websites built" (white starburst), "5h response time" (lime pill), "Free website audit" (red badge), "9 years of experience" (violet flag). All on one master timeline.
- The nav (G3) fades in during the drawing; the dock (G4) appears at the end.

### S2: About, "WE CRAFT BRANDS AND DIGITAL PRODUCTS THAT SCALE" (light)
- Enters over a wavy edge (G5).
- The headline lines slide up out of a mask; the text then fades to about 40% as you scroll on.
- A small paragraph: "Clean in form. Sharp in function. Across our client projects: retention up 42%, bounce down 67%, launches shipped 4× faster."
- **Icon row**: five chunky sticker icons (cursor, heart, bar chart, crown, bolt).

### S3: Pinned icon scatter into a sentence (light)
- The section pins (`pin: true`, `scrub`). The text fades, the icons shrink and scatter to set positions, then regroup.
- They then **fly into inline slots** in a centred statement while its lines reveal:
  > We **B**uild brands [crown] people love and websites [heart] that win clients. Cl**e**an in form. [bolt] Sharp in [cursor][chart] function.
- Built with **GSAP Flip** (the icon moves from its scattered spot into an empty inline slot in the text) or by measuring both positions with `getBoundingClientRect` and tweening between them. Fully reversible on scroll up.

### S4: Trust CTA, "Trust comes from design, not explanation."
- A **mascot** (a lime starburst with a face, gloved hands giving a thumbs up, and sneakers) pops in from small with an elastic bounce.
- The text lines reveal one by one; a **lime highlighter bar** sweeps behind "from design," from left to right (`scaleX` 0→1, `transform-origin: left`).
- CTA: a lime pill "design trust" plus a dark round ↗ button.

### S5: Services, "WHAT ARE WE BUILDING FOR YOU?"
- The headline lines reveal one by one (the last line "YOU?" lands last).
- **Service cards** rise from a dark wavy edge below with a **3D tilt** (perspective, `rotateX`/`rotateY`/`rotateZ`) that straightens as you scroll.
- The first card is pink, "Web Development": "Speed you can feel: fast loading, high-end animation, SEO built in. Your website just works, and quietly earns trust." It has a hand illustration.
- The other cards weren't recorded; probably one card per service, stacking or swapping on scroll.

### Not yet specified (needs part 3)
Cases/work, the rest of the services, testimonials, footer and contact, the menu overlay, **page transitions**, case-study pages.

## 5. Assets to produce (design work, not code)
- [ ] Brand concept: Crency's is "the site is a design-tool canvas". Pick our own for a software development agency (for example a code editor, terminal or IDE canvas).
- [ ] Display font license (or Anton) and a body font.
- [ ] 6–10 custom SVG letterforms.
- [ ] 5 sticker icons, 6 hero badges.
- [ ] Mascot illustration (SVG, with separate limbs if they should animate).
- [ ] Service card illustrations.
- [ ] Copy: headline, stats (reviews, projects, years, response time), service descriptions, case studies.

## 6. Build order
1. Project setup: Next.js, GSAP, Lenis, tokens, fonts, global layout (G1, G3, G4, G7).
2. S1 hero intro: letter reveal, pen line and stickers. **This is what makes the site memorable, so build it first.**
3. G2 cursor, G5 wavy edges.
4. S2 + S3 pinned scatter and Flip into the sentence (the hardest part).
5. S4 mascot CTA, S5 services cards.
6. Remaining sections and page transitions once part 3 is recorded.
7. Mobile, reduced-motion and performance pass (target Lighthouse 90+).
