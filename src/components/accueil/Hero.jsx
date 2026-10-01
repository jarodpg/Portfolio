import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import "./Hero.css";

// ================================================================
//  TES INFOS
// ================================================================
const EMAIL = "jarodputman@gmail.com";
const CV = "for all Jarod Putman-Grain.pdf";

// Affiché après "Computer Science student,"
const ROLE = "AI & Data enthusiast";

const RESEAUX = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/jarod-putman-grain-3b6589387/" },
  { id: "github", label: "GitHub", href: "https://github.com/jarodpg" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/jaroodd_/" },
];

// Les pastilles qui flottent autour de la photo
const PASTILLES = [
  { id: "school", texte: "Epitech · 2nd year", position: "top" },
  { id: "spe", texte: "AI & Data", position: "middle" },
  { id: "stack", texte: "Python · Scikit-learn", position: "bottom" },
];

// ================================================================
//  ICÔNES (SVG inline, aucune dépendance)
// ================================================================
const ICONS = {
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  copy: (
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

// ================================================================
//  ANIMATIONS
// ================================================================
const EASE = [0.22, 1, 0.36, 1];

// Le texte apparaît ligne par ligne
const cascade = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const monte = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Le prénom lettre par lettre
const lettres = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const lettre = {
  hidden: { opacity: 0, y: "0.6em", rotate: 8 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } },
};

function scrollToId(event, id) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

// ================================================================
//  PHOTO (inclinaison 3D qui suit la souris)
// ================================================================
function Portrait() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });

  function onMove(event) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="hr-visual"
      initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
    >
      <div className="hr-orbit hr-orbit--1" aria-hidden="true" />
      <div className="hr-orbit hr-orbit--2" aria-hidden="true" />
      <div className="hr-glow" aria-hidden="true" />

      <motion.div
        ref={ref}
        className="hr-frame"
        style={{ rotateX, rotateY }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <img
          src="moi.webp"
          alt="Portrait of Jarod"
          className="hr-photo"
          width="720"
          height="953"
          fetchPriority="high"
        />
        <div className="hr-shine" aria-hidden="true" />
      </motion.div>

      {PASTILLES.map((pastille, i) => (
        <motion.span
          key={pastille.id}
          className={`hr-chip hr-chip--${pastille.position}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1 + i * 0.18 }}
        >
          <span className="hr-chip-float" style={{ animationDelay: `${i * -1.3}s` }}>
            {pastille.texte}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
}

// ================================================================
//  SECTION
// ================================================================
export default function Hero() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section id="top" className="hr" aria-labelledby="hr-title">
      <motion.div className="hr-content" variants={cascade} initial="hidden" animate="show">
        <motion.p className="hr-status" variants={monte}>
          <span className="hr-pulse" aria-hidden="true" />
          Open to an internship · 2026–27
        </motion.p>

        <h1 id="hr-title" className="hr-title">
          <motion.span className="hr-hello" variants={monte}>
            Hi, I'm
          </motion.span>
          <span className="hr-sr">Jarod</span>
          <motion.span className="hr-name" variants={lettres} aria-hidden="true">
            {"Jarod".split("").map((l, i) => (
              <motion.span key={i} className="hr-letter" variants={lettre}>
                {l}
              </motion.span>
            ))}
            <motion.span className="hr-letter hr-dot" variants={lettre}>
              .
            </motion.span>
          </motion.span>
        </h1>

        <motion.p className="hr-role" variants={monte}>
          Computer Science student,{" "}
          <span className="hr-role-word">{ROLE}</span>
        </motion.p>

        <motion.p className="hr-intro" variants={monte}>
          2nd-year Bachelor's student at <strong>Epitech</strong>, specializing in{" "}
          <strong>AI &amp; Data</strong>. I love leading team projects and turning ideas into
          software that solves real problems.
        </motion.p>

        <motion.div className="hr-actions" variants={monte}>
          <a href={CV} download className="hr-btn hr-btn--primary">
            <Icon name="download" />
            Download CV
          </a>
          <a href="#projects" className="hr-btn" onClick={(e) => scrollToId(e, "projects")}>
            See my projects
            <span className="hr-btn-arrow">
              <Icon name="arrow" />
            </span>
          </a>
        </motion.div>

        <motion.div className="hr-meta" variants={monte}>
          <ul className="hr-socials" aria-label="Social networks">
            {RESEAUX.map((reseau) => (
              <li key={reseau.id}>
                <a
                  href={reseau.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hr-social"
                  aria-label={`${reseau.label} (opens in a new tab)`}
                  title={reseau.label}
                >
                  <Icon name={reseau.id} size={20} />
                </a>
              </li>
            ))}
          </ul>

          <button type="button" className="hr-email" onClick={copyEmail}>
            <span>{EMAIL}</span>
            <span className={`hr-email-icon${copied ? " is-copied" : ""}`}>
              <Icon name={copied ? "check" : "copy"} size={16} />
            </span>
            <span className="hr-email-tip" role="status">
              {copied ? "Copied!" : ""}
            </span>
          </button>
        </motion.div>
      </motion.div>

      <Portrait />

      <motion.a
        href="#about"
        className="hr-scroll"
        onClick={(e) => scrollToId(e, "about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="hr-mouse" aria-hidden="true">
          <span className="hr-wheel" />
        </span>
        <span className="hr-scroll-text">Scroll</span>
      </motion.a>
    </section>
  );
}
