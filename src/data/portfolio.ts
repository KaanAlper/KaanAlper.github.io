export type Area = "vision" | "production" | "systems" | "mobile";

export type ProjectLink = {
  label: string;
  href: string;
  type?: "github" | "play" | "demo" | "report" | "mail";
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle?: string;
  category: string;
  area: Area;
  period: string;
  status: string;
  summary: string;
  intro: string;
  problem: string;
  architecture: string[];
  challenges: { title: string; detail: string }[];
  outcome: string;
  stack: string[];
  evidence: string;
  featured?: boolean;
  future?: boolean;
  heroLayout?: "split-right" | "split-left" | "full-bleed" | "editorial" | "compact";
  motif?: "point-cloud" | "cad" | "decision-tree" | "network" | "mobile";
  links?: ProjectLink[];
  showcaseImage?: string;
  galleryImages?: string[];
  accentColor?: string;
};

export const areas: Record<Area, { label: string; eyebrow: string; description: string; color: string }> = {
  vision: {
    label: "Computer Vision & Robotics",
    eyebrow: "01 / Perception",
    description: "Algorithms that turn camera input, sensor signals and motion into spatial decisions.",
    color: "cyan",
  },
  production: {
    label: "Production Software",
    eyebrow: "02 / Delivery",
    description: "Reliable interfaces and secure infrastructure for software that reaches real users.",
    color: "coral",
  },
  systems: {
    label: "Systems & Networking",
    eyebrow: "03 / Resilience",
    description: "Tools close to the operating system, network stack and the environments that depend on them.",
    color: "gold",
  },
  mobile: {
    label: "Mobile & Applied AI",
    eyebrow: "04 / Product",
    description: "Thoughtful on-device experiences where privacy, speed and product constraints meet.",
    color: "violet",
  },
};

