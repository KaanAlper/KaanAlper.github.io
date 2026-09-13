import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { areas, type Area } from "@/data/portfolio";

export function Mark() {
  return (
    <Link href="/" className="brand-mark" aria-label="Kaan Alper Karaaslan ana sayfa">
      <span className="brand-name">Kaan Alper Karaaslan</span>
    </Link>
  );
}

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const close = () => setOpen(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <Mark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={location.startsWith(item.href) ? "nav-link active" : "nav-link"}>
              {item.label}
            </Link>
          ))}
          <a href="mailto:kaanalperkaraaslan@gmail.com" className="nav-email">Let's talk <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={close}>{item.label}</Link>
          ))}
          <a href="mailto:kaanalperkaraaslan@gmail.com" onClick={close} className="mobile-nav-link">Let's talk ↗</a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline" />
      <div className="footer-grid">
        <div>
          <Mark />
          <p className="footer-note">Engineering across perception, production and the systems underneath.</p>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">Start a conversation</span>
          <a className="footer-email" href="mailto:kaanalperkaraaslan@gmail.com">kaanalperkaraaslan@gmail.com <ArrowUpRight size={17} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Kaan Alper Karaaslan</span>
        <span>Designed as a living technical record.</span>
      </div>
    </footer>
  );
}

export function SectionLabel({ children, number }: { children: React.ReactNode; number?: string }) {
  return <div className="section-label"><span className="label-dot" />{number && <span>{number}</span>}<span>{children}</span></div>;
}

export function BackLink({ to = "/work", children = "All work" }: { to?: string; children?: string }) {
  return <Link href={to} className="back-link"><ArrowLeft size={15} /> {children}</Link>;
}

export function AreaGlyph({ area, compact = false }: { area: Area; compact?: boolean }) {
  const className = `area-glyph ${areas[area].color} ${compact ? "compact" : ""}`;
  if (area === "vision") return <VisionGlyph className={className} />;
  if (area === "production") return <ProductionGlyph className={className} />;
  if (area === "systems") return <SystemsGlyph className={className} />;
  return <MobileGlyph className={className} />;
}

