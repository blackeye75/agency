# Agency website: requirements from the Crency reference

Source: three screen recordings of https://crency.agency in `reference/`
(`…02-15-25.mp4` = part 1, `…02-31-29.mp4` = part 2, `…02-42-20.mp4` = part 3),
analysed frame by frame. Colors are sampled from the video. Fonts and libraries
are inferred from how the site looks and moves; the recordings do not show
Crency's source code.

**Not yet recorded:** how the cases gallery moves to the next case, anything
below the cases gallery (testimonials, footer, contact), the menu overlay, page
transitions and the case-study pages.

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
| G5 | Wavy section edges | Dark/light sections meet on a curved edge that changes shape as the edge moves up the screen (hill, then slope, then dip) | Tied to scroll position, not speed. **Full spec in section 5A** |
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
- The icons leave the row, scatter, and fly into empty slots inside a centred sentence while its lines appear:
  > We **B**uild brands [crown] people love and websites [heart] that win clients. Cl**e**an in form. [bolt] Sharp in [cursor][chart] function.
- Fully tied to scroll position and reversible. **Full spec in section 5B.**

### S4: Trust CTA, "Trust comes from design, not explanation."
- A **mascot** (a lime starburst with a face, gloved hands giving a thumbs up, and sneakers) **grows with scroll**: small as the section enters, full size when the section is centred (about 3× larger), with a slight tilt. It shrinks again as you scroll on.
- The text lines reveal one by one ("Trust comes" first); a **lime highlighter bar** sweeps behind "from design," from left to right (`scaleX` 0→1, `transform-origin: left`).
- CTA: a lime pill "design trust" plus a dark round ↗ button.

### S5: Services, "WHAT ARE WE BUILDING FOR YOU?" (part 3, 17.5–21.5s)
- The headline lines reveal one by one (the last line "YOU?" lands last).
- A dark wavy edge (5A) rises underneath; the cards come up out of it.
- **Card flip sequence** (tied to scroll, pinned):

| Step | What happens |
|---|---|
| 1 | The pink **Web Development** card rises alone in the middle, tilted in 3D (leaning back, turned slightly). |
| 2 | It turns on its vertical axis until it's **edge-on** (a thin sliver, `rotateY` ≈ 90°). |
| 3 | While it's edge-on, the **lime (left)** and **violet (right)** cards rise from below. |
| 4 | The middle card turns back to face the front (`rotateY` 90° → 0°) and all three settle level in a row. |

- **Card content** (3 equal cards, ~40px rounded corners, ~30vw wide):

| Card | Color | Title | Text | Button |
|---|---|---|---|---|
| Left | lime | UI/UX Design | "Design that converts. Clear, intentional interfaces that make the next step obvious. Less hesitation. More forward movement." | dark pill "design my product" |
| Middle | pink | Web Development | "Speed you can feel: fast loading, high-end animation, SEO built in. Your website just works, and quietly earns trust." | light pink pill "build my website" |
| Right | violet `#4B00F0` | Custom project? | "When things don't fit templates (web or mobile app, platform or marketplace) we turn complexity into clarity." | lilac pill "discuss my project" |

- Each card has a large **12-petal flower** shape in a darker or lighter shade of its own color (it may spin slowly; not confirmed).
- **How:** a pinned ScrollTrigger timeline; the parent has `perspective: 1200px`, and the middle card animates `rotateX`/`rotateY` with `backface-visibility: hidden`. The side cards animate `yPercent` 100 → 0.

### S6: Cases gallery (part 3, 22–25s; dark)
- **Background:** a large **electric-blue starburst** (a few long spikes) grows up from behind the cards as the section enters.
- **Card fan:** a row of about 11 project cards arranged in a shallow 3D arc (a coverflow). Each card has a lilac frame.
  - The **side cards** show only their spine, with the project name set vertically: ZERO, YPS, 14B, UMBRELLA, TRDELNIK · UTAH LEATHER REPAIR, FLIX AUTO TRANSPORT, MY HAIR PL, PAWSPOT, BON VOYAGE.
  - The **middle card** is open and double-width:
    - Left half: the project cover (logo, "BRANDING · DESIGN · DEVELOPMENT · SEO", and a screenshot of the site).
    - Right half: a counter "01 / 04", the client quote in the display font ("WE WERE HAPPY WITH THE FINAL PRODUCT. WE HIGHLY RECOMMEND CRENCY TO TAKE ON YOUR UNIQUE WEBSITE DESIGN CHALLENGES."), and a lime "VIEW CASE" button.
