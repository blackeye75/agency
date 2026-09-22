/* Homepage preview: plain JS + GSAP + Lenis.
   Section numbers (S1…, 5A…) match docs/requirements.md. */
(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin, Flip);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const MOBILE = innerWidth < 768;

  history.scrollRestoration = 'manual';

  // Reload when crossing the mobile breakpoint, so pinned sections are rebuilt for the new layout.
  addEventListener('resize', () => { if ((innerWidth < 768) !== MOBILE) location.reload(); });

  /* ---------- helpers ---------- */
  function starPath(n, ro, ri) {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? ri : ro, a = (Math.PI * i) / n - Math.PI / 2;
      d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(2) + ' ' + (r * Math.sin(a)).toFixed(2);
    }
    return d + 'Z';
  }
  // Fit sticker ring text exactly once around its circle
  $$('.sticker text').forEach(t => { t.setAttribute('textLength', (2 * Math.PI * 74 - 6).toFixed(1)); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); });
  $$('[data-star]').forEach(el => {
    const [n, ro, ri] = el.dataset.star.split(',').map(Number);
    el.setAttribute('d', starPath(n, ro, ri));
  });

  // Smooth curve through points (Catmull-Rom → cubic Bézier)
  function catmull(P) {
    let d = `M${P[0][0]},${P[0][1]}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1} ${c2} ${p2}`;
    }
    return d;
  }

  /* ---------- G1 smooth scroll ---------- */
  const lenis = new Lenis({ lerp: REDUCE ? 1 : 0.09, smoothWheel: !REDUCE });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ---------- 5D context cursor ---------- */
  function cursor() {
    if (!FINE || REDUCE) return;
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor');
    cur.dataset.state = 'you';
    gsap.set(cur, { opacity: 0 });
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.16, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.16, ease: 'power3' });
    let shown = false;
    addEventListener('pointermove', e => {
      if (!shown) { gsap.set(cur, { x: e.clientX, y: e.clientY }); gsap.to(cur, { opacity: 1, duration: 0.2 }); shown = true; }
      xTo(e.clientX); yTo(e.clientY);
    });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor]');
      // the drag stage contains nothing clickable except the "view case" link
      cur.dataset.state = t ? t.dataset.cursor : 'you';
    });
    document.documentElement.addEventListener('pointerleave', () => { gsap.to(cur, { opacity: 0, duration: 0.2 }); shown = false; });
  }

  /* ---------- 5E CTA hover: arrow swaps sides ---------- */
  function ctas() {
    $$('.cta').forEach(cta => {
      const pill = $('.cta__pill', cta), arrow = $('.cta__arrow', cta), icon = $('svg', arrow);
      const ease = 'back.out(1.7)';
      cta.addEventListener('mouseenter', () => {
        gsap.to(arrow, { x: -(pill.offsetWidth + 4), duration: 0.45, ease });
        gsap.to(pill, { x: arrow.offsetWidth + 4, duration: 0.45, ease });
        gsap.to(icon, { rotation: 45, duration: 0.45, ease });
      });
      cta.addEventListener('mouseleave', () => {
        gsap.to([arrow, pill], { x: 0, duration: 0.45, ease });
        gsap.to(icon, { rotation: 0, duration: 0.45, ease });
      });
    });
  }

  /* ---------- G6 line reveals ---------- */
  function lineReveals() {
    $$('[data-lines]').forEach(el => {
      if (el.closest('[data-story]')) {
        // About heading: reveal on enter; its fade-out is part of the story timeline.
      }
      SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit(self) {
          if (REDUCE) return;
          return gsap.from(self.lines, {
            yPercent: 115, duration: 1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
          });
        }
      });
    });
  }

  /* ---------- 5A wavy edges ---------- */
  function waves() {
    const P0 = -3.6, AMP = 34, LAMBDA = 1800;
    $$('[data-wave]').forEach(svg => {
      const path = $('path', svg);
      const draw = phase => {
        let d = 'M0 100';
        for (let i = 0; i <= 40; i++) {
          const x = i * 25;
          d += ` L${x} ${(52 + AMP * Math.sin((2 * Math.PI * x) / LAMBDA + phase)).toFixed(2)}`;
        }
        path.setAttribute('d', d + ' L1000 100 Z');
      };
      draw(P0);
      if (REDUCE) return;
      ScrollTrigger.create({
        trigger: svg, start: 'top bottom', end: 'top top',
        onUpdate: s => draw(P0 + Math.PI * s.progress)
      });
    });
  }

  /* ---------- S1 hero ---------- */
  function hero() {
    const heroEl = $('[data-hero]'), svg = $('[data-pen]'), path = $('[data-pen-path]');
    const dotsG = $('[data-pen-dots]'), nib = $('[data-pen-nib]'), nav = $('[data-nav]'), dock = $('[data-dock]');
    const badges = $$('[data-badge]');
    const PTS = [[-0.03, 0.34], [0.1, 0.2], [0.3, 0.12], [0.5, 0.14], [0.64, 0.3], [0.58, 0.52], [0.42, 0.56], [0.34, 0.44], [0.44, 0.33], [0.62, 0.36], [0.76, 0.46], [0.84, 0.64], [0.76, 0.86], [0.6, 0.9], [0.52, 0.78], [0.64, 0.66], [0.84, 0.72], [1.03, 0.9]];
    let P = [];

    function build() {
      const W = heroEl.clientWidth, H = innerHeight;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      P = PTS.map(([x, y]) => [x * W, y * H]);
      path.setAttribute('d', catmull(P));
      dotsG.innerHTML = P.slice(1, -1).map(([x, y], i) =>
        (i === 7 ? `<line class="pen-handle" x1="${x - 60}" y1="${y + 34}" x2="${x + 60}" y2="${y - 34}"/><circle class="pen-dot" cx="${x - 60}" cy="${y + 34}" r="4"/><circle class="pen-dot" cx="${x + 60}" cy="${y - 34}" r="4"/>` : '') +
        `<circle class="pen-dot" cx="${x}" cy="${y}" r="5.5"/>`).join('');
      badges.forEach(b => { b.style.left = b.dataset.x * 100 + '%'; b.style.top = b.dataset.y * 100 + '%'; });
    }

    // Fraction along the path closest to a point
    function nearest(x, y) {
      const L = path.getTotalLength(); let best = 0, bd = Infinity;
      for (let i = 0; i <= 300; i++) {
        const p = path.getPointAtLength((L * i) / 300), d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bd) { bd = d; best = i / 300; }
      }
      return best;
    }

    build();
    gsap.set(badges, { xPercent: -50, yPercent: -50, scale: 0 });
    const split = SplitText.create('.hero__title', { type: 'lines,chars', mask: 'lines' });

    if (REDUCE) {
      gsap.set([nav, dock], { opacity: 1 });
      gsap.set(badges, { scale: 1 });
      gsap.set(nib, { opacity: 0 });
      return;
    }

    const W = heroEl.clientWidth, H = innerHeight;
    const PEN_AT = 1.1, PEN_DUR = 4;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(split.chars, {
      yPercent: 120, rotation: () => gsap.utils.random(-14, 14), opacity: 0.2,
      duration: 0.9, ease: 'power3.out', stagger: 0.028
    }, 0)
      .fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: PEN_DUR, ease: 'none' }, PEN_AT)
      .fromTo(nib, { opacity: 0 }, { opacity: 1, duration: 0.2 }, PEN_AT)
      .to(nib, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: 90 }, duration: PEN_DUR, ease: 'none' }, PEN_AT)
      .fromTo(nav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, PEN_AT + 1)
      .fromTo(dock, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)' }, PEN_AT + PEN_DUR);

    $$('.pen-dot, .pen-handle', dotsG).forEach(dot => {
      const x = +(dot.getAttribute('cx') ?? dot.getAttribute('x1')), y = +(dot.getAttribute('cy') ?? dot.getAttribute('y1'));
      tl.from(dot, { scale: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, PEN_AT + nearest(x, y) * PEN_DUR);
    });
    badges.forEach(b => {
      const t = PEN_AT + nearest(b.dataset.x * W, b.dataset.y * H) * PEN_DUR;
      tl.fromTo(b, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.2)' }, t);
    });

    // replay the letters when scrolling back up into the hero
    ScrollTrigger.create({
      trigger: heroEl, start: 'top top', end: 'bottom top',
      onEnterBack: () => gsap.fromTo(split.chars, { yPercent: 120, rotation: () => gsap.utils.random(-14, 14) },
        { yPercent: 0, rotation: 0, duration: 0.7, ease: 'power3.out', stagger: 0.012, overwrite: true })
    });

    let rT;
    addEventListener('resize', () => {
      clearTimeout(rT);
      rT = setTimeout(() => {
        build();
        gsap.set(path, { drawSVG: '100%' });
        gsap.set(nib, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: 90, end: 1 } });
      }, 200);
    });
  }

  /* ---------- G3 nav hides on scroll down ---------- */
  function navAutoHide() {
    const nav = $('[data-nav]');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: s => gsap.to(nav, { yPercent: s.direction === 1 && s.scroll() > 200 ? -160 : 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    });
  }

  /* ---------- S2/S3 icon story (5B) ---------- */
  function story() {
    if (REDUCE || MOBILE) return; // CSS shows the finished sentence instead
    const sec = $('[data-story]'), copy = $('[data-story-copy]');
    const rowSlots = $$('[data-row-slot]');
    const lines = $$('.sl__in', sec);
    const ORDER = ['cursor', 'heart', 'chart', 'crown', 'bolt'];
    const flyer = id => $(`.flyer[data-icon="${id}"]`, sec);
    const BASE = 200;
    const SCATTER = { cursor: [0.28, 0.3, -14], heart: [0.6, 0.22, 10], chart: [0.44, 0.58, -6], crown: [0.7, 0.6, 16], bolt: [0.22, 0.62, -10] };
    // which line each icon lands in
    const LINE_OF = { crown: 0, heart: 1, bolt: 2, cursor: 3, chart: 3 };

    const rel = el => {
      const r = el.getBoundingClientRect(), s = sec.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    };
    const row = i => rel(rowSlots[i]);
    // slot position once its line has finished revealing (undo the line's current offset)
    const slot = id => {
      const el = $(`[data-slot="${id}"]`, sec), line = lines[LINE_OF[id]];
      const r = rel(el);
      const off = (gsap.getProperty(line, 'yPercent') / 100) * line.offsetHeight + gsap.getProperty(line, 'y');
      return { x: r.x, y: r.y - off, w: r.w };
    };

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=260%', pin: true, scrub: 1, invalidateOnRefresh: true }
    });

    // Phase 0 → 1: about copy fades out, icons stay
    tl.to(copy, { y: -140, opacity: 0, duration: 1.4, ease: 'power2.in' }, 0);
    // Phase 2: icons shrink one after another (left first), then scatter
    ORDER.forEach((id, i) => {
      const f = flyer(id);
      tl.fromTo(f,
        { x: () => row(i).x, y: () => row(i).y, scale: () => row(i).w / BASE, rotation: 0 },
        {
          x: () => SCATTER[id][0] * sec.clientWidth, y: () => SCATTER[id][1] * sec.clientHeight,
          scale: () => (row(i).w * 0.45) / BASE, rotation: SCATTER[id][2], duration: 2.2
        }, 0.9 + i * 0.28);
    });
    // Phase 3: hold. Phase 4: lines reveal, icons fly into their slots
    const T0 = 4.6;
    lines.forEach((line, li) => {
      const t = T0 + li * 1.25;
      tl.fromTo(line, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'power3.out' }, t);
      ORDER.filter(id => LINE_OF[id] === li).forEach((id, k) => {
        tl.to(flyer(id), {
          x: () => slot(id).x, y: () => slot(id).y, scale: () => slot(id).w / BASE, rotation: 0, duration: 1.3
        }, t - 0.25 + k * 0.15);
      });
    });
    tl.to({}, { duration: 0.8 }); // small rest at the end
  }

  /* ---------- S4 trust ---------- */
  function trust() {
    if (REDUCE) { gsap.set('[data-hilite]', { scaleX: 1 }); return; }
    const sec = $('[data-trust]'), mascot = $('[data-mascot]');
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      .fromTo(mascot, { scale: 0.32, rotation: -14 }, { scale: 1, rotation: 4, ease: 'power1.out', duration: 1 })
      .to(mascot, { scale: 0.6, rotation: 12, ease: 'power1.in', duration: 0.8 });
    gsap.to('[data-hilite]', {
      scaleX: 1, duration: 0.8, ease: 'power3.inOut', delay: 0.4,
      scrollTrigger: { trigger: '.trust__title', start: 'top 70%', toggleActions: 'play none none reverse' }
    });
  }

  /* ---------- S5 services card flip ---------- */
  function services() {
    if (REDUCE || MOBILE) return;
    const sec = $('[data-services]');
    const [left, mid, right] = ['left', 'mid', 'right'].map(k => $(`[data-card="${k}"]`, sec));
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=170%', pin: true, scrub: 1 } })
      .fromTo(mid, { yPercent: 95, rotationX: 42, rotationY: -26, rotationZ: -7 }, { yPercent: 0, rotationX: 12, rotationY: -12, rotationZ: -2, duration: 1.4, ease: 'power2.out' })
      .to(mid, { rotationY: 90, rotationX: 0, rotationZ: 0, duration: 0.9, ease: 'power2.in' })
      .fromTo([left, right], { yPercent: 130, rotationX: 35 }, { yPercent: 0, rotationX: 0, duration: 1.3, ease: 'power3.out', stagger: 0.12 }, '<0.35')
      .fromTo(mid, { rotationY: -90 }, { rotationY: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, '>-0.7')
      .to({}, { duration: 0.5 });
  }

  /* ---------- S6 cases coverflow ---------- */
  // PLACEHOLDER content: replace with real projects and real client quotes.
  const CASES = [
    { name: 'ZENITH', v: 'lime', client: 'Zenith Fitness', rating: '4.9', service: 'MOBILE APP', quote: 'They shipped our app in eight weeks and it has not gone down once.' },
    { name: 'KITE', v: 'violet', client: 'Kite Travel', rating: '5.0', service: 'WEB PLATFORM', quote: 'Clear process, honest estimates and a product our users love.' },
    { name: 'ORBITPAY', v: 'violet', client: 'OrbitPay', rating: '4.9', service: 'FINTECH API', quote: 'Security-first engineering. Our audit passed on the first try.' },
    { name: 'UMBRA', v: 'lime', client: 'Umbra Studio', rating: '5.0', service: 'SAAS DASHBOARD', quote: 'Our dashboard finally feels as fast as we always wanted it to be.' },
    { name: 'LUMEN LABS', v: 'violet', client: 'Lumen Labs', rating: '4.9', service: 'WEB APP DEVELOPMENT', quote: 'We were happy with the final product and highly recommend the team for complex builds.' },
    { name: 'NORTHWIND', v: 'violet', client: 'Northwind', rating: '5.0', service: 'INTERNAL TOOLS', quote: 'Everything went great. They helped us structure the request before writing any code.' },
    { name: 'PULSE HEALTH', v: 'lime', client: 'Pulse Health', rating: '4.8', service: 'HEALTHCARE PORTAL', quote: 'Accessible, compliant and genuinely pleasant to use.' },
    { name: 'FERRY', v: 'violet', client: 'Ferry Logistics', rating: '4.9', service: 'MARKETPLACE', quote: 'Bookings doubled in the first quarter after launch.' },
    { name: 'BLOOM', v: 'lime', client: 'Bloom Market', rating: '5.0', service: 'E-COMMERCE', quote: 'Page speed went from painful to instant.' },
    { name: 'VOLT', v: 'violet', client: 'Volt Energy', rating: '4.9', service: 'IOT PLATFORM', quote: 'Thousands of devices, one calm dashboard.' },
    { name: 'HARBOR', v: 'violet', client: 'Harbor CRM', rating: '4.9', service: 'CRM MIGRATION', quote: 'Zero downtime migration. We did not believe it was possible.' }
  ];

  function cases() {
    const sec = $('[data-cases]'), stage = $('[data-stage]'), burst = $('[data-burst]');
    const icons = ['ic-cursor', 'ic-heart', 'ic-chart', 'ic-crown', 'ic-bolt'];
    const pad = n => String(n).padStart(2, '0');
    stage.innerHTML = CASES.map((c, i) => `
      <div class="case" data-i="${i}">
        <div class="case__cover" style="background:${c.v === 'lime' ? 'var(--lime)' : 'var(--violet)'};--c1:${c.v === 'lime' ? 'var(--violet)' : 'var(--blue-deep)'};${c.v === 'lime' ? 'color:var(--ink)' : ''}">
          <div class="case__logo"><span class="dot dot--pink">n</span><span class="dot dot--lime">o</span><span class="dot dot--violet">v</span></div>
          <div class="case__tags">PRODUCT <em>•</em> DESIGN<br>ENGINEERING <em>•</em> CLOUD</div>
          <div class="case__screen">${c.name}</div>
          <div class="case__icons">${icons.map(id => `<svg><use href="#${id}"/></svg>`).join('')}</div>
          <div class="case__spine">${c.name}</div>
        </div>
        <div class="case__detail"><div class="case__detail-in">
          <span class="case__count">${pad(i + 1)} / ${pad(CASES.length)}</span>
          <p class="case__quote">“${c.quote}”</p>
          <a href="#cases" class="case__view" data-cursor="click">VIEW CASE</a>
          <div class="case__client"><span class="case__rating">${c.rating}</span>${c.client.toUpperCase()}</div>
          <span class="case__service">${c.service}</span>
        </div></div>
      </div>`).join('');
    const cards = $$('.case', stage);
    let active = 3 + Math.floor(Math.random() * 4); // random featured case on each visit
    let spread = REDUCE ? 1 : 0.2, busy = false;

    const cw = () => MOBILE ? innerWidth * 0.42 : Math.min(Math.max(innerWidth * 0.24, 220), 380);
    function sizes() {
      const w = cw();
      stage.style.setProperty('--cw', w + 'px');
      stage.style.setProperty('--ch', w * 1.32 + 'px');
    }

    function layout(dur = 0.8) {
      const w = cw();
      cards.forEach((card, i) => {
        const off = i - active, a = Math.abs(off), s = Math.sign(off);
        const isActive = off === 0;
        const x = isActive ? -w / 2 : s * (w * 0.95 + (a - 1) * w * (MOBILE ? 0.12 : 0.2));
        card.classList.toggle('is-closed', !isActive);
        $('.case__spine', card).style.cssText = s < 0 ? 'right:auto;left:16px;transform:rotate(180deg)' : '';
        gsap.to(card, {
          x: x * spread, z: -a * 70, rotationY: isActive ? 0 : -s * 34, scale: 1 - a * 0.025,
          zIndex: 100 - a, duration: dur, ease: 'power3.out', overwrite: 'auto'
        });
        gsap.to($('.case__detail', card), { width: isActive ? w : 0, duration: dur, ease: 'power3.out', overwrite: 'auto' });
      });
    }
    function go(i) {
      active = gsap.utils.clamp(0, cards.length - 1, i);
      busy = true; layout(0.8); gsap.delayedCall(0.8, () => (busy = false));
    }

    sizes(); layout(0);

    // drag / swipe
    let startX = null;
    stage.addEventListener('pointerdown', e => { if (e.target.closest('a')) return; startX = e.clientX; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener('pointermove', e => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 70) { go(active - Math.sign(dx)); startX = e.clientX; }
    });
    ['pointerup', 'pointercancel'].forEach(t => stage.addEventListener(t, () => (startX = null)));
    stage.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') go(active + 1);
      if (e.key === 'ArrowLeft') go(active - 1);
    });
    $('[data-case-prev]').addEventListener('click', () => go(active - 1));
    $('[data-case-next]').addEventListener('click', () => go(active + 1));
    // click a closed card to open it
    stage.addEventListener('click', e => { const c = e.target.closest('.case.is-closed'); if (c) go(+c.dataset.i); });

    addEventListener('resize', () => { sizes(); layout(0); });

    if (REDUCE) return;
    // entry: stack rises and fans out; the burst turns with scroll
    const proxy = { s: 0.2 };
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 15%', scrub: 1 } })
      .fromTo(stage, { yPercent: 35 }, { yPercent: 0, ease: 'none' }, 0)
      .fromTo(proxy, { s: 0.2 }, { s: 1, ease: 'power1.out', onUpdate: () => { spread = proxy.s; if (!busy) layout(0); } }, 0);
    gsap.fromTo(burst, { rotation: -25, scale: 0.35 }, {
      rotation: 30, scale: 1.05, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  }

  /* ---------- S7 signposts ---------- */
  function signs() {
    if (REDUCE) return;
    const st = { trigger: '.signs', start: 'top bottom', end: 'bottom top', scrub: 1 };
    gsap.fromTo('[data-sign="right"]', { xPercent: 70 }, { xPercent: -8, ease: 'none', scrollTrigger: st });
    gsap.fromTo('[data-sign="left"]', { xPercent: -70 }, { xPercent: 8, ease: 'none', scrollTrigger: { ...st } });
  }

  /* ---------- S8 audit chips ---------- */
  function audit() {
    const chips = $$('[data-chip]');
    const finish = () => chips.forEach(c => { $('b', c).textContent = c.dataset.chip + '%'; gsap.set(c, { scale: 1 }); gsap.set($('s', c), { scaleX: c.dataset.chip / 100 }); });
    if (REDUCE) return finish();
    const tl = gsap.timeline({ paused: true });
    chips.forEach((c, i) => {
      const target = +c.dataset.chip, val = { v: 0 }, b = $('b', c);
      tl.fromTo(c, { scale: 0, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, i * 0.18)
        .to(val, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => (b.textContent = Math.round(val.v) + '%') }, i * 0.18 + 0.1)
        .fromTo($('s', c), { scaleX: 0 }, { scaleX: target / 100, duration: 1.6, ease: 'power2.out' }, i * 0.18 + 0.1);
    });
    ScrollTrigger.create({ trigger: '[data-audit]', start: 'top 55%', once: true, onEnter: () => tl.play() });
  }

  /* ---------- S9 mood picker ---------- */
  function mood() {
    const cta = $('[data-mood-cta]'), label = $('.cta__pill', cta);
    $$('.sticker input').forEach(input => input.addEventListener('change', () => {
      label.textContent = input.dataset.cta;
      cta.setAttribute('href', input.dataset.href);
      if (!REDUCE) gsap.fromTo(input.parentElement.querySelector('svg'), { rotation: -12, scale: 0.9 }, { rotation: 0, scale: 1.06, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    }));
    if (!REDUCE) gsap.from('.sticker', {
      y: 80, opacity: 0, rotation: () => gsap.utils.random(-20, 20), duration: 0.8, ease: 'back.out(1.6)', stagger: 0.12,
      scrollTrigger: { trigger: '.mood__options', start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  }

  /* ---------- S10 marquee (speeds up with scroll velocity) ---------- */
  function marquee() {
    if (REDUCE) return;
    const loop = gsap.to('[data-marquee]', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    lenis.on('scroll', ({ velocity }) => {
      loop.timeScale(1 + Math.min(Math.abs(velocity) / 8, 4));
      gsap.to(loop, { timeScale: 1, duration: 0.8, ease: 'power2.out', overwrite: true });
    });
    $$('.band__track').forEach((t, i) => gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 9, ease: 'none', repeat: -1 }));
  }

  /* ---------- 5F menu overlay ---------- */
  const menu = $('[data-menu]');
  const pageParts = () => [$('main'), $('.footer'), $('[data-nav]'), $('[data-dock]')];
  let lastFocus = null;
  function openMenu() {
    lastFocus = document.activeElement;
    menu.hidden = false;
    lenis.stop();
    pageParts().forEach(el => el.classList.add('page-blur'));
    const [pink, lime, blue] = $$('[data-circle]', menu);
    const items = $$('.menu__links > *, .round', menu);
    if (REDUCE) { gsap.set([pink, lime, blue, ...items], { clearProps: 'all' }); $('.menu__links a', menu).focus(); return; }
    gsap.timeline()
      .fromTo([blue, lime, pink], { xPercent: 190 }, { xPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 })
      .fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, '-=0.45')
      .add(() => $('.menu__links a', menu).focus());
  }
  function closeMenu(after) {
    const [pink, lime, blue] = $$('[data-circle]', menu);
    const items = $$('.menu__links > *, .round', menu);
    const done = () => {
      menu.hidden = true;
      pageParts().forEach(el => el.classList.remove('page-blur'));
      lenis.start();
      if (after) after(); else lastFocus?.focus?.();
    };
    if (REDUCE) return done();
    gsap.timeline({ onComplete: done })
      .to(items, { opacity: 0, y: -20, duration: 0.25, stagger: 0.03 })
      .to([pink, lime, blue], { xPercent: -230, duration: 0.8, ease: 'power3.in', stagger: 0.08 }, '-=0.1');
  }
  function menuEvents() {
    $$('[data-menu-open]').forEach(b => b.addEventListener('click', openMenu));
    $('[data-menu-close]').addEventListener('click', () => closeMenu());
    document.addEventListener('keydown', e => {
      if (menu.hidden) return;
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') { // keep focus inside the menu
        const f = $$('a, button', menu), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- 5G page transition (demoed on in-page links) ---------- */
  function pageTransition(hash) {
    const target = hash === '#top' ? 0 : $(hash);
    if (REDUCE) return lenis.scrollTo(target, { immediate: true, force: true });
    const layer = $('[data-transition-layer]');
    const dim = $('.transition__dim', layer), bands = $('.transition__bands', layer), wipe = $('.transition__wipe', layer);
    gsap.timeline()
      .set(layer, { visibility: 'visible' })
      .fromTo(dim, { opacity: 0 }, { opacity: 0.8, duration: 0.35, ease: 'power2.out' })
      .fromTo(bands, { opacity: 0 }, { opacity: 1, duration: 0.01 })
      .fromTo($$('.band', bands), { yPercent: 160 }, { yPercent: 0, duration: 0.6, ease: 'power4.out', stagger: 0.08 }, '<')
      .add(() => { lenis.scrollTo(target, { immediate: true, force: true }); ScrollTrigger.update(); }, '+=0.5')
      .fromTo(wipe, { xPercent: -101 }, { xPercent: 0, duration: 0.45, ease: 'power3.inOut' })
      .set([bands, dim], { opacity: 0 })
      .to(wipe, { xPercent: 101, duration: 0.55, ease: 'power3.inOut' })
      .set(layer, { visibility: 'hidden' });
  }
  function transitionLinks() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-transition]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      if (!menu.hidden) closeMenu(() => pageTransition(href));
      else pageTransition(href);
    });
  }

  /* ---------- init ---------- */
  function init() {
    window.scrollTo(0, 0);
    cursor(); ctas(); waves(); hero(); navAutoHide();
    lineReveals(); story(); trust(); services(); cases(); signs(); audit(); mood(); marquee();
    menuEvents(); transitionLinks();
    ScrollTrigger.refresh();
  }
  const fontsReady = document.fonts ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]) : Promise.resolve();
  fontsReady.then(init);
})();