function VisionGlyph({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 64 44" aria-hidden="true"><path d="M4 34C16 9 24 8 31 27S46 42 60 5" fill="none" stroke="currentColor" /><path d="M4 25C15 3 24 15 33 21S48 28 60 15" fill="none" stroke="currentColor" opacity=".55" /><circle cx="12" cy="21" r="2" fill="currentColor" /><circle cx="31" cy="27" r="2" fill="currentColor" /><circle cx="51" cy="22" r="2" fill="currentColor" /></svg>;
}

function ProductionGlyph({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 64 44" aria-hidden="true"><path d="M7 36V8h50v28H7Z" fill="none" stroke="currentColor" /><path d="M7 16h50M20 8v28M34 8v28M48 8v28" fill="none" stroke="currentColor" opacity=".4" /><path d="m12 30 7-8 7 4 9-11 8 6 9-8" fill="none" stroke="currentColor" /><circle cx="44" cy="21" r="3" fill="currentColor" /></svg>;
}

function SystemsGlyph({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 64 44" aria-hidden="true"><path d="M8 10h14v10H8zM42 24h14v10H42zM27 4h10v10H27zM27 30h10v10H27z" fill="none" stroke="currentColor" /><path d="M22 15 27 9m10 0 5 20M27 35h-7V20h-8m25 9h5" fill="none" stroke="currentColor" /><circle cx="22" cy="15" r="2" fill="currentColor" /><circle cx="42" cy="29" r="2" fill="currentColor" /></svg>;
}

function MobileGlyph({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 64 44" aria-hidden="true"><rect x="21" y="3" width="22" height="38" rx="3" fill="none" stroke="currentColor" /><path d="M26 9h12M27 33h10" stroke="currentColor" /><path d="M27 18h10M27 23h7M27 28h10" stroke="currentColor" opacity=".65" /></svg>;
}

type CanvasMotif = "hero" | Area | "point-cloud" | "cad" | "decision-tree" | "network" | "mobile";

export function ScrollScrubCanvas({ motif, className = "" }: { motif: CanvasMotif; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = canvas.getContext("2d");
    if (!context) return;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const lowPower = mobile || Boolean((navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection?.saveData) || (navigator.hardwareConcurrency || 8) <= 4;
    const maxFps = lowPower ? 24 : mobile ? 30 : 60;
    const frameInterval = 1000 / maxFps;
    const dpr = Math.min(lowPower ? 1 : 2, window.devicePixelRatio || 1);
    const quality = lowPower ? .72 : mobile ? .86 : 1;
    const pixelRatio = dpr * quality;
    let raf = 0;
    let timer = 0;
    let lastPaint = -Infinity;
    let visible = true;
    canvas.dataset.canvasQuality = lowPower ? "low" : mobile ? "balanced" : "high";

    const draw = (now = performance.now()) => {
      raf = 0;
      if (!visible) return;
      if (now - lastPaint < frameInterval) {
        timer = window.setTimeout(() => {
          timer = 0;
          raf = window.requestAnimationFrame(draw);
        }, frameInterval - (now - lastPaint));
        return;
      }
      lastPaint = now;
      const rect = canvas.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const travel = Math.max(viewport, rect.height + viewport);
      const scrollProgress = Math.min(1, Math.max(0, (viewport - rect.top) / travel));

      // Continuous fluid time rotation + scroll scrub:
      const timeT = reducedMotion ? 0 : (now * 0.00016) % 1;
      const t = (timeT + scrollProgress * 0.6) % 1;

      const width = Math.max(1, Math.floor(rect.width * pixelRatio));
      const height = Math.max(1, Math.floor(rect.height * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawFrame(context, rect.width, rect.height, t, motif);

      if (!reducedMotion) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    const schedule = () => {
      if (!raf && !timer) raf = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => schedule());
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: "200px 0px" });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, [motif]);

  return <canvas ref={canvasRef} className={`scroll-scrub-canvas ${className}`} aria-label={`${motif} technical animation`} />;
}

function drawFrame(ctx: CanvasRenderingContext2D, width: number, height: number, t: number, motif: CanvasMotif) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(17,17,17,.02)";
  ctx.fillRect(0, 0, width, height);
  if (motif === "hero") drawHeroFrame(ctx, width, height, t);
  else if (motif === "vision" || motif === "point-cloud") drawVisionFrame(ctx, width, height, t);
  else if (motif === "production" || motif === "cad") drawProductionFrame(ctx, width, height, t);
  else if (motif === "systems" || motif === "network") drawSystemsFrame(ctx, width, height, t);
  else if (motif === "decision-tree") drawDecisionTreeFrame(ctx, width, height, t);
  else drawMobileFrame(ctx, width, height, t);
}


function strokeLine(ctx: CanvasRenderingContext2D, color: string, width: number, points: [number, number][]) {
  ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
}

function drawHeroFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w * .73, cy = h * .52, scale = Math.min(w, h) * .28;
  ctx.globalAlpha = .7;
  for (let ring = 0; ring < 5; ring++) { ctx.beginPath(); ctx.ellipse(cx, cy, scale * (1 + ring * .2), scale * (.34 + ring * .05), t * .4 + ring * .5, 0, Math.PI * 2); ctx.strokeStyle = ["#4ed4d3", "#efbd63", "#ab8eff", "#ff6f61", "#4ed4d3"][ring]; ctx.lineWidth = 1; ctx.stroke(); }
  for (let i = 0; i < 110; i++) { const a = i * .71 + t * Math.PI * 2; const radius = scale * (.2 + ((i * 17) % 100) / 100 * .82); const x = cx + Math.cos(a) * radius * 1.35; const y = cy + Math.sin(a) * radius * .7; ctx.beginPath(); ctx.arc(x, y, 1.2 + (i % 3) * .45, 0, Math.PI * 2); ctx.fillStyle = ["#4ed4d3", "#efbd63", "#ab8eff", "#ff6f61"][i % 4]; ctx.fill(); }
  ctx.globalAlpha = 1;
}

function drawVisionFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const base = h * .7;
  for (let row = 0; row < 13; row++) { const points: [number, number][] = []; for (let i = 0; i < 34; i++) { const x = i / 33 * w; const y = base - row * 7 - Math.sin(i * .5 + t * 8 + row) * (12 + row * 2) - (i * .03 * h); points.push([x, y]); } strokeLine(ctx, `rgba(78,212,211,${.18 + row / 55})`, 1, points); }
  for (let i = 0; i < 44; i++) { const x = (i * 47 + t * w * .8) % (w + 50) - 25; const y = base - (i % 12) * 15 - Math.sin(i + t * 6) * 28; ctx.fillStyle = i % 3 ? "#4ed4d3" : "#efbd63"; ctx.fillRect(x, y, 2, 2); }
}

function drawProductionFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const left = w * .14, right = w * .86, top = h * .2, bottom = h * .78;
  ctx.strokeStyle = "rgba(255,111,97,.4)"; ctx.lineWidth = 1;
  for (let i = 0; i < 7; i++) { const y = top + i / 6 * (bottom - top); ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(right, y); ctx.stroke(); }
  for (let i = 0; i < 9; i++) { const x = left + i / 8 * (right - left); ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke(); }
  const points: [number, number][] = []; for (let i = 0; i < 40; i++) { const x = left + i / 39 * (right - left); const y = bottom - (Math.sin(i * .4 + t * 7) * .18 + .5) * (bottom - top); points.push([x, y]); }
  strokeLine(ctx, "#ff6f61", 2, points); ctx.fillStyle = "#efbd63"; ctx.beginPath(); ctx.arc(points[Math.floor(t * 39)][0], points[Math.floor(t * 39)][1], 5, 0, Math.PI * 2); ctx.fill();
}

function drawSystemsFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const nodes = [[.18, .34], [.46, .2], [.73, .36], [.32, .72], [.62, .72], [.86, .62]] as const;
  ctx.lineWidth = 1; nodes.forEach(([x, y], i) => nodes.slice(i + 1).forEach(([x2, y2], j) => { if ((i + j) % 2 === 0) strokeLine(ctx, "rgba(239,189,99,.28)", 1, [[w * x, h * y], [w * x2, h * y2]]); }));
  nodes.forEach(([x, y], i) => { ctx.fillStyle = i % 2 ? "#efbd63" : "#ff6f61"; ctx.beginPath(); ctx.arc(w * x, h * y, 5 + (i === Math.floor(t * nodes.length) ? 4 : 0), 0, Math.PI * 2); ctx.fill(); });
  const p = (t * (nodes.length - 1)) % (nodes.length - 1), a = nodes[Math.floor(p)], b = nodes[Math.floor(p) + 1], f = p % 1; ctx.fillStyle = "#4ed4d3"; ctx.fillRect(w * (a[0] + (b[0] - a[0]) * f) - 3, h * (a[1] + (b[1] - a[1]) * f) - 3, 6, 6);
}

function drawMobileFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const x = w * .4, y = h * .15, phoneW = w * .2, phoneH = h * .7; ctx.strokeStyle = "rgba(171,142,255,.75)"; ctx.strokeRect(x, y, phoneW, phoneH); ctx.strokeStyle = "rgba(78,212,211,.55)"; for (let i = 0; i < 5; i++) { const yy = y + phoneH * (.23 + i * .1); ctx.beginPath(); ctx.moveTo(x + phoneW * .18, yy); ctx.lineTo(x + phoneW * (.35 + .5 * Math.sin(t * 5 + i) ** 2), yy); ctx.stroke(); } ctx.fillStyle = "#ab8eff"; ctx.beginPath(); ctx.arc(x + phoneW * (.5 + Math.sin(t * 6) * .18), y + phoneH * .58, 12 + Math.sin(t * 8) * 4, 0, Math.PI * 2); ctx.fill();
}