- **Entry:** the fan rises from the bottom while spreading outward from the centre (the cards start bunched, then fan out); the starburst spikes scale up at the same time.
- **Not seen yet:** how the next case opens (scroll, drag or click; the counter suggests 4 featured cases).
- **How:** cards absolutely positioned with `transform: translateX() translateZ() rotateY()` calculated from each card's distance to the active one; entry via ScrollTrigger (`y`, spread factor 0 → 1). Put real `<a>` links on each card.

### Not yet specified (needs part 4)
How the cases gallery moves to the next case, everything below it (testimonials, footer and contact), the menu overlay, **page transitions**, case-study pages.

## 5. Priority effects: detailed specs

These two are the effects we most want to match. Both must feel as smooth as
Crency's, so section 5C lists the rules that make that happen.

### 5A: Wavy bottom edge of the hero (and every dark/light boundary)

**What the video shows** (part 1, 19.6–22s; part 2, 3.5–6.5s; screenshots from 23-09-2026)
- The boundary between the dark hero (`--ink`) and the lilac About section is one smooth, wide curve, not a zig-zag.
- Its height from lowest to highest point is about **100px on a 1920px screen (≈5vw)**, and it is off-centre.
- The shape **depends on where the edge is on screen**:

| Edge position | Shape |
|---|---|
| Entering at the bottom of the screen | **Hill**: lilac bulges up; the peak is right of centre |
| Middle of the screen | **Slope**: rises from left to right |
| Near the top of the screen | **Dip**: dark bulges down; the lowest point is at about 45% across, flattening towards the right |

- When you stop scrolling it holds its current shape, so it follows scroll **position**, not speed. It looks like a long wave rolling from right to left as you scroll.
- The same edge appears again lower down (About → dark Services area), there as a dark hill rising from below.

**How to build it**
- One reusable `<WaveEdge from="ink" to="lilac" />` component: an absolutely positioned SVG at the bottom of the section, `width: 100%`, `height: ~8vw`, `preserveAspectRatio="none"`, filled with the **next** section's color. Mark it `aria-hidden`.
- The path is a sine wave with a wavelength of about **1.6–2× the viewport width**, so only one hump shows at a time:
  `y(x) = mid + A · sin(2π · x / λ + phase)`, sampled at about 24 points, joined as a smooth curve.
- `phase` comes from a ScrollTrigger on the edge (`start: "top bottom"`, `end: "top top"`) and runs from `phase0` to `phase0 + ~π`, so the edge goes hill → slope → dip across the screen. Calibrate `phase0` against the recordings.
- Write the new path directly to the SVG's `d` attribute in `onUpdate`. It's one attribute per frame and doesn't trigger a layout recalculation.
- Optional extra (not seen in the video): make it bend a little more with Lenis's scroll speed, eased back to zero.

**Done when**
- [ ] It's a smooth curve with no visible corners or seams at any screen width from 360px to 2560px.
- [ ] Pausing mid-scroll freezes the shape; scrolling back reverses it exactly.
- [ ] It's used at the hero → About boundary and the About → dark services boundary.
- [ ] With `prefers-reduced-motion`, it shows a fixed curve.

### 5B: Icons scattering, then flying into the sentence

**What the video shows** (part 1, 23–31s; part 2, 8.8–11.8s; screenshots from 23-09-2026)
The five icons are separate elements that stay on screen while the page content changes around them.

| Phase | Scroll | What happens |
|---|---|---|
| 0: Row | – | The About section ends with a row of 5 large icons (~215px at 1920px, touching or slightly overlapping): pink rounded square (cursor), lime rounded square (heart), blue circle (bar chart), orange arrow-tag (crown), red circle (lightning bolt). Flat fill, dark `--ink` outline about 3px, dark symbol. |
| 1: Fade | 0–15% | The About heading and paragraph fade (about 40% opacity, then out) and scroll away. The icons stay put. |
| 2: Shrink and scatter | 10–40% | The icons shrink one after another **from left to right** (cursor and heart first) and briefly form a rising diagonal (small on the left, big on the right). Each then flies to a **loose scattered spot** around the centre at about 45% size with a slight tilt. |
| 3: Hold | 40–45% | A short pause with the icons scattered on an empty lilac screen. |
| 4: Into the sentence | 45–100% | The centred sentence appears **one line at a time** (rising slightly and fading in). As each line appears, its icon flies from the scatter into **its gap in the text**, shrinking to the text size (~1em) and straightening: crown → line 1, heart → line 2, bolt → end of line 3, cursor and chart → line 4. |

The whole sequence stays pinned and is **tied to scroll position**. Scrolling up plays it backwards exactly.