export const projects: Project[] = [
  {
    slug: "clonify",
    number: "01",
    title: "Clonify",
    category: "Production software · Medical CAD",
    area: "production",
    period: "2025 — present",
    status: "Active production",
    summary: "Desktop CAD software for cranial orthoses and prosthetic design, built with Qt/QML, VTK, and secure medical data infrastructure.",
    intro: "At Clonify Labs, the challenge is bringing 3D clinical planning tools to desktop workstations with the reliability medical workflows require.",
    problem: "Orthopedic and prosthetic practitioners need precise mesh manipulation and reproducible workflows on desktop machines, while patient records and design iterations require strict isolation and auditability.",
    architecture: ["Qt 6 / QML client", "VTK 3D geometry engine", "Self-hosted Supabase", "PostgreSQL RLS policies", "Cross-platform CI/CD"],
    challenges: [
      { title: "Stability on real Linux environments", detail: "Investigated an Arch Linux-specific QTimer connection accumulation issue around NavigationCubeHandler to prevent an intermittent crash path." },
      { title: "3D interaction boundaries", detail: "Separated VTK actor signals and UI state so that 3D scene interactions stay understandable and testable." },
      { title: "Security as a product constraint", detail: "Worked with JWT rotation and row-level security policies to keep patient data access scoped to the right workflow." },
    ],
    outcome: "Active medical software product accepted into the TÜSİAD Dönüşümü Hızlandır program and presented at Fark Labs Demoday.",
    stack: ["C++", "Qt 6", "QML", "VTK", "Supabase", "PostgreSQL", "GitHub Actions"],
    evidence: "Selected implementation details and product visuals are shared selectively because the work touches clinical workflows and sensitive data.",
    featured: true,
    heroLayout: "split-left",
    motif: "cad",
    accentColor: "#4ed4d3",
    showcaseImage: "/work/clonify/showcase.webp",
    galleryImages: [
      "/work/clonify/import.webp",
      "/work/clonify/banner.webp"
    ],
  },
  {
    slug: "teknofest-aviation",
    number: "02",
    title: "Autonomous Flight Perception",
    shortTitle: "DATABEES / ANKARA 29 KM",
    category: "Computer vision · Aerial systems",
    area: "vision",
    period: "2025 — present",
    status: "Technical lead",
    summary: "Perception and visual navigation for an autonomous UAV, combining object detection, visual odometry and feature matching into a cohesive flight loop.",
    intro: "Serving as sole technical lead, this work took an autonomous flight perception stack from architecture through jury defense in a demanding competition setting.",
    problem: "Real-time flight decisions cannot rely on GPS alone or a single visual mode. The vehicle needs robust object classification alongside spatial odometry that survives camera vibration and changing light.",
    architecture: ["YOLOv12 perception", "DROID-SLAM odometry", "DINOv2 feature matching", "Lucas-Kanade optical flow", "PyQt6 / OpenGL visualizer"],
    challenges: [
      { title: "Multiple signals, one decision loop", detail: "Connected detection, visual odometry, feature matching and flow signals into a reviewable perception pipeline rather than a collection of demos." },
      { title: "Report iteration under scrutiny", detail: "Handled OTR revisions and the jury appeal process while continuing the technical work." },
      { title: "Deployment context", detail: "Prepared the model workflow for deployment on Huawei ModelArts, with practical attention to the target platform." },
    ],
    outcome: "A documented flight-perception pipeline and successful progression through competitive technical milestones, leading to an ICT Competition Innovation entry.",
    stack: ["Python", "PyTorch", "YOLOv12", "DROID-SLAM", "DINOv2", "PyQt6", "OpenGL"],
    evidence: "Technical reports, point-cloud reviews and selected visual outputs are being consolidated as the competition work progresses.",
    featured: true,
    heroLayout: "full-bleed",
    motif: "point-cloud",
    accentColor: "#efbd63",
    showcaseImage: "/work/teknofest-aviation/showcase.webp",
  },
  {
    slug: "couldbefit",
    number: "03",
    title: "couldbefit",
    shortTitle: "Offline Training & Nutrition Journal",
    category: "Mobile · On-device intelligence",
    area: "mobile",
    period: "2024 — present",
    status: "Published on Google Play",
    summary: "An offline-first Android training journal with meals, workouts and a private on-device AI advisor. No account, no cloud, zero surveillance.",
    intro: "couldbefit started from a simple frustration: fitness apps that demand logins, internet access and subscription payments before logging a single set.",
    problem: "Users want to log workouts and track nutrition quickly in environments where connectivity is poor (basement gyms) or privacy is valued, without leaking health data to third-party ad networks.",
    architecture: ["Jetpack Compose UI", "Kotlin Coroutines & Flow", "Room local database", "On-device LLM engine", "ACSM-MET metabolic calculator"],
    challenges: [
      { title: "Offline-first from the model up", detail: "Kept core nutrition and workout flows fast and fully functional without an account or dependency on remote cloud infrastructure." },
      { title: "Play Store compliance as engineering", detail: "Navigated foreground-service policies and Google Play Data Safety requirements to deliver a transparent, compliant release." },
      { title: "Zero cloud overhead", detail: "Implemented local mathematical models for metabolic tracking and on-device inference instead of maintaining a costly server bill." },
    ],
    outcome: "A published, rated production app on Google Play with a 100% offline footprint and positive user feedback.",
    stack: ["Kotlin", "Jetpack Compose", "Room", "On-device LLM", "Coroutines", "Material 3"],
    evidence: "The released Android product provides the clearest evidence: a complete user-facing system shipped from concept into public distribution.",
    featured: true,
    heroLayout: "editorial",
    motif: "mobile",
    links: [
      { label: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.kaan.couldbefit", type: "play" }
    ],
    showcaseImage: "/work/couldbefit/promo-workout.webp",
    galleryImages: [
      "/work/couldbefit/promo-meals.webp",
      "/work/couldbefit/promo-advisor.webp"
    ],
    accentColor: "#ccff33",
  },
  {
    slug: "connectsync",
    number: "03.5",
    title: "ConnectSync",
    shortTitle: "P2P Drive Sync",
    category: "Desktop · P2P Synchronization",
    area: "systems",
    period: "2026 — present",
    status: "Published Open Source",
    summary: "A peer-to-peer, end-to-end encrypted folder synchronization tool powered by Google Drive.",
    intro: "ConnectSync uses Google Drive as a dumb, encrypted transport layer to sync folders directly between devices using AES-256 without needing a central server.",
    problem: "Most sync tools require you to create an account, pay for a subscription, or trust a third-party server with your data. ConnectSync provides a private alternative.",
    architecture: ["Rust core", "Slint UI", "AES-GCM-256 encryption", "Tokio async", "Google Drive API"],
    challenges: [
      { title: "Peer-to-Peer Magic", detail: "Implemented out-of-band key sharing. The generated sync code grants folder access and provides the AES decryption key simultaneously." },
      { title: "Native UI Threading", detail: "Ensured completely responsive UI during heavy file sync operations by properly bridging Tokio async tasks with Slint's event loop." }
    ],
    outcome: "A native, fast, and secure cross-platform synchronization tool.",
    stack: ["Rust", "Slint", "Tokio", "Reqwest", "Google OAuth"],
    evidence: "Public source code and AES-GCM-256 implementation on GitHub.",
    featured: true,
    heroLayout: "split-right",
    motif: "network",
    links: [
      { label: "Download & Details", href: "https://kaanalper.github.io/work/connectsync", type: "github" }
    ],
    showcaseImage: "/work/connectsync/promo-workout.webp", // Will act as fallback if not exist
    accentColor: "#89b4fa",
  },
  {
    slug: "byteforge",
    number: "04",
    title: "ByteForge",
    shortTitle: "Reverse Engineering & Modding Studio",
    category: "Systems · Binary Tooling & Disassembly",
    area: "systems",
    period: "2026 — present",
    status: "Active open-source",
    summary: "A high-performance reverse engineering and modding studio for APK/IL2CPP patching, native disassembly, Yara scanning and dynamic memory editing.",
    intro: "ByteForge combines static binary analysis with runtime memory modification into a single, cohesive desktop environment built with Rust and Tauri.",
    problem: "Engineers and security researchers often jump between fragmented tools: command-line decompilers, isolated memory searchers, and disparate patch utilities. ByteForge unifies them in a fast, low-latency UI.",
    architecture: ["Rust core engine", "Tauri v2 desktop shell", "Capstone disassembly", "YARA pattern matching", "Dynamic memory inspector"],
    challenges: [
      { title: "Cross-platform memory ergonomics", detail: "Abstracted OS-specific process memory APIs (VirtualQuery/ReadProcessMemory on Windows, process_vm_readv/ptrace on Linux) behind safe Rust traits." },
      { title: "IL2CPP metadata parsing", detail: "Extracted and mapped metadata headers and string tables directly from raw ELF/PE binaries to reconstruct obfuscated method signatures." },
      { title: "Real-time disassembler responsiveness", detail: "Offloaded heavy instruction decoding and symbol lookup to background worker threads, keeping the Tauri UI responsive even on large executables." },
    ],
    outcome: "A fast, multi-platform binary workbench that demonstrates high-performance systems programming and deep OS-level familiarity.",
    stack: ["Rust", "Tauri", "Capstone", "YARA", "TypeScript", "Linux / Windows / macOS"],
    evidence: "Public source code and architectural documentation on GitHub.",
    featured: true,
    heroLayout: "compact",
    motif: "network",
    links: [
      { label: "GitHub Repository", href: "https://github.com/KaanAlper/ByteForge", type: "github" }
    ],
    accentColor: "#ff6f61",
  },
  {
    slug: "asenaplug",
    number: "05",
    title: "AsenaPlug",
    shortTitle: "MASQUE / HTTP-3 Censorship Bypass",
    category: "Networking · Censorship resilience",
    area: "systems",
    period: "2025 — present",
    status: "Active open-source",
    summary: "HTTPS-disguised tunneling and selective DPI/DNS-censorship bypass via Cloudflare MASQUE, wrapped in a lightweight cross-platform system-tray app.",
    intro: "AsenaPlug is built to keep connectivity dependable in hostile network environments, avoiding the fragility of traditional VPN blocks.",
    problem: "Conventional VPNs are easy to fingerprint and throttle at the ISP level. The goal was selective, resilient circumvention that disguises tunnel traffic as ordinary HTTPS.",
    architecture: ["MASQUE protocol client", "HTTP/3 transport over QUIC", "Selective SNI routing", "System-tray interface", "PowerShell & Bash automation"],
    challenges: [
      { title: "Selective rather than blanket routing", detail: "Built the approach around SNI-based decisions instead of changing DNS globally or forcing all traffic through a single bottleneck." },
      { title: "Platform translation", detail: "Ported a Linux-first workflow to Windows by translating Bash automation into native PowerShell routines." },
      { title: "Small surface, serious protocol", detail: "Balanced a lightweight tray experience with the complex moving parts required by MASQUE and HTTP/3." },
    ],
    outcome: "An open-source utility spanning Windows, Linux and Android via tray-oriented interfaces with proven resilience in real-world filtering tests.",
    stack: ["Go", "MASQUE", "HTTP/3", "Kotlin", "PowerShell", "Linux", "Windows"],
    evidence: "Public source code and cross-platform builds make the systems decisions inspectable outside a presentation setting.",
    featured: true,
    heroLayout: "compact",
    motif: "network",
    links: [
      { label: "GitHub Repository", href: "https://github.com/KaanAlper/AsenaPlug", type: "github" }
    ],
    showcaseImage: "/work/asenaplug/shot1.webp",
    galleryImages: [
      "/work/asenaplug/shot2.webp",
      "/work/asenaplug/shot3.webp",
      "/work/asenaplug/shot4.webp"
    ],
    accentColor: "#f2b035",
  },
  {
    slug: "teknofest-robotics",
    number: "06",
    title: "Industrial Mobile Robotics",
    shortTitle: "TEKNOFEST Sanayide Robotik Uygulamalar",
    category: "Robotics · Industrial integration",
    area: "vision",
    period: "2025 — 2026",
    status: "Team project",
    summary: "Autonomous forklift mobile robot with precise alignment and PLC communication for industrial automation challenges.",
    intro: "A collaborative robotics effort combining ROS 2 navigation, an event-driven architecture and Modbus TCP industrial control.",
    problem: "An autonomous industrial mobile robot must do more than navigate a global map: it has to dock with millimeter-level accuracy and communicate reliably with industrial PLCs.",
    architecture: ["ROS 2 nodes", "Nav2 navigation stack", "Asyncio event bus", "pymodbus client", "PySide6 / QML control GUI"],
    challenges: [
      { title: "Last-meter precision", detail: "Focused the technical effort on accurate robot alignment and sensor fusion after broader navigation has reached the target waypoint." },
      { title: "Robot-to-PLC boundary", detail: "Used Modbus TCP to make the interface to industrial machinery explicit, deterministic and dependable." },
      { title: "Event-driven system decoupling", detail: "Implemented Domain-Driven Design (DDD) with an asyncio event bus to keep UI, navigation and low-level actuators decoupled." },
    ],
    outcome: "A modular, competitive autonomous robotics platform capable of autonomous pallet retrieval and warehouse operations.",
    stack: ["ROS 2", "Nav2", "Python", "pymodbus", "Modbus TCP", "PySide6", "QML"],
    evidence: "System behavior is documented through team deliverables and public repository.",
    links: [
      { label: "GitHub Repository", href: "https://github.com/KaanAlper/teknofest-2026-sruy", type: "github" }
    ],
    heroLayout: "split-left",
    motif: "point-cloud",
    accentColor: "#4ed4d3",
  },
  {
    slug: "teknofest-healthcare",
    number: "07",
    title: "Variant Classification",
    shortTitle: "Lo Siento Medicon",
    category: "Applied ML · Healthcare",
    area: "vision",
    period: "2025",
    status: "Team project",
    summary: "An ensemble learning approach to missense-variant pathogenicity classification for computational biology.",
    intro: "With Lo Siento Medicon, the work turns a difficult biomedical classification question into an interpretable applied machine-learning experiment.",
    problem: "Missense variants can alter a protein sequence in ways that are difficult to classify. The challenge is to produce useful predictive signal while respecting the difference between model output and clinical conclusion.",
    architecture: ["Variant feature inputs", "LightGBM model", "XGBoost model", "Ensemble scoring", "Evaluation workflow"],
    challenges: [
      { title: "Sensitive problem framing", detail: "Kept the work positioned as computational decision support rather than a substitute for clinical judgment." },
      { title: "Model diversity", detail: "Used complementary gradient-boosting approaches to test whether a combined signal offers a stronger baseline." },
      { title: "Clear communication", detail: "Worked to explain a biologically complex classification task in an accessible technical narrative." },
    ],
    outcome: "An applied ML foundation for a TEKNOFEST healthcare challenge and a disciplined entry point into computational genomics.",
    stack: ["Python", "LightGBM", "XGBoost", "Machine Learning", "Pandas"],
    evidence: "The method is presented as a competition research prototype, with claims deliberately scoped to the available evaluation.",
    heroLayout: "full-bleed",
    motif: "decision-tree",
    accentColor: "#ab8eff",
  },
  {
    slug: "linux-systems",
    number: "08",
    title: "Linux Systems Atelier",
    shortTitle: "Dotfiles, rice & tray apps",
    category: "Systems · Personal tooling",
    area: "systems",
    period: "Ongoing",
    status: "Living system",
    summary: "A personal Linux environment where interface craft, scripting, Hyprland workflows and low-level system trays meet.",
    intro: "A continuous laboratory for making an operating environment more legible, efficient, minimal and personally owned.",
    problem: "Default desktop environments rarely reflect how an engineer actually works. The goal is to tune both the window management system and the small utilities that support the daily workflow.",
    architecture: ["Hyprland Wayland compositor", "Custom dotfiles", "Bluetooth tray changer (bt-tray-win)", "Waydroid integration (hypr-droid)", "Shell automation"],
    challenges: [
      { title: "Visual density without noise", detail: "Balanced a distinct personal visual language with a desktop that remains quick to scan and practical to operate." },
      { title: "Configuration as code", detail: "Kept repeatable environment choices expressed in versionable configuration rather than one-off tweaks." },
      { title: "Small tools, real leverage", detail: "Created targeted utilities (like A2DP/HFP profile switchers and DPI tools) to eliminate daily system friction." },
    ],
    outcome: "A unified, repeatable operating environment and a continuous testbed for low-level automation tools.",
    stack: ["Linux", "Hyprland", "Shell / Bash", "Rust", "Python", "Wayland"],
    evidence: "Public dotfiles and utilities available across KaanAlper GitHub repositories.",
    heroLayout: "editorial",
    motif: "network",
    accentColor: "#efbd63",
  },
  {
    slug: "ai-grand-prix",
    number: "09",
    title: "AI Grand Prix",
    category: "Autonomy · Long-horizon build",
    area: "vision",
    period: "2026 — 2027 target",
    status: "Building in public",
    summary: "A zero-to-one solo preparation track toward the 2027 autonomous-drone competition season.",
    intro: "A forward-looking entry: an honest record of an ambitious autonomy target before there are results to overstate.",
    problem: "Autonomous drone racing demands an uncompromising integration of perception, planning, control and simulation.",
    architecture: ["Perception research", "Simulation loop", "Control experiments", "Flight platform", "Competition readiness"],
    challenges: [
      { title: "Start with an executable scope", detail: "Break a multi-disciplinary goal into testable technical milestones rather than treating it as a single distant project." },
      { title: "Build without borrowed certainty", detail: "Approach the work as a solo foundation phase, validating assumptions as each subsystem becomes real." },
      { title: "Document the learning curve", detail: "Use this page to distinguish goals, prototypes and validated outcomes with unusual clarity." },
    ],
    outcome: "An active roadmap and test sequence progressing from simulated flight to real-world edge execution.",
    stack: ["Autonomy", "Computer Vision", "Robotics", "Simulation", "Flight Systems"],
    evidence: "This case study evolves from research log to technical record as work is validated.",
    future: true,
    heroLayout: "compact",
    motif: "point-cloud",
    accentColor: "#4ed4d3",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
