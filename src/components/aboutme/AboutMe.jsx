import { motion, useReducedMotion } from "framer-motion";
import "./AboutMe.css";

// ================================================================
//  CHIFFRES CLÉS (la grille sous le texte de présentation)
// ================================================================
const CHIFFRES = [
  { value: "2nd", label: "year at Epitech" },
  { value: "AI & Data", label: "specialization" },
  { value: "7", label: "projects built" },
  { value: "2026", label: "open to an internship" },
];

// ================================================================
//  TON PARCOURS — du plus ancien au plus récent
//  "lecon" : ce que cette période t'a apporté
// ================================================================
const PARCOURS = [
  {
    id: "college",
    ecole: "Collège Jean Paul II, Compiègne",
    periode: "2018 – 2022",
    description:
      "A private middle school where I spent four years building my academic foundations.",
    lecon:
      "Here I built the core foundations of my work ethic: the rigor, discipline and organization needed to approach any task with a structured mindset.",
  },
  {
    id: "lycee",
    ecole: "Lycée Pierre d'Ailly, Compiègne",
    periode: "2022 – 2025",
    description:
      "A public high school where I focused on sciences and decided to pursue a career in technology.",
    lecon:
      "A turning point for my autonomy. My Life and Earth Sciences major sharpened my analytical approach, while I intensely perfected my English to prepare for the tech industry.",
  },
  {
    id: "epitech",
    ecole: "Epitech, Bachelor",
    periode: "2025 – Now",
    enCours: true,
    description:
      "A leading computer science school built on project-based learning. I'm now in my 2nd year, specializing in AI & Data.",
    lecon:
      "Driven by a deep passion for computer science and emerging technologies, I constantly turn my curiosity into concrete software skills.",
  },
];

function scrollToId(event, id) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

function Etape({ etape }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      className={`ab-step${etape.enCours ? " is-current" : ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span className="ab-dot" aria-hidden="true" />
      <p className="ab-period">{etape.periode}</p>
      <h4 className="ab-school">{etape.ecole}</h4>
      <p className="ab-desc">{etape.description}</p>
      <p className="ab-lesson">{etape.lecon}</p>
    </motion.li>
  );
}

// ================================================================
//  SECTION
// ================================================================
export default function AboutMe() {
  return (
    <section id="about" className="ab" aria-labelledby="ab-title">
      <header className="ab-header">
        <h2 id="ab-title" className="ab-title">
          About <span>Me</span>
        </h2>
        <p className="ab-lead">Who I am, and the path that brought me to computer science.</p>
      </header>

      <div className="ab-intro">
        <div className="ab-intro-text">
          <p className="ab-hello">Hi, I'm Jarod.</p>
          <p className="ab-text">
            I'm a Computer Science student at <strong>Epitech</strong>, now in my 2nd year and
            specializing in <strong>AI &amp; Data</strong>. I love turning ideas into working
            software, and I thrive in collaborative, project-driven environments.
          </p>
          <p className="ab-text">
            From predicting train delays with machine learning to designing web apps with my team, I
            learn best by building things that solve real problems.
          </p>

          <div className="ab-actions">
            <a href="#projects" className="ab-btn ab-btn--primary" onClick={(e) => scrollToId(e, "projects")}>
              See my projects
            </a>
            <a href="#contact" className="ab-btn" onClick={(e) => scrollToId(e, "contact")}>
              Get in touch
            </a>
          </div>
        </div>

        <dl className="ab-stats">
          {CHIFFRES.map((chiffre) => (
            <div key={chiffre.label} className="ab-stat">
              <dt className="ab-stat-label">{chiffre.label}</dt>
              <dd className="ab-stat-value">{chiffre.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- Parcours : frise horizontale sur desktop ---------- */}
      <div className="ab-journey">
        <h3 className="ab-journey-title">My journey</h3>
        <ol className="ab-steps">
          {PARCOURS.map((etape) => (
            <Etape key={etape.id} etape={etape} />
          ))}
        </ol>
      </div>
    </section>
  );
}
