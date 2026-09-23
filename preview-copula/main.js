/* Copula-style homepage preview: plain JS + GSAP + Lenis.
   Section numbers (P1…P6, C-S3…) match docs/requirements-copula.md. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  history.scrollRestoration = 'manual';

  /* ---------- shapes ---------- */
  // Scalloped circle: round bumps with sharp inward cusps, r(θ) = inner + depth·|cos(nθ/2)|
  function scallop(n, R, depth, steps = 360) {
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const r = R - depth + depth * Math.abs(Math.cos((n * t) / 2));
      d += (i ? 'L' : 'M') + (r * Math.cos(t - Math.PI / 2)).toFixed(2) + ' ' + (r * Math.sin(t - Math.PI / 2)).toFixed(2);
    }
    return d + 'Z';
  }
  $$('svg[data-scallop]').forEach(svg => {
    svg.setAttribute('viewBox', '-100 -100 200 200');
    $('path', svg).setAttribute('d', scallop(+svg.dataset.scallop, 98, 16));
  });
  $$('[data-scallop-abs]').forEach(p => {
    const [n, R, depth] = p.dataset.scallopAbs.split(',').map(Number);
    p.setAttribute('d', scallop(n, R, depth));
  });
  // Scalloped oval (objectBoundingBox 0..1): scallops on the top and bottom, smooth sides
  (() => {
    let d = '';
    for (let i = 0; i <= 720; i++) {
      const t = (i / 720) * Math.PI * 2;
      const w = Math.abs(Math.sin(t)) ** 3;
      const k = 1 - 0.075 * w * (1 - Math.abs(Math.cos(10 * t)));
      d += (i ? 'L' : 'M') + (0.5 + 0.5 * k * Math.cos(t)).toFixed(4) + ' ' + (0.5 + 0.5 * k * Math.sin(t)).toFixed(4);
    }
    $('[data-scallop-oval]').setAttribute('d', d + 'Z');
  })();
  // Coil for the "O" in CONNECTION: a looping trochoid with a baseline lead-in and tail
  (() => {
    const loops = 11, T = Math.PI * 2 * loops, s = 352 / T;
    let d = 'M0 96 L14 96';
    for (let i = 0; i <= 900; i++) {
      const t = (i / 900) * T;
      d += ` L${(24 + s * t - 17 * Math.sin(t)).toFixed(2)} ${(58 + 38 * Math.cos(t)).toFixed(2)}`;
    }
    $('[data-coil] path').setAttribute('d', d + ' L400 96');
  })();

  // Shapes above are drawn without GSAP; everything below needs it.
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
    console.error('Animation libraries failed to load: check that preview-copula/vendor/ is present.');
    document.documentElement.classList.add('no-motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

  /* ---------- CG1 smooth scroll ---------- */
  const lenis = new Lenis({ lerp: REDUCE ? 1 : 0.1, smoothWheel: !REDUCE });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-jump]');
    if (!a) return;
    e.preventDefault();
    lenis.scrollTo(a.getAttribute('href') === '#top' ? 0 : a.getAttribute('href'), { duration: REDUCE ? 0 : 1.4 });
  });
  $$('[data-menu-open]').forEach(b => b.addEventListener('click', () => lenis.scrollTo('#footer', { duration: REDUCE ? 0 : 1.6 })));

  /* ---------- CG2 cursor dot ---------- */
  function dot() {
    if (!FINE) return;
    const el = $('.dot');
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', e => { el.style.opacity = 1; x(e.clientX); y(e.clientY); });
    document.addEventListener('pointerover', e => el.classList.toggle('is-big', !!e.target.closest('a, button')));
    document.documentElement.addEventListener('pointerleave', () => (el.style.opacity = 0));
  }

  /* ---------- CG3 header bar ---------- */
  function header() {
    const bar = $('[data-bar]');
    ScrollTrigger.create({
      start: () => innerHeight, end: 'max',
      onUpdate: s => bar.classList.toggle('is-on', s.direction === -1),
      onLeaveBack: () => bar.classList.remove('is-on')
    });
  }

  /* ---------- P1 rotating word ---------- */
  function rotor() {
    const el = $('[data-rotor]');
    const words = el.dataset.rotor.split(',');
    if (REDUCE) { el.textContent = words[0]; return; }
    let i = 0;
    const show = () => {
      el.innerHTML = [...words[i]].map(c => `<span class="ch">${c}</span>`).join('');
      const chars = $$('.ch', el);
      gsap.timeline({ onComplete: () => { i = (i + 1) % words.length; show(); } })
        .fromTo(chars, { opacity: 0, yPercent: 35 }, { opacity: 1, yPercent: 0, duration: 0.45, ease: 'power2.out', stagger: 0.07 })
        .to(chars, { opacity: 0, yPercent: -25, duration: 0.35, ease: 'power2.in', stagger: 0.05 }, '+=2.2');
    };
    show();
    gsap.from('.hero__title .hl:not(.hl--rotor), .hero__tag', { yPercent: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.1 });
  }

  /* ---------- P2 curved manifesto line ---------- */
  function manifesto() {
    const sec = $('[data-manifesto]'), svg = $('[data-curve]'), path = $('[data-wave]'), tp = $('[data-textpath]'), para = $('[data-manifesto-para]');
    let textLen = 0, pathLen = 0;
    const build = () => {
      const W = sec.clientWidth, H = sec.clientHeight, m = innerWidth < 768;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const y0 = H * 0.42, a = H * (m ? 0.08 : 0.16);
      path.setAttribute('d', `M${-0.3 * W},${y0 + a} C${0.15 * W},${y0 - a} ${0.35 * W},${y0 - a * 0.9} ${0.52 * W},${y0 + a * 0.2} S${0.95 * W},${y0 + a * 1.4} ${1.3 * W},${y0 - a * 0.6}`);
      textLen = tp.getComputedTextLength();
      pathLen = path.getTotalLength();
    };
    build();
    if (REDUCE) { tp.setAttribute('startOffset', (pathLen - textLen) / 2); gsap.set(para, { opacity: 1, y: innerHeight * 0.18 }); return; }
    const o = { v: 0 };
    const set = () => tp.setAttribute('startOffset', (-textLen + o.v * (pathLen + textLen)).toFixed(1));
    gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=240%', pin: true, scrub: 1, invalidateOnRefresh: true, onRefresh: () => { build(); set(); } }
    })
      .fromTo(o, { v: 0 }, { v: 1, ease: 'none', duration: 3, onUpdate: set })
      .fromTo(para, { opacity: 0 }, { opacity: 0.12, ease: 'none', duration: 0.3 }, '-=0.1')
      .to(para, { opacity: 1, ease: 'none', duration: 1 })
      .to({}, { duration: 0.4 });
  }

  /* ---------- C-S3 services accordion + circles ---------- */
  function services() {
    const items = $$('.acc__item'), circles = $('[data-circles]');
    items.forEach((item, idx) => {
      $('.acc__head', item).addEventListener('click', () => {
        items.forEach(it => {
          const open = it === item, body = $('.acc__body', it), was = it.classList.contains('is-open');
          it.classList.toggle('is-open', open);
          $('.acc__head', it).setAttribute('aria-expanded', open);
          if (open && !was) {
            gsap.fromTo(body, { height: 0 }, { height: 'auto', duration: REDUCE ? 0 : 0.6, ease: 'power3.inOut' });
            if (!REDUCE) gsap.from($$('.tags li', body), { y: 16, opacity: 0, duration: 0.4, stagger: 0.04, delay: 0.2 });
          } else if (!open && was) {
            gsap.fromTo(body, { height: body.offsetHeight }, { height: 0, duration: REDUCE ? 0 : 0.5, ease: 'power3.inOut', clearProps: 'height' });
          }
        });
        gsap.to(circles, { rotation: idx * 90, duration: REDUCE ? 0 : 0.9, ease: 'back.out(1.6)' });
      });
    });
    if (REDUCE) return;
    gsap.from($$('i', circles), {
      scale: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0.1,
      scrollTrigger: { trigger: circles, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
    gsap.from('.pill', { yPercent: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.pill', start: 'top 92%', toggleActions: 'play none none reverse' } });
  }

  /* ---------- P3 coil, rating badge, logo marquee ---------- */
  function clients() {
    if (REDUCE) return;
    gsap.fromTo('[data-coil] path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: '.conn', start: 'top 70%', toggleActions: 'play none none reverse' } });
    gsap.from('[data-rating]', { scale: 0, rotation: -40, duration: 0.9, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.conn', start: 'top 55%', toggleActions: 'play none none reverse' } });
    gsap.from('.conn > span[aria-hidden]', { yPercent: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.conn', start: 'top 80%', toggleActions: 'play none none reverse' } });
    gsap.to('[data-logos]', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
  }

  /* ---------- P4 two circles close in ---------- */
  function bond() {
    const sec = $('[data-bond]'), layer = $('[data-bond-layer]'), title = $('.bond__title', layer);
    const geo = () => {
      const W = sec.clientWidth, H = sec.clientHeight, r = Math.max(W * 0.9, H);
      const d0 = H * 0.12, d1 = H / 2 + r - Math.sqrt(r * r - (W / 2) ** 2) + H * 0.05;
      return { W, H, r, d0, d1 };
    };
    const apply = p => {
      const g = geo(), d = g.d0 + (g.d1 - g.d0) * p;
      layer.style.setProperty('--r', g.r + 'px');
      layer.style.setProperty('--h', g.H + 'px');
      layer.style.setProperty('--d', d + 'px');
    };
    if (REDUCE) { apply(1); return; }
    apply(0);
    const o = { p: 0 };
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=160%', pin: true, scrub: 1, onRefresh: () => apply(o.p) } })
      .to(o, { p: 1, ease: 'power1.inOut', duration: 1, onUpdate: () => apply(o.p) })
      .fromTo(title, { scale: 0.9 }, { scale: 1, ease: 'none', duration: 1 }, 0)
      .to({}, { duration: 0.25 });
  }

  /* ---------- P5 about: word fill + cycling faces ---------- */
  const FACES = [
    { bg: '#f4d1c1', skin: '#e8b89a', hair: '#2b1a12', top: '#1b1b1b', bw: false },
    { bg: '#cfcfcf', skin: '#bdbdbd', hair: '#1c1c1c', top: '#2e2e2e', bw: true },
    { bg: '#9ec5ff', skin: '#f1c7a6', hair: '#6b3b1f', top: '#1d3fd6', bw: false },
    { bg: '#d9d9d9', skin: '#c7c7c7', hair: '#3a3a3a', top: '#101010', bw: true },
    { bg: '#ffd8a8', skin: '#d99c74', hair: '#1a1a1a', top: '#eb4304', bw: false },
    { bg: '#e0e0e0', skin: '#b5b5b5', hair: '#5a5a5a', top: '#222', bw: true }
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
    if (!REDUCE) ScrollTrigger.create({
      trigger: '#about', start: 'top bottom', end: 'bottom top',
      onToggle: s => { clearInterval(timer); if (s.isActive) timer = setInterval(tick, 800); }
    });

    const para = $('[data-fill]');
    SplitText.create(para, {
      type: 'words', wordsClass: 'w', autoSplit: true,
      onSplit(self) {
        if (REDUCE) return;
        return gsap.to(self.words, {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: para, start: 'top 75%', end: 'bottom 45%', scrub: 1 }
        });
      }
    });
  }

  /* ---------- news + footer entrances ---------- */
  function extras() {
    if (REDUCE) return;
    SplitText.create('.news__title', {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: self => gsap.from(self.lines, { yPercent: 110, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.news__title', start: 'top 80%', toggleActions: 'play none none reverse' } })
    });
    gsap.from('.card', { y: 80, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.cards', start: 'top 85%', toggleActions: 'play none none reverse' } });
    gsap.from('.footer__nav span', { yPercent: 110, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.footer', start: 'top 70%', toggleActions: 'play none none reverse' } });
  }

  function init() {
    window.scrollTo(0, 0);
    dot(); header(); rotor(); manifesto(); services(); clients(); bond(); about(); extras();
    ScrollTrigger.refresh();
  }
  const fontsReady = document.fonts ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]) : Promise.resolve();
  fontsReady.then(init);
})();