export function ProjectSchematic({ area }: { area: Area }) {
  return <div className={`project-schematic ${areas[area].color}`} aria-label="Category-specific technical project schematic">
    {area === "vision" && <svg viewBox="0 0 600 240" preserveAspectRatio="none"><path d="M0 180C90 60 145 60 210 150S330 230 390 80s120-60 210-20" fill="none" stroke="currentColor" /><path d="M0 130C80 30 145 100 220 110s130 50 190-30 120-10 190 20" fill="none" stroke="currentColor" opacity=".45" /><g fill="currentColor">{[55,145,260,380,500].map((x, i) => <circle key={x} cx={x} cy={120 + (i % 2) * 35} r="5" />)}</g></svg>}
    {area === "production" && <svg viewBox="0 0 600 240" preserveAspectRatio="none"><path d="M65 30v170h490M65 75h490M65 120h490M65 165h490M150 30v170M240 30v170M330 30v170M420 30v170M510 30v170" fill="none" stroke="currentColor" opacity=".28" /><path d="m80 165 65-30 50 14 68-75 54 46 73-30 55-49 62 44" fill="none" stroke="currentColor" strokeWidth="3" /><circle cx="410" cy="116" r="8" fill="currentColor" /></svg>}
    {area === "systems" && <svg viewBox="0 0 600 240" preserveAspectRatio="none"><g fill="none" stroke="currentColor"><path d="M100 72h120l80 76h110l80-70h80M220 72l80-55 110 55M300 148l-80 50h-90M410 148l90 50" /><rect x="70" y="48" width="60" height="48" /><rect x="270" y="124" width="60" height="48" /><rect x="470" y="48" width="60" height="48" /></g><g fill="currentColor"><circle cx="220" cy="72" r="6" /><circle cx="410" cy="148" r="6" /><circle cx="500" cy="198" r="5" /></g></svg>}
    {area === "mobile" && <svg viewBox="0 0 600 240" preserveAspectRatio="none"><rect x="225" y="20" width="150" height="200" rx="13" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M255 68h90M255 92h60M255 116h86M255 155h90" stroke="currentColor" opacity=".5" /><circle cx="300" cy="173" r="22" fill="currentColor" opacity=".35" /><circle cx="300" cy="173" r="8" fill="currentColor" /></svg>}
  </div>;
}

export function ContactLinks() {
  return (
    <div className="contact-links">
      <a href="mailto:kaanalperkaraaslan@gmail.com"><Mail size={17} /> Email</a>
      <a href="https://github.com/kaanalper" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
    </div>
  );
}

function drawCadFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.strokeStyle = "rgba(255,111,97,.52)"; ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.ellipse(w * .52, h * .5, w * (.16 + i * .08), h * (.16 + i * .045), t * .5 + i * .18, 0, Math.PI * 2); ctx.stroke(); }
  const outline: [number, number][] = [];
  for (let i = 0; i <= 32; i++) { const a = i / 32 * Math.PI * 2; outline.push([w * (.52 + Math.cos(a) * (.24 + .03 * Math.sin(a * 3 + t * 5))), h * (.5 + Math.sin(a) * (.22 + .04 * Math.cos(a * 2))) ]); }
  strokeLine(ctx, "#ff6f61", 2, outline); ctx.fillStyle = "#efbd63"; ctx.beginPath(); ctx.arc(w * (.52 + Math.cos(t * 6) * .2), h * (.5 + Math.sin(t * 6) * .16), 4, 0, Math.PI * 2); ctx.fill();
}

function drawDecisionTreeFrame(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const levels = [[.5, .18], [.31, .42], [.69, .42], [.18, .69], [.44, .69], [.58, .69], [.84, .69]] as const;
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  edges.forEach(([a, b]) => strokeLine(ctx, "rgba(171,142,255,.5)", 1, [[w * levels[a][0], h * levels[a][1]], [w * levels[b][0], h * levels[b][1]]]));
  levels.forEach(([x, y], i) => { ctx.fillStyle = i === Math.floor(t * levels.length) ? "#ff6f61" : i % 2 ? "#ab8eff" : "#4ed4d3"; ctx.beginPath(); ctx.arc(w * x, h * y, i === 0 ? 8 : 5, 0, Math.PI * 2); ctx.fill(); });
  ctx.strokeStyle = "rgba(171,142,255,.3)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(w * (.08 + t * .25), h * .83); ctx.bezierCurveTo(w * .28, h * .58, w * .62, h * .96, w * .92, h * .77); ctx.stroke(); ctx.setLineDash([]);
}