**How to build it**
```
<section class="icon-story">           ← pinned for about 250vh of scrolling
  <div class="about-copy">…</div>      ← heading and paragraph (phase 1)
  <p class="statement">                ← centred sentence, split into lines
    We <B-glyph/>uild brands <span class="slot" data-icon="crown"></span> people love …
  </p>
  <div class="icon-layer">             ← absolutely positioned on top of everything
    <Icon id="cursor"/> <Icon id="heart"/> <Icon id="chart"/> <Icon id="crown"/> <Icon id="bolt"/>
  </div>
</section>
```
- **Slots:** empty inline boxes in the sentence, sized to 1em × 1em, so the text is laid out around the gap before any icon arrives.
- **One scroll-linked timeline:** `ScrollTrigger({ trigger, pin: true, scrub: 1, end: "+=250%", invalidateOnRefresh: true })`.
- **Row → scatter:** tween each icon's `x`, `y`, `scale` and `rotation` to hand-picked scatter points (percentages of the viewport), staggered from the left.
- **Scatter → slot:** use Flip to calculate the move from the icon's current spot into its slot (`Flip.fit(icon, slot, { scale: true, getVars: true })`). Use **function-based values**, so positions are recalculated on every resize or refresh.
- **Text lines:** `SplitText(statement, { type: "lines", mask: "lines" })`. Place each line's reveal on the timeline at the same time as its icon's flight.

### 5C: What makes it smooth (applies to 5A and 5B)
1. **Move elements only with `transform` and `opacity`** (x, y, scale, rotation). Never animate `top`, `left`, `width`, `height`, `margin`, `box-shadow` or `filter`. Add `will-change: transform` only to the 5 icons and the pinned wrapper.
2. **Lenis plus a scrub delay.** Run Lenis through GSAP's ticker (`lenis.on('scroll', ScrollTrigger.update)`; `gsap.ticker.add(t => lenis.raf(t * 1000))`; `gsap.ticker.lagSmoothing(0)`). Set `scrub: 1` so the animation trails the scroll by about 1s. That trailing is the "buttery" feel.
3. **Icons as inline SVG**, not PNG, so they stay sharp at any scale with no blur during the tween.
4. **Measure once per refresh, not every frame.** Read slot positions only inside function-based values or `onRefresh`; wait for fonts to load (`document.fonts.ready`) before calling `ScrollTrigger.refresh()`.
5. **Default easing.** Use `power2.inOut` for the flights and `power3.out` for the text lines; avoid linear.
6. **Performance budget:** 60fps on a mid-range laptop, with no long tasks over 50ms while scrubbing (check in the Chrome Performance panel).
7. **Mobile (<768px):** no pinning. The icons pop into the sentence as it scrolls into view (a simple timed animation, not scroll-linked), and the icons in the text scale to about 0.9em.
8. **Reduced motion:** show the finished sentence with its icons in place and no animation.

**Done when**
- [ ] Scrubbing forwards and backwards at any speed shows no jumps, flicker or icons out of place.
- [ ] Resizing the window mid-sequence puts the icons back into their correct slots.
- [ ] Each icon lands exactly inside its slot (within 1px) at the end of the sequence.
- [ ] It runs at 60fps in the Chrome Performance panel on a mid-range laptop.

## 6. Assets to produce (design work, not code)
- [ ] Brand concept: Crency's is "the site is a design-tool canvas". Pick our own for a software development agency (for example a code editor, terminal or IDE canvas).
- [ ] Display font license (or Anton) and a body font.
- [ ] 6–10 custom SVG letterforms.
- [ ] 5 sticker icons, 6 hero badges.
- [ ] Mascot illustration (SVG, with separate limbs if they should animate).
- [ ] Service card flower shapes (one SVG, recolored per card).
- [ ] Cases: a cover image, a screenshot, a client quote and a short name for each project (at least 4 featured projects; about 10 names for the spines).
- [ ] Blue starburst background shape (SVG).
- [ ] Copy: headline, stats (reviews, projects, years, response time), service descriptions, case studies.

## 7. Build order
1. Project setup: Next.js, GSAP, Lenis, tokens, fonts, global layout (G1, G3, G4, G7).
2. **Priority prototypes: 5A wavy edge and 5B icon sequence** (the effects we most want to match; they also prove out the Lenis and ScrollTrigger setup for everything else).
3. S1 hero intro: letter reveal, pen line and stickers.
4. G2 cursor, S2 About.
5. S4 mascot CTA, S5 services card flip.
6. S6 cases gallery.
7. Remaining sections and page transitions once part 4 is recorded.
8. Mobile, reduced-motion and performance pass (target Lighthouse 90+).
