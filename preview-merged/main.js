/* Merged homepage preview: Crency + Copula, plain JS + GSAP + Lenis.
   Section numbers match the comments in index.html. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const MOBILE = innerWidth < 768;
  history.scrollRestoration = 'manual';
  addEventListener('resize', () => { if ((innerWidth < 768) !== MOBILE) location.reload(); });

  /* ================= shapes (no GSAP needed) ================= */
  function starPath(n, ro, ri) {
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? ri : ro, a = (Math.PI * i) / n - Math.PI / 2;
      d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(2) + ' ' + (r * Math.sin(a)).toFixed(2);
    }
    return d + 'Z';
  }
  function scallop(n, R, depth, steps = 360) {
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2, r = R - depth + depth * Math.abs(Math.cos((n * t) / 2));
      d += (i ? 'L' : 'M') + (r * Math.cos(t - Math.PI / 2)).toFixed(2) + ' ' + (r * Math.sin(t - Math.PI / 2)).toFixed(2);
    }
    return d + 'Z';
  }
  function catmull(P) {
    let d = `M${P[0][0]},${P[0][1]}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += ` C${[p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]} ${[p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]} ${p2}`;
    }
    return d;
  }
  $$('[data-star]').forEach(el => { const [n, ro, ri] = el.dataset.star.split(',').map(Number); el.setAttribute('d', starPath(n, ro, ri)); });
  $$('svg[data-scallop]').forEach(svg => { svg.setAttribute('viewBox', '-100 -100 200 200'); $('path', svg).setAttribute('d', scallop(+svg.dataset.scallop, 98, 16)); });
  $$('[data-scallop-abs]').forEach(p => { const [n, R, dp] = p.dataset.scallopAbs.split(',').map(Number); p.setAttribute('d', scallop(n, R, dp)); });
  $$('.sticker text').forEach(t => { t.setAttribute('textLength', (2 * Math.PI * 74 - 6).toFixed(1)); t.setAttribute('lengthAdjust', 'spacingAndGlyphs'); });
  (() => { // scalloped oval mask (objectBoundingBox)
    let d = '';
    for (let i = 0; i <= 720; i++) {
      const t = (i / 720) * Math.PI * 2, w = Math.abs(Math.sin(t)) ** 3, k = 1 - 0.075 * w * (1 - Math.abs(Math.cos(10 * t)));
      d += (i ? 'L' : 'M') + (0.5 + 0.5 * k * Math.cos(t)).toFixed(4) + ' ' + (0.5 + 0.5 * k * Math.sin(t)).toFixed(4);
    }
    $('[data-scallop-oval]').setAttribute('d', d + 'Z');
  })();
  (() => { // coil for the "O" in CONNECTION
    const T = Math.PI * 2 * 11, s = 352 / T;
    let d = 'M0 96 L14 96';
    for (let i = 0; i <= 900; i++) { const t = (i / 900) * T; d += ` L${(24 + s * t - 17 * Math.sin(t)).toFixed(2)} ${(58 + 38 * Math.cos(t)).toFixed(2)}`; }
    $('[data-coil] path').setAttribute('d', d + ' L400 96');
  })();

  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
    console.error('Animation libraries failed to load: check that preview-merged/vendor/ is present.');
    document.documentElement.classList.add('no-motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);

  /* ================= smooth scroll ================= */
  const lenis = new Lenis({ lerp: REDUCE ? 1 : 0.09, smoothWheel: !REDUCE });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ================= cursor (Crency) ================= */
  function cursor() {
    if (!FINE || REDUCE) return;
    document.documentElement.classList.add('has-cursor');
    const cur = $('.cursor');
    cur.dataset.state = 'you';
    gsap.set(cur, { opacity: 0 });
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.16, ease: 'power3' }), yTo = gsap.quickTo(cur, 'y', { duration: 0.16, ease: 'power3' });
    let shown = false;
    addEventListener('pointermove', e => {
      if (!shown) { gsap.set(cur, { x: e.clientX, y: e.clientY }); gsap.to(cur, { opacity: 1, duration: 0.2 }); shown = true; }
      xTo(e.clientX); yTo(e.clientY);
    });
    document.addEventListener('pointerover', e => { const t = e.target.closest('[data-cursor]'); cur.dataset.state = t ? t.dataset.cursor : 'you'; });
    document.documentElement.addEventListener('pointerleave', () => { gsap.to(cur, { opacity: 0, duration: 0.2 }); shown = false; });
  }

  /* ================= CTA hover: arrow swaps sides (Crency) ================= */
  function ctas() {
    $$('.cta').forEach(cta => {
      const pill = $('.cta__pill', cta), arrow = $('.cta__arrow', cta), icon = $('svg', arrow), ease = 'back.out(1.7)';
      cta.addEventListener('mouseenter', () => {
        gsap.to(arrow, { x: -(pill.offsetWidth + 4), duration: 0.45, ease });
        gsap.to(pill, { x: arrow.offsetWidth + 4, duration: 0.45, ease });
        gsap.to(icon, { rotation: 45, duration: 0.45, ease });
      });
      cta.addEventListener('mouseleave', () => { gsap.to([arrow, pill], { x: 0, duration: 0.45, ease }); gsap.to(icon, { rotation: 0, duration: 0.45, ease }); });
    });
  }

  /* ================= line reveals ================= */
  function lineReveals() {
    $$('[data-lines]').forEach(el => SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit(self) {
        if (REDUCE) return;
        return gsap.from(self.lines, { yPercent: 115, duration: 1, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } });
      }
    }));
  }

  /* ================= wavy edges (Crency) ================= */
  function waves() {
    const P0 = -3.6, AMP = 34, LAMBDA = 1800;
    $$('[data-wave]').forEach(svg => {
      const path = $('path', svg);
      const draw = phase => {
        let d = 'M0 100';
        for (let i = 0; i <= 40; i++) { const x = i * 25; d += ` L${x} ${(52 + AMP * Math.sin((2 * Math.PI * x) / LAMBDA + phase)).toFixed(2)}`; }
        path.setAttribute('d', d + ' L1000 100 Z');
      };
      draw(P0);
      if (!REDUCE) ScrollTrigger.create({ trigger: svg, start: 'top bottom', end: 'top top', onUpdate: s => draw(P0 + Math.PI * s.progress) });
    });
  }

  /* ================= 1 hero: pen + badges (Crency) + rotating word (Copula) ================= */
  function rotor() {
    const el = $('[data-rotor]'), words = el.dataset.rotor.split(',');
    if (REDUCE) { el.textContent = words[0]; return; }
    let i = 0;
    const show = () => {
      el.innerHTML = [...words[i]].map(c => `<span class="ch">${c}</span>`).join('');
      const chars = $$('.ch', el);
      gsap.timeline({ onComplete: () => { i = (i + 1) % words.length; show(); } })
        .fromTo(chars, { opacity: 0, yPercent: 40, rotation: () => gsap.utils.random(-12, 12) }, { opacity: 1, yPercent: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.06 })
        .to(chars, { opacity: 0, yPercent: -30, duration: 0.35, ease: 'power2.in', stagger: 0.045 }, '+=2.2');
    };
    show();
  }

  function hero() {
    const heroEl = $('[data-hero]'), svg = $('[data-pen]'), path = $('[data-pen-path]');
    const dotsG = $('[data-pen-dots]'), nib = $('[data-pen-nib]'), nav = $('[data-nav]'), dock = $('[data-dock]');
    const badges = $$('[data-badge]');
    const PTS = [[-0.03, 0.3], [0.12, 0.16], [0.32, 0.1], [0.52, 0.14], [0.66, 0.3], [0.6, 0.5], [0.46, 0.54], [0.4, 0.42], [0.5, 0.32], [0.68, 0.36], [0.8, 0.46], [0.9, 0.62], [0.8, 0.84], [0.64, 0.9], [0.56, 0.78], [0.68, 0.66], [0.88, 0.72], [1.03, 0.92]];
    const build = () => {
      const W = heroEl.clientWidth, H = innerHeight, P = PTS.map(([x, y]) => [x * W, y * H]);
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      path.setAttribute('d', catmull(P));
      dotsG.innerHTML = P.slice(1, -1).map(([x, y], i) =>
        (i === 7 ? `<line class="pen-handle" x1="${x - 60}" y1="${y + 34}" x2="${x + 60}" y2="${y - 34}"/><circle class="pen-dot" cx="${x - 60}" cy="${y + 34}" r="4"/><circle class="pen-dot" cx="${x + 60}" cy="${y - 34}" r="4"/>` : '') +
        `<circle class="pen-dot" cx="${x}" cy="${y}" r="5.5"/>`).join('');
      badges.forEach(b => { b.style.left = b.dataset.x * 100 + '%'; b.style.top = b.dataset.y * 100 + '%'; });
    };
    const nearest = (x, y) => {
      const L = path.getTotalLength(); let best = 0, bd = Infinity;
      for (let i = 0; i <= 300; i++) { const p = path.getPointAtLength((L * i) / 300), d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = i / 300; } }
      return best;
    };
    build();
    gsap.set(badges, { xPercent: -50, yPercent: -50, scale: 0 });
    const splits = $$('[data-split]').map(el => SplitText.create(el, { type: 'chars' }));
    const chars = splits.flatMap(s => s.chars);

    if (REDUCE) { gsap.set([nav, dock], { opacity: 1 }); gsap.set(badges, { scale: 1 }); gsap.set(nib, { opacity: 0 }); rotor(); return gsap.timeline(); }

    const W = heroEl.clientWidth, H = innerHeight, PEN_AT = 1.2, PEN_DUR = 3.6;
    const tl = gsap.timeline({ paused: true })
      .from(chars, { yPercent: 120, opacity: 0, rotation: () => gsap.utils.random(-14, 14), duration: 0.9, ease: 'power3.out', stagger: 0.035 }, 0)
      .from('.ast', { scale: 0, rotation: -180, duration: 1, ease: 'back.out(1.8)' }, 0.5)
      .from('.hero .scbadge', { scale: 0, rotation: 90, duration: 0.9, ease: 'back.out(2)' }, 0.7)
      .from('.hero__tag', { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .add(rotor, 0.4)
      .fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: PEN_DUR, ease: 'none' }, PEN_AT)
      .fromTo(nib, { opacity: 0 }, { opacity: 1, duration: 0.2 }, PEN_AT)
      .to(nib, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: 90 }, duration: PEN_DUR, ease: 'none' }, PEN_AT)
      .fromTo(nav, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, PEN_AT + 0.8)
      .fromTo(dock, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)' }, PEN_AT + PEN_DUR);
    $$('.pen-dot, .pen-handle', dotsG).forEach(dot => {
      const x = +(dot.getAttribute('cx') ?? dot.getAttribute('x1')), y = +(dot.getAttribute('cy') ?? dot.getAttribute('y1'));
      tl.from(dot, { scale: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, PEN_AT + nearest(x, y) * PEN_DUR);
    });
    badges.forEach(b => tl.fromTo(b, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.2)' }, PEN_AT + nearest(b.dataset.x * W, b.dataset.y * H) * PEN_DUR));

    ScrollTrigger.create({
      trigger: heroEl, start: 'top top', end: 'bottom top',
      onEnterBack: () => gsap.fromTo(chars, { yPercent: 120, rotation: () => gsap.utils.random(-14, 14) }, { yPercent: 0, rotation: 0, duration: 0.7, ease: 'power3.out', stagger: 0.02, overwrite: true })
    });
    let rT;
    addEventListener('resize', () => {
      clearTimeout(rT);
      rT = setTimeout(() => { build(); gsap.set(path, { drawSVG: '100%' }); gsap.set(nib, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: 90, end: 1 } }); }, 200);
    });
    return tl;
  }

  /* ================= loader (new) ================= */
  function loader(onDone) {
    const el = $('[data-loader]');
    if (REDUCE) { el.remove(); onDone(); return; }
    lenis.stop();
    gsap.ticker.lagSmoothing(500, 33); // don't let a slow first frame skip the intro
    const n = { v: 0 }, count = $('[data-count]', el);
    gsap.timeline({ onComplete: () => { el.remove(); lenis.start(); gsap.ticker.lagSmoothing(0); } })
      .to(n, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(n.v)) })
      .to($$('.lb', el), { scaleY: 1, duration: 0.6, ease: 'power3.inOut', stagger: 0.1 }, 0.9)
      .to('.loader__count, .loader__word', { opacity: 0, duration: 0.2 }, '-=0.15')
      .to(el, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
      .add(onDone, '-=0.45');
  }

  function navAutoHide() {
    const nav = $('[data-nav]');
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => gsap.to(nav, { yPercent: s.direction === 1 && s.scroll() > 200 ? -160 : 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }) });
  }

  /* ================= 2 manifesto curve (Copula) ================= */
  function manifesto() {
    const sec = $('[data-manifesto]'), svg = $('[data-curve]'), path = $('[data-wave-path]'), tp = $('[data-textpath]'), para = $('[data-manifesto-para]');
    let textLen = 0, pathLen = 0;
    const build = () => {
      const W = sec.clientWidth, H = sec.clientHeight, y0 = H * 0.42, a = H * (MOBILE ? 0.08 : 0.16);
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      path.setAttribute('d', `M${-0.3 * W},${y0 + a} C${0.15 * W},${y0 - a} ${0.35 * W},${y0 - a * 0.9} ${0.52 * W},${y0 + a * 0.2} S${0.95 * W},${y0 + a * 1.4} ${1.3 * W},${y0 - a * 0.6}`);
      textLen = tp.getComputedTextLength(); pathLen = path.getTotalLength();
    };
    build();
    if (REDUCE) { tp.setAttribute('startOffset', (pathLen - textLen) / 2); gsap.set(para, { opacity: 1, y: innerHeight * 0.2 }); return; }
    const o = { v: 0 }, set = () => tp.setAttribute('startOffset', (-textLen + o.v * (pathLen + textLen)).toFixed(1));
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=240%', pin: true, scrub: 1, invalidateOnRefresh: true, onRefresh: () => { build(); set(); } } })
      .fromTo(o, { v: 0 }, { v: 1, ease: 'none', duration: 3, onUpdate: set })
      .fromTo(para, { opacity: 0 }, { opacity: 0.12, ease: 'none', duration: 0.3 }, '-=0.1')
      .to(para, { opacity: 1, ease: 'none', duration: 1 })
      .to({}, { duration: 0.4 });
  }

  /* ================= 3 icon story (Crency) ================= */
  function story() {
    if (REDUCE || MOBILE) return;
    const sec = $('[data-story]'), copy = $('[data-story-copy]'), rowSlots = $$('[data-row-slot]'), lines = $$('.sl__in', sec);
    const ORDER = ['cursor', 'heart', 'chart', 'crown', 'bolt'], BASE = 200;
    const flyer = id => $(`.flyer[data-icon="${id}"]`, sec);
    const SCATTER = { cursor: [0.28, 0.3, -14], heart: [0.6, 0.22, 10], chart: [0.44, 0.58, -6], crown: [0.7, 0.6, 16], bolt: [0.22, 0.62, -10] };
    const LINE_OF = { crown: 0, heart: 1, bolt: 2, cursor: 3, chart: 3 };
    const rel = el => { const r = el.getBoundingClientRect(), s = sec.getBoundingClientRect(); return { x: r.left - s.left, y: r.top - s.top, w: r.width }; };
    const row = i => rel(rowSlots[i]);
    const slot = id => {
      const el = $(`[data-slot="${id}"]`, sec), line = lines[LINE_OF[id]], r = rel(el);
      const off = (gsap.getProperty(line, 'yPercent') / 100) * line.offsetHeight + gsap.getProperty(line, 'y');
      return { x: r.x, y: r.y - off, w: r.w };
    };
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: { trigger: sec, start: 'top top', end: '+=260%', pin: true, scrub: 1, invalidateOnRefresh: true } });
    tl.to(copy, { y: -140, opacity: 0, duration: 1.4, ease: 'power2.in' }, 0);
    ORDER.forEach((id, i) => tl.fromTo(flyer(id),
      { x: () => row(i).x, y: () => row(i).y, scale: () => row(i).w / BASE, rotation: 0 },
      { x: () => SCATTER[id][0] * sec.clientWidth, y: () => SCATTER[id][1] * sec.clientHeight, scale: () => (row(i).w * 0.45) / BASE, rotation: SCATTER[id][2], duration: 2.2 }, 0.9 + i * 0.28));
    lines.forEach((line, li) => {
      const t = 4.6 + li * 1.25;
      tl.fromTo(line, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'power3.out' }, t);
      ORDER.filter(id => LINE_OF[id] === li).forEach((id, k) =>
        tl.to(flyer(id), { x: () => slot(id).x, y: () => slot(id).y, scale: () => slot(id).w / BASE, rotation: 0, duration: 1.3 }, t - 0.25 + k * 0.15));
    });
    tl.to({}, { duration: 0.8 });
  }

  /* ================= 4 connection (Copula) ================= */
  function clients() {
    if (REDUCE) return;
    const st = start => ({ trigger: '.conn', start, toggleActions: 'play none none reverse' });
    gsap.fromTo('[data-coil] path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, ease: 'power2.inOut', scrollTrigger: st('top 70%') });
    gsap.from('[data-rating]', { scale: 0, rotation: -40, duration: 0.9, ease: 'back.out(1.8)', scrollTrigger: st('top 55%') });
    gsap.from('.conn > span[aria-hidden]', { yPercent: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('top 80%') });
    gsap.to('[data-logos]', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
  }

  /* ================= 5 services flip (Crency) ================= */
  function services() {
    if (REDUCE || MOBILE) return;
    const sec = $('[data-services]'), [left, mid, right] = ['left', 'mid', 'right'].map(k => $(`[data-card="${k}"]`, sec));
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=170%', pin: true, scrub: 1 } })
      .fromTo(mid, { yPercent: 95, rotationX: 42, rotationY: -26, rotationZ: -7 }, { yPercent: 0, rotationX: 12, rotationY: -12, rotationZ: -2, duration: 1.4, ease: 'power2.out' })
      .to(mid, { rotationY: 90, rotationX: 0, rotationZ: 0, duration: 0.9, ease: 'power2.in' })
      .fromTo([left, right], { yPercent: 130, rotationX: 35 }, { yPercent: 0, rotationX: 0, duration: 1.3, ease: 'power3.out', stagger: 0.12 }, '<0.35')
      .fromTo(mid, { rotationY: -90 }, { rotationY: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, '>-0.7')
      .to({}, { duration: 0.5 });
  }

  /* ================= 6 cases (Crency) ================= */
  const CASES = [ // PLACEHOLDER content
    { name: 'ZENITH', c: 'lime', client: 'Zenith Fitness', rating: '4.9', service: 'MOBILE APP', quote: 'They shipped our app in eight weeks and it has not gone down once.' },
    { name: 'KITE', c: 'blue', client: 'Kite Travel', rating: '5.0', service: 'WEB PLATFORM', quote: 'Clear process, honest estimates and a product our users love.' },
    { name: 'ORBITPAY', c: 'orange', client: 'OrbitPay', rating: '4.9', service: 'FINTECH API', quote: 'Security-first engineering. Our audit passed on the first try.' },
    { name: 'UMBRA', c: 'lime', client: 'Umbra Studio', rating: '5.0', service: 'SAAS DASHBOARD', quote: 'Our dashboard finally feels as fast as we always wanted it to be.' },
    { name: 'LUMEN LABS', c: 'blue', client: 'Lumen Labs', rating: '4.9', service: 'WEB APP DEVELOPMENT', quote: 'We were happy with the final product and highly recommend the team for complex builds.' },
    { name: 'NORTHWIND', c: 'orange', client: 'Northwind', rating: '5.0', service: 'INTERNAL TOOLS', quote: 'Everything went great. They helped us structure the request before writing any code.' },
    { name: 'PULSE HEALTH', c: 'lime', client: 'Pulse Health', rating: '4.8', service: 'HEALTHCARE PORTAL', quote: 'Accessible, compliant and genuinely pleasant to use.' },
    { name: 'FERRY', c: 'blue', client: 'Ferry Logistics', rating: '4.9', service: 'MARKETPLACE', quote: 'Bookings doubled in the first quarter after launch.' },
    { name: 'BLOOM', c: 'orange', client: 'Bloom Market', rating: '5.0', service: 'E-COMMERCE', quote: 'Page speed went from painful to instant.' },
    { name: 'VOLT', c: 'lime', client: 'Volt Energy', rating: '4.9', service: 'IOT PLATFORM', quote: 'Thousands of devices, one calm dashboard.' },
    { name: 'HARBOR', c: 'blue', client: 'Harbor CRM', rating: '4.9', service: 'CRM MIGRATION', quote: 'Zero downtime migration. We did not believe it was possible.' }
  ];
  const COVER = { lime: ['var(--lime)', 'var(--violet)', 'var(--ink)'], blue: ['var(--blue)', 'var(--sky)', '#fff'], orange: ['var(--orange)', '#ff8a4d', '#fff'] };
  function cases() {
    const sec = $('[data-cases]'), stage = $('[data-stage]'), burst = $('[data-burst]');
    const icons = ['ic-cursor', 'ic-heart', 'ic-chart', 'ic-crown', 'ic-bolt'], pad = n => String(n).padStart(2, '0');
    stage.innerHTML = CASES.map((c, i) => `
      <div class="case" data-i="${i}">
        <div class="case__cover" style="background:${COVER[c.c][0]};--c1:${COVER[c.c][1]};color:${COVER[c.c][2]}">
          <div class="case__logo">nova✱</div>
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
    let active = 3 + Math.floor(Math.random() * 4), spread = REDUCE ? 1 : 0.2, busy = false;
    const cw = () => MOBILE ? innerWidth * 0.42 : Math.min(Math.max(innerWidth * 0.24, 220), 380);
    const sizes = () => { const w = cw(); stage.style.setProperty('--cw', w + 'px'); stage.style.setProperty('--ch', w * 1.32 + 'px'); };
    const layout = (dur = 0.8) => {
      const w = cw();
      cards.forEach((card, i) => {
        const off = i - active, a = Math.abs(off), s = Math.sign(off), on = off === 0;
        const x = on ? -w / 2 : s * (w * 0.95 + (a - 1) * w * (MOBILE ? 0.12 : 0.2));
        card.classList.toggle('is-closed', !on);
        $('.case__spine', card).style.cssText = s < 0 ? 'right:auto;left:16px;transform:rotate(180deg)' : '';
        gsap.to(card, { x: x * spread, z: -a * 70, rotationY: on ? 0 : -s * 34, scale: 1 - a * 0.025, zIndex: 100 - a, duration: dur, ease: 'power3.out', overwrite: 'auto' });
        gsap.to($('.case__detail', card), { width: on ? w : 0, duration: dur, ease: 'power3.out', overwrite: 'auto' });
      });
    };
    const go = i => { active = gsap.utils.clamp(0, cards.length - 1, i); busy = true; layout(0.8); gsap.delayedCall(0.8, () => (busy = false)); };
    sizes(); layout(0);
    let startX = null;
    stage.addEventListener('pointerdown', e => { if (e.target.closest('a')) return; startX = e.clientX; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener('pointermove', e => { if (startX === null) return; const dx = e.clientX - startX; if (Math.abs(dx) > 70) { go(active - Math.sign(dx)); startX = e.clientX; } });
    ['pointerup', 'pointercancel'].forEach(t => stage.addEventListener(t, () => (startX = null)));
    stage.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(active + 1); if (e.key === 'ArrowLeft') go(active - 1); });
    $('[data-case-prev]').addEventListener('click', () => go(active - 1));
    $('[data-case-next]').addEventListener('click', () => go(active + 1));
    stage.addEventListener('click', e => { const c = e.target.closest('.case.is-closed'); if (c) go(+c.dataset.i); });
    addEventListener('resize', () => { sizes(); layout(0); });
    if (REDUCE) return;
    const proxy = { s: 0.2 };
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 15%', scrub: 1 } })
      .fromTo(stage, { yPercent: 35 }, { yPercent: 0, ease: 'none' }, 0)
      .fromTo(proxy, { s: 0.2 }, { s: 1, ease: 'power1.out', onUpdate: () => { spread = proxy.s; if (!busy) layout(0); } }, 0);
    gsap.fromTo(burst, { rotation: -25, scale: 0.35 }, { rotation: 30, scale: 1.05, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }

  /* ================= 7 signposts (Crency) ================= */
  function signs() {
    if (REDUCE) return;
    const st = () => ({ trigger: '.signs', start: 'top bottom', end: 'bottom top', scrub: 1 });
    gsap.fromTo('[data-sign="right"]', { xPercent: 70 }, { xPercent: -8, ease: 'none', scrollTrigger: st() });
    gsap.fromTo('[data-sign="left"]', { xPercent: -70 }, { xPercent: 8, ease: 'none', scrollTrigger: st() });
  }

  /* ================= 8 bond reveal (Copula) ================= */
  function bond() {
    const sec = $('[data-bond]'), layer = $('[data-bond-layer]'), title = $('.bond__title', layer);
    const apply = p => {
      const W = sec.clientWidth, H = sec.clientHeight, r = Math.max(W * 0.9, H);
      const d0 = H * 0.12, d1 = H / 2 + r - Math.sqrt(r * r - (W / 2) ** 2) + H * 0.05;
      layer.style.setProperty('--r', r + 'px'); layer.style.setProperty('--h', H + 'px'); layer.style.setProperty('--d', d0 + (d1 - d0) * p + 'px');
    };
    if (REDUCE) { apply(1); return; }
    const o = { p: 0 };
    apply(0);
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=160%', pin: true, scrub: 1, onRefresh: () => apply(o.p) } })
      .to(o, { p: 1, ease: 'power1.inOut', duration: 1, onUpdate: () => apply(o.p) })
      .fromTo(title, { scale: 0.88, rotation: -3 }, { scale: 1, rotation: 0, ease: 'none', duration: 1 }, 0)
      .to({}, { duration: 0.25 });
  }

  /* ================= 9 about: word fill + faces (Copula) ================= */
  const FACES = [
    { bg: '#f4d1c1', skin: '#e8b89a', hair: '#2b1a12', top: '#120030' },
    { bg: '#cfcfcf', skin: '#bdbdbd', hair: '#1c1c1c', top: '#2e2e2e' },
    { bg: '#cebcf2', skin: '#f1c7a6', hair: '#6b3b1f', top: '#0500d4' },
    { bg: '#d4ff3a', skin: '#d99c74', hair: '#1a1a1a', top: '#120030' },
    { bg: '#ffd8a8', skin: '#e0ac86', hair: '#402010', top: '#eb4304' },
    { bg: '#e0e0e0', skin: '#b5b5b5', hair: '#5a5a5a', top: '#222' }
  ];
  function about() {
    const wrap = $('[data-faces]');
    wrap.innerHTML = FACES.map((f, i) => `
      <svg viewBox="0 0 100 100" class="${i ? '' : 'is-on'}">
        <rect width="100" height="100" fill="${f.bg}"/>
        <path d="M18 100 C20 74 34 66 50 66 C66 66 80 74 82 100 Z" fill="${f.top}"/>
        <rect x="44" y="54" width="12" height="14" rx="4" fill="${f.skin}"/>
        <ellipse cx="50" cy="42" rx="15" ry="18" fill="${f.skin}"/>
        <path d="M34 44 C30 22 44 16 52 18 C66 20 70 30 66 46 C64 34 58 28 50 28 C42 28 36 34 34 44 Z" fill="${f.hair}"/>
        ${i % 2 ? `<rect x="38" y="38" width="10" height="7" rx="3" fill="none" stroke="${f.hair}" stroke-width="1.5"/><rect x="52" y="38" width="10" height="7" rx="3" fill="none" stroke="${f.hair}" stroke-width="1.5"/>` : ''}
        <path d="M44 51 Q50 55 56 51" fill="none" stroke="#7a3b2a" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`).join('');
    const faces = $$('svg', wrap);
    let k = 0, timer = null;
    const tick = () => { faces[k].classList.remove('is-on'); k = (k + 1) % faces.length; faces[k].classList.add('is-on'); };
    if (!REDUCE) ScrollTrigger.create({ trigger: '.about', start: 'top bottom', end: 'bottom top', onToggle: s => { clearInterval(timer); if (s.isActive) timer = setInterval(tick, 800); } });
    const para = $('[data-fill]');
    SplitText.create(para, {
      type: 'words', wordsClass: 'w', autoSplit: true,
      onSplit(self) { if (REDUCE) return; return gsap.to(self.words, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: para, start: 'top 75%', end: 'bottom 45%', scrub: 1 } }); }
    });
  }

  /* ================= 10 audit (Crency) ================= */
  function audit() {
    const chips = $$('[data-chip]');
    if (REDUCE) return chips.forEach(c => { $('b', c).textContent = c.dataset.chip + '%'; gsap.set(c, { scale: 1 }); gsap.set($('s', c), { scaleX: c.dataset.chip / 100 }); });
    const tl = gsap.timeline({ paused: true });
    chips.forEach((c, i) => {
      const target = +c.dataset.chip, val = { v: 0 }, b = $('b', c);
      tl.fromTo(c, { scale: 0, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, i * 0.18)
        .to(val, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => (b.textContent = Math.round(val.v) + '%') }, i * 0.18 + 0.1)
        .fromTo($('s', c), { scaleX: 0 }, { scaleX: target / 100, duration: 1.6, ease: 'power2.out' }, i * 0.18 + 0.1);
    });
    ScrollTrigger.create({ trigger: '[data-audit]', start: 'top 55%', once: true, onEnter: () => tl.play() });
  }

  /* ================= 11 mood (Crency) ================= */
  function mood() {
    const cta = $('[data-mood-cta]'), label = $('.cta__pill', cta);
    $$('.sticker input').forEach(input => input.addEventListener('change', () => {
      label.textContent = input.dataset.cta;
      if (!REDUCE) gsap.fromTo(input.parentElement.querySelector('svg'), { rotation: -12, scale: 0.9 }, { rotation: 0, scale: 1.06, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    }));
    if (!REDUCE) gsap.from('.sticker', { y: 80, opacity: 0, rotation: () => gsap.utils.random(-20, 20), duration: 0.8, ease: 'back.out(1.6)', stagger: 0.12, scrollTrigger: { trigger: '.mood__options', start: 'top 85%', toggleActions: 'play none none reverse' } });
  }

  /* ================= 12 marquee + transition bands ================= */
  function marquee() {
    if (REDUCE) return;
    const loop = gsap.to('[data-marquee]', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    lenis.on('scroll', ({ velocity }) => { loop.timeScale(1 + Math.min(Math.abs(velocity) / 8, 4)); gsap.to(loop, { timeScale: 1, duration: 0.8, ease: 'power2.out', overwrite: true }); });
    $$('.mq-ast', $('[data-marquee]')).forEach(a => gsap.to(a, { rotation: 360, duration: 6, ease: 'none', repeat: -1 }));
    $$('.band__track').forEach((t, i) => gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 9, ease: 'none', repeat: -1 }));
  }

  function footer() {
    if (REDUCE) return;
    gsap.from('.footer__nav span', { yPercent: 110, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.footer', start: 'top 70%', toggleActions: 'play none none reverse' } });
    gsap.from('.footer__mark', { yPercent: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.footer', start: 'top 70%', toggleActions: 'play none none reverse' } });
  }

  /* ================= menu (Crency) ================= */
  const menu = $('[data-menu]');
  const pageParts = () => [$('main'), $('.footer'), $('[data-nav]'), $('[data-dock]')];
  let lastFocus = null;
  function openMenu() {
    lastFocus = document.activeElement;
    menu.hidden = false; lenis.stop();
    pageParts().forEach(el => el.classList.add('page-blur'));
    const circles = $$('[data-circle]', menu), items = $$('.menu__links > *, .round', menu);
    if (REDUCE) { $('.menu__links a', menu).focus(); return; }
    gsap.timeline()
      .fromTo([circles[2], circles[1], circles[0]], { xPercent: 190 }, { xPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 })
      .fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, '-=0.45')
      .add(() => $('.menu__links a', menu).focus());
  }
  function closeMenu(after) {
    const circles = $$('[data-circle]', menu), items = $$('.menu__links > *, .round', menu);
    const done = () => { menu.hidden = true; pageParts().forEach(el => el.classList.remove('page-blur')); lenis.start(); if (after) after(); else lastFocus?.focus?.(); };
    if (REDUCE) return done();
    gsap.timeline({ onComplete: done })
      .to(items, { opacity: 0, y: -20, duration: 0.25, stagger: 0.03 })
      .to(circles, { xPercent: -230, duration: 0.8, ease: 'power3.in', stagger: 0.08 }, '-=0.1');
  }
  function menuEvents() {
    $$('[data-menu-open]').forEach(b => b.addEventListener('click', openMenu));
    $('[data-menu-close]').addEventListener('click', () => closeMenu());
    document.addEventListener('keydown', e => {
      if (menu.hidden) return;
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        const f = $$('a, button', menu), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ================= page transition (Crency) ================= */
  function pageTransition(hash) {
    const target = hash === '#top' ? 0 : $(hash);
    if (REDUCE) return lenis.scrollTo(target, { immediate: true, force: true });
    const layer = $('[data-transition-layer]'), dim = $('.transition__dim', layer), bands = $('.transition__bands', layer), wipe = $('.transition__wipe', layer);
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
      if (!menu.hidden) closeMenu(() => pageTransition(href)); else pageTransition(href);
    });
  }

  /* ================= init ================= */
  function init() {
    window.scrollTo(0, 0);
    cursor(); ctas(); waves();
    const heroTl = hero();
    navAutoHide(); lineReveals(); manifesto(); story(); clients(); services(); cases(); signs(); bond(); about(); audit(); mood(); marquee(); footer();
    menuEvents(); transitionLinks();
    ScrollTrigger.refresh();
    // start the intro after the page has finished its heavy setup
    requestAnimationFrame(() => requestAnimationFrame(() => loader(() => heroTl.play())));
  }
  const fontsReady = document.fonts ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]) : Promise.resolve();
  fontsReady.then(init);
})();
