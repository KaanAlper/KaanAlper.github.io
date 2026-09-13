import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, CircleArrowDown, Filter, Github, MapPin, MoveUpRight, Sparkles } from "lucide-react";
import { Link, useRoute } from "wouter";
import { AreaGlyph, BackLink, ContactLinks, ProjectSchematic, ScrollScrubCanvas, SectionLabel, SiteFooter, SiteHeader } from "@/components/PortfolioUI";
import { areas, featuredProjects, getProject, projects, type Area, type Project } from "@/data/portfolio";

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Kaan Alper Karaaslan`;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title, description]);
}

function Layout({ children }: { children: ReactNode }) {
  useScrollLinkedAtmosphere();
  return <div className="site-shell"><div className="scroll-atmosphere" aria-hidden="true" /><SiteHeader />{children}<SiteFooter /></div>;
}

function useScrollLinkedAtmosphere() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const focus = Math.min(1, Math.max(0, window.scrollY / ((window.innerHeight || 1) * 2.4)));
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      document.documentElement.style.setProperty("--scroll-focus", focus.toFixed(4));
      document.documentElement.style.setProperty("--scroll-shift", `${(progress * 22).toFixed(2)}%`);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
}

export function Home() {
  usePageMeta("Systems engineer", "Kaan Alper Karaaslan builds computer vision, production software and systems tooling.");
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) document.body.dataset.scene = (current.target as HTMLElement).dataset.scene || "ink";
    }, { threshold: [0.2, 0.45, 0.7] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <Layout>
    <main>
      <section className="hero" data-scene="ink">
        <img
          className="hero-art"
          src="/assets/kaanalper-hero-constellation.webp"
          alt="Abstract constellation of data points and technical orbits"
          fetchPriority="high"
          decoding="async"
        />
        <ScrollScrubCanvas motif="hero" className="hero-canvas" />
        <div className="hero-art-fade" />
        <div className="hero-content">
          <div className="hero-meta"><span><i className="live-dot" /> NOW / CLONIFY LABS + TEKNOFEST</span><span>ANKARA, TR</span></div>
          <h1>I build systems<br /><em>that see, move</em><br />and stay online.</h1>
          <p className="hero-dek">From CV pipelines and medical desktop CAD software to low-level reverse engineering and secure tunnels, I engineer across the full stack where real systems operate.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/work">Explore selected work <ArrowUpRight size={17} /></Link>
            <Link className="text-action" href="/about">About the engineer <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="hero-side-note"><span>SCROLL TO TRACE<br />THE SYSTEM</span><CircleArrowDown size={20} /></div>
      </section>

      <section className="intro-strip" data-scene="vision">
        <div className="container intro-grid">
          <p className="intro-statement">A systems-minded engineer operating from embedded and CV algorithms to desktop production CAD, binary reverse engineering and resilient networking.</p>
          <p className="intro-context">EEE + Computer Engineering double-major at Çankaya University. Software engineer at Clonify Labs (medical CAD). Technical lead across three TEKNOFEST teams.</p>
        </div>
      </section>

      <section className="pillars-section" data-scene="production">
        <div className="container">
          <div className="section-heading-row"><SectionLabel number="01">Core operating layers</SectionLabel><p>Not a collection of disconnected experiments—a cohesive map of real engineering challenges.</p></div>
          <div className="pillars-grid">
            {(Object.keys(areas) as Area[]).map((area, index) => {
              const item = areas[area];
              return <div className={`pillar ${item.color}`} key={area}>
                <ScrollScrubCanvas motif={area} className="pillar-canvas" />
                <div className="pillar-head"><AreaGlyph area={area} /><span>0{index + 1}</span></div>
                <h3>{item.label}</h3><p>{item.description}</p>
                <Link href="/work" className="pillar-link">Trace the work <ArrowUpRight size={15} /></Link>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="featured-section" data-scene="systems">
        <div className="container">
          <div className="section-heading-row featured-heading"><SectionLabel number="02">Selected work</SectionLabel><Link href="/work" className="text-action">View the full index <ArrowRight size={16} /></Link></div>
          <div className="featured-list">
            {featuredProjects.map((project, index) => <FeaturedRow key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>

      <section className="about-slice" data-scene="mobile">
        <div className="container about-slice-grid">
          <div><SectionLabel number="03">The through line</SectionLabel><h2>Technical depth is only useful when it arrives <em>where people need it.</em></h2></div>
          <div className="about-slice-body"><p>I gravitate toward rigorous, interdisciplinary challenges: uniting perception and control in an aerial flight loop, enforcing patient-record security in medical CAD, reverse engineering native binaries in Rust, or shipping privacy-preserving local AI on mobile.</p><Link href="/about" className="button button-outline">More about my practice <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      <section className="contact-cta" data-scene="ink">
        <div className="container contact-cta-inner"><span className="cta-symbol">✦</span><div><SectionLabel>Open to the right technical conversation</SectionLabel><h2>Have a problem that needs <em>both range and rigor?</em></h2></div><a className="button button-primary" href="mailto:kaanalperkaraaslan@gmail.com">Write to me <ArrowUpRight size={17} /></a></div>
      </section>
    </main>
  </Layout>;
}

function FeaturedRow({ project, index }: { project: Project; index: number }) {
  return <Link href={`/work/${project.slug}`} className={`featured-row ${areas[project.area].color}`}>
    <span className="feature-index">{project.number}</span>
    <div className="feature-main">
      <span className="feature-category">{project.category}</span>
      <h3>{project.title}</h3>
      {project.shortTitle && <span className="feature-subtitle">{project.shortTitle}</span>}
    </div>
    <p>{project.summary}</p>
    {project.showcaseImage && (
      <div className="feature-mini-thumb">
        <img src={project.showcaseImage} alt={project.title} loading="lazy" />
      </div>
    )}
    <AreaGlyph area={project.area} compact />
    <span className="row-arrow"><ArrowUpRight size={20} /></span>
  </Link>;
}

export function WorkPage() {
  usePageMeta("Work", "Case studies across computer vision, production software, networking and robotics.");
  const [filter, setFilter] = useState<Area | "all">("all");
  const visible = useMemo(() => filter === "all" ? projects : projects.filter((project) => project.area === filter), [filter]);
  return <Layout>
    <main className="page-main work-page">
      <section className="page-hero work-hero" data-scene="systems"><div className="container"><BackLink to="/" children="Home" /><div className="page-hero-grid"><div><SectionLabel number="Work index">Selected systems, not just screenshots</SectionLabel><h1>Work with <em>weight.</em></h1></div><p>Each project is framed as an engineering case study: the problem, architectural approach, real friction overcome, and concrete evidence.</p></div></div></section>
      <section className="work-catalog" data-scene="vision"><div className="container"><div className="filter-row"><span className="filter-label"><Filter size={14} /> FILTER BY AREA</span><div className="filters"><button className={filter === "all" ? "filter active" : "filter"} onClick={() => setFilter("all")}>All work <b>{projects.length}</b></button>{(Object.keys(areas) as Area[]).map((area) => <button key={area} className={filter === area ? `filter active ${areas[area].color}` : `filter ${areas[area].color}`} onClick={() => setFilter(area)}>{areas[area].label.replace("Computer Vision & ", "").replace("Production ", "")} <b>{projects.filter((p) => p.area === area).length}</b></button>)}</div></div><div className="work-grid">{visible.map((project) => <WorkCard key={project.slug} project={project} />)}</div></div></section>
    </main>
  </Layout>;
}

function WorkCard({ project }: { project: Project }) {
  const area = areas[project.area];
  return <Link href={`/work/${project.slug}`} className={`work-card ${area.color}`}>
    <div className="work-card-top"><span>{project.number}</span><span>{project.period}</span></div>
    {project.showcaseImage ? (
      <div className="work-card-thumb">
        <img src={project.showcaseImage} alt={project.title} loading="lazy" />
        <div className="work-card-thumb-overlay" />
      </div>
    ) : (
      <ProjectSchematic area={project.area} />
    )}
    <div className="work-card-body">
      <span className="work-card-category">{project.category}</span>
      <h2>{project.title}</h2>
      {project.shortTitle && <p className="work-card-subtitle">{project.shortTitle}</p>}
      <p className="work-card-summary">{project.summary}</p>
      <div className="work-card-footer"><span>{project.status}</span><ArrowUpRight size={18} /></div>
    </div>
  </Link>;
}

export function CaseStudy() {
  const [, params] = useRoute("/work/:slug");
  const project = getProject(params?.slug);
  usePageMeta(project?.title ?? "Work", project?.summary ?? "Case studies across computer vision, production software, networking and robotics.");
  if (!project) return <NotFound />;

  const area = areas[project.area];
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return <Layout>
    <main className={`page-main case-page ${area.color}`} style={{ "--project-accent": project.accentColor || "var(--color-cyan)" } as React.CSSProperties}>
      <section className="case-hero">
        <div className="container">
          <BackLink />
          <div className="case-hero-grid">
            <div className="case-copy">
              <div className="case-kicker">
                <span>{project.number} / {area.eyebrow}</span>
                <span className="status-pill">{project.status}</span>
              </div>
              <h1>{project.title}</h1>
              {project.shortTitle && <p className="case-subtitle">{project.shortTitle}</p>}
              <p className="case-summary">{project.summary}</p>
              
              <div className="case-tags">
                {project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="case-actions-row">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-action-btn"
                    >
                      {link.type === "github" && <Github size={16} />}
                      {link.type === "play" && (
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                          <path fill="#00c3ff" d="M3.6 2.3C3.3 2.6 3.1 3 3.1 3.6v16.8c0 .6.2 1 .5 1.3l.1.1L13 12.1v-.2L3.6 2.3z"/>
                          <path fill="#00e676" d="M16.2 15.3l-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.1z"/>
                          <path fill="#ff3a44" d="M16.3 15.2L13 11.9 3.6 21.4c.4.4 1 .4 1.6.1l11.1-6.3"/>
                          <path fill="#ffab00" d="M16.3 8.8L5.2 2.5c-.6-.3-1.2-.3-1.6.1L13 12.1l3.3-3.3z"/>
                        </svg>
                      )}
                      <span>{link.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="case-visual">
              {project.showcaseImage && (
                <img
                  src={project.showcaseImage}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                />
              )}
              <ScrollScrubCanvas motif={project.motif ?? project.area} className="case-canvas" />
              <div className="case-visual-overlay">
                <span>{area.label}</span>
                <span>{project.period}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.showcaseImage && (
        <section className="case-showcase-section container">
          <div className="case-showcase-frame">
            <img
              src={project.showcaseImage}
              alt={`${project.title} live interface showcase`}
              className="case-showcase-img"
            />
          </div>
        </section>
      )}

      <section className="case-intro container">
        <p className="case-intro-lead">{project.intro}</p>
        <div className="case-intro-note">
          <MapPin size={16} />
          <span>CASE STUDY / {project.status.toUpperCase()}</span>
        </div>
      </section>

      <section className="case-content">
        <div className="container">
          <div className="case-section problem-section">
            <SectionLabel number="01">The problem</SectionLabel>
            <p>{project.problem}</p>
          </div>

          <div className="case-section architecture-section">
            <div>
              <SectionLabel number="02">Approach / architecture</SectionLabel>
              <h2>A system designed for <em>the constraint that matters.</em></h2>
            </div>
            <ArchitectureRail items={project.architecture} area={project.area} />
          </div>

          <div className="case-section challenge-section">
            <SectionLabel number="03">Where the work got difficult</SectionLabel>
            <div className="challenge-grid">
              {project.challenges.map((challenge, i) => (
                <article key={challenge.title} className="challenge-card">
                  <span>0{i + 1}</span>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.detail}</p>
                </article>
              ))}
            </div>
          </div>

          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="case-section gallery-section">
              <div>
                <SectionLabel number="04">Production interfaces</SectionLabel>
                <h2>Real user interfaces <em>in action.</em></h2>
              </div>
              <div className="case-gallery-grid">
                {project.galleryImages.map((src, i) => (
                  <div key={i} className="case-gallery-item">
                    <img src={src} alt={`${project.title} preview ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="case-section outcome-section">
            <SectionLabel number={project.galleryImages ? "05" : "04"}>What exists now</SectionLabel>
            <div className="outcome-box">
              <Sparkles size={20} />
              <p>{project.outcome}</p>
            </div>
          </div>

          <div className="case-section stack-section">
            <div>
              <SectionLabel number={project.galleryImages ? "06" : "05"}>Working set</SectionLabel>
              <h2>Tools are a means<br />to a durable <em>result.</em></h2>
            </div>
            <div className="stack-cloud">
              {project.stack.map((item, i) => (
                <span key={item} className={`stack-chip chip-${i % 4}`}>{item}</span>
              ))}
            </div>
          </div>

          <div className="case-section evidence-section">
            <SectionLabel number={project.galleryImages ? "07" : "06"}>Evidence & access</SectionLabel>
            <p>{project.evidence}</p>
            {project.links && project.links.length > 0 ? (
              <div className="evidence-links">
                {project.links.map((link) => (
                  <a key={link.href} className="text-action" href={link.href} target="_blank" rel="noopener noreferrer">
                    Open {link.label} <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            ) : (
              <a className="text-action" href="mailto:kaanalperkaraaslan@gmail.com?subject=Portfolio%20case%20study%20request">
                Request context or materials <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="next-case">
        <div className="container">
          <span className="next-label">NEXT CASE STUDY</span>
          <Link href={`/work/${next.slug}`} className="next-link">
            <span>{next.number}</span>
            <h2>{next.title}</h2>
            <MoveUpRight size={32} />
          </Link>
        </div>
      </section>
    </main>
  </Layout>;
}

function ArchitectureRail({ items, area }: { items: string[]; area: Area }) {
  return <div className={`architecture-rail ${areas[area].color}`}>{items.map((item, i) => <div className="architecture-node" key={item}><span>{String(i + 1).padStart(2, "0")}</span><i /><strong>{item}</strong></div>)}</div>;
}

export function AboutPage() {
  usePageMeta("About", "About Kaan Alper Karaaslan: a systems-minded EEE and Computer Engineering double-major.");
  const skills = [
    ["Languages & Core", "C/C++ · Rust · Go · Python · Kotlin · TypeScript"],
    ["Perception & Vision", "SLAM / Visual Odometry · YOLO · DINOv2 · OpenCV · Applied PyTorch"],
    ["Systems & Low-Level", "Reverse Engineering (Capstone / YARA) · DPI Bypass · Linux Trays · Network Protocols (MASQUE / QUIC)"],
    ["Production & Delivery", "Qt 6 / QML · VTK (Medical CAD) · Android (Compose) · PostgreSQL / Supabase · CI/CD"]
  ];
  const timeline = [
    ["2024", "couldbefit", "Shipped an offline-first Android training product from scratch to Google Play."],
    ["2025", "Clonify Labs", "Building clinical desktop CAD software across Qt/QML, VTK and HIPAA-ready PostgreSQL infrastructure."],
    ["2025", "TEKNOFEST Technical Lead", "Leading perception and robotics across aviation AI, industrial autonomous mobile robotics and healthcare challenges."],
    ["2026", "ByteForge", "Architected a high-performance reverse engineering and modding studio in Rust + Tauri."],
    ["2026 → 2027", "AI Grand Prix", "Solo foundation track toward autonomous drone racing competition readiness."]
  ];
  return <Layout><main className="page-main about-page"><section className="page-hero about-hero" data-scene="production"><div className="container"><BackLink to="/" children="Home" /><div className="about-hero-layout"><div><SectionLabel number="About">A generalist by range, a specialist by attention</SectionLabel><h1>Engineer first.<br /><em>Curious always.</em></h1></div><p>I am studying Electrical & Electronics Engineering and Computer Engineering together at Çankaya University, choosing projects that force disparate technical layers—hardware, models, native desktop, and network protocols—to communicate smoothly.</p></div></div></section><section className="bio-section" data-scene="ink"><div className="container bio-grid"><div className="profile-block"><div className="profile-monogram">Kaan Alper Karaaslan</div><span>ÇANKAYA UNIVERSITY<br />2024 — 2029</span></div><div><SectionLabel number="01">A working biography</SectionLabel><p className="bio-lead">The challenges I seek are positioned across technical boundaries: a 3D medical tool that demands strict patient isolation, an aerial perception loop fusing odometry and detection under vibration, or a local-first mobile app that respects user privacy without server dependencies.</p><p className="bio-copy">That multi-disciplinary breadth is intentional. It allows for rigorous decisions at key system interfaces. Outside engineering, I am studying Japanese with an eye toward graduate study and research in Japan.</p></div></div></section><section className="skills-section" data-scene="systems"><div className="container"><SectionLabel number="02">Capability map</SectionLabel><div className="skills-grid">{skills.map(([title, detail], index) => <article key={title} className="skill-row"><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section><section className="timeline-section" data-scene="vision"><div className="container"><div className="timeline-intro"><SectionLabel number="03">A short timeline</SectionLabel><h2>Proof comes from<br /><em>shipping and showing up.</em></h2></div><div className="timeline-list">{timeline.map(([year, title, text]) => <article key={year + title}><span>{year}</span><div><h3>{title}</h3><p>{text}</p></div><ChevronRight size={18} /></article>)}</div></div></section></main></Layout>;
}

export function ContactPage() {
  usePageMeta("Contact", "Contact Kaan Alper Karaaslan for engineering opportunities and technical collaboration.");
  return <Layout><main className="page-main contact-page" data-scene="mobile"><section className="contact-page-main"><div className="container"><BackLink to="/" children="Home" /><div className="contact-layout"><div><SectionLabel number="Contact">The next useful conversation</SectionLabel><h1>Let’s make<br />something <em>hold.</em></h1><p>For roles, research collaboration, technical projects or consulting, email is the fastest and most direct path.</p></div><div className="contact-card"><span className="contact-card-mark">Kaan Alper Karaaslan</span><a href="mailto:kaanalperkaraaslan@gmail.com" className="contact-address">kaanalperkaraaslan<br />@gmail.com <ArrowUpRight size={23} /></a><div className="contact-divider" /><ContactLinks /><p className="contact-fineprint">CV, engineering reports and selected source code are shared where project constraints permit.</p></div></div></div></section></main></Layout>;
}

export function NotFound() { usePageMeta("Page not found", "This portfolio page does not exist."); return <Layout><main className="not-found"><div><span>404</span><h1>This route left<br /><em>the map.</em></h1><Link href="/" className="button button-primary">Return home <ArrowRight size={17} /></Link></div></main></Layout>; }
