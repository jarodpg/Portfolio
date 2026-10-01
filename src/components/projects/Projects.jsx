import { useState } from "react";
import "./Projects.css";

// ================================================================
//  CATÉGORIES ET ANNÉES (les filtres affichés au-dessus des cartes)
// ================================================================
const CATEGORIES = [
  { id: "ai-data", label: "AI & Data" },
  { id: "web", label: "Web" },
  { id: "design", label: "Design" },
];

const ANNEES = [
  { id: 1, label: "1st year" },
  { id: 2, label: "2nd year" },
  { id: 3, label: "3rd year" },
];

// ================================================================
//  TES PROJETS — dans l'ordre d'affichage
//  "categories" : un ou plusieurs ids de CATEGORIES
//  "year"       : année d'Epitech (1, 2 ou 3)
//  "badge"      : optionnel (ex : une récompense)
// ================================================================
const PROJETS = [
  {
    id: "tardis",
    categories: ["ai-data"],
    year: 1,
    title: "Train Delay IA",
    description:
      "Web app built with Streamlit using a Scikit-learn model to predict train delays from CSV data.",
    imageSrc: "tardis.webp",
    imageAlt: "Screenshot of the Train Delay IA app",
    skills: ["Python", "Sklearn", "Streamlit"],
    repoLink: "https://github.com/jarodpg/Tardis-Train-Delay-IA",
  },
  {
    id: "cvrie",
    categories: ["ai-data"],
    year: 2,
    title: "Dr CVRIE",
    description:
      "Medical imaging assistant: pneumonia detection on chest X-rays (supervised) and triage of patient testimonials by clustering (unsupervised).",
    imageSrc: "cvrie.webp",
    imageAlt: "Cover of the Dr CVRIE project",
    skills: ["Python", "Sklearn", "Pandas", "Jupyter"],
    repoLink: "https://github.com/jarodpg/CVRIE-IA-Medical-Assistant",
  },
  {
    id: "techyourjob",
    categories: ["web", "ai-data"],
    year: 1,
    title: "Tech Your Job",
    description:
      "Tech job aggregator with automated scraping, AI-based job recommendations and real-time applications, built as containerized microservices.",
    imageSrc: "techyourjob.webp",
    imageAlt: "Cover of the Tech Your Job app",
    skills: ["Next.js", "TypeScript", "FastAPI", "Docker"],
    repoLink: "https://github.com/jarodpg/Tech-Your-Job",
  },
  {
    id: "nextbuy",
    categories: ["ai-data"],
    year: 1,
    title: "NextBuy",
    description:
      "Exploratory data analysis and predictive models on millions of grocery orders to turn raw data into business insights.",
    imageSrc: "nextbuy.webp",
    imageAlt: "Cover of the NextBuy project",
    skills: ["Python", "Pandas", "Sklearn", "LightGBM"],
    repoLink: "https://github.com/jarodpg/NextBuy",
  },
  {
    id: "yowl",
    categories: ["web", "design"],
    year: 1,
    title: "YOWL",
    description:
      "Web app providing personalized advice on fitness and personal development, designed to meet user needs.",
    imageSrc: "yowl.webp",
    imageAlt: "Screenshot of the YOWL app",
    skills: ["Figma", "Css", "Docker", "React"],
    repoLink: "https://github.com/jarodpg/YOWL",
  },
  {
    id: "ecoboard",
    categories: ["web", "design"],
    year: 1,
    title: "Hackathon / EcoBoard",
    description:
      "MVP built during a class hackathon for Les Shifters, collecting and displaying ecological data automatically.",
    imageSrc: "hackathon.webp",
    imageAlt: "Screenshot of the EcoBoard dashboard",
    skills: ["Figma", "Css", "React", "Product Design"],
    repoLink: "https://github.com/jarodpg/Hackaton-EcoBoard",
  },
  {
    id: "etodo",
    categories: ["web"],
    year: 1,
    title: "E-todo Web App",
    description:
      "Full-stack todo app with authentication, containerized with Docker: a front-end, a back-end API and a database.",
    imageSrc: "etodo.webp",
    imageAlt: "Screenshot of the E-todo app",
    skills: ["BackEnd", "TailWind", "Docker", "React"],
    repoLink: "https://github.com/jarodpg/etodo",
  },
];

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ProjectCard({ projet }) {
  return (
    <li className="pj-card">
      {/* L'image mène aussi au repo, mais hors du parcours clavier (le bouton suffit) */}
      <a
        href={projet.repoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="pj-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={projet.imageSrc} alt="" width="1856" height="1083" loading="lazy" />
        {projet.badge && <span className="pj-badge">{projet.badge}</span>}
      </a>

      <div className="pj-body">
        <p className="pj-meta">
          <span className="pj-year">{ANNEES.find((a) => a.id === projet.year)?.label}</span>
          {projet.categories.map((id) => (
            <span key={id} className="pj-cat">
              {CATEGORIES.find((c) => c.id === id)?.label}
            </span>
          ))}
        </p>
        <h3 className="pj-name">{projet.title}</h3>
        <p className="pj-text">{projet.description}</p>

        <ul className="pj-skills" aria-label="Technologies">
          {projet.skills.map((skill) => (
            <li key={skill} className="pj-skill">
              {skill}
            </li>
          ))}
        </ul>

        <a
          href={projet.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="pj-link"
        >
          <GithubIcon />
          View on GitHub
          <span className="pj-sr"> ({projet.title}, opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}

function matches(projet, categorie, annee) {
  return (
    (categorie === "all" || projet.categories.includes(categorie)) &&
    (annee === "all" || projet.year === annee)
  );
}

// Une rangée de boutons : "All" + une option par valeur, avec le nombre de projets
function FilterGroup({ label, options, value, onChange, count }) {
  return (
    <div className="pj-filter" role="group" aria-label={label}>
      <span className="pj-filter-label" aria-hidden="true">
        {label}
      </span>
      <div className="pj-chips">
        {[{ id: "all", label: "All" }, ...options].map((option) => {
          const n = count(option.id);
          return (
            <button
              key={option.id}
              type="button"
              className="pj-chip"
              aria-pressed={value === option.id}
              onClick={() => onChange(option.id)}
            >
              {option.label}
              <span className="pj-chip-count">{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ================================================================
//  SECTION
// ================================================================
export default function Projects() {
  const [categorie, setCategorie] = useState("all");
  const [annee, setAnnee] = useState("all");

  const visibles = PROJETS.filter((projet) => matches(projet, categorie, annee));
  const filtre = categorie !== "all" || annee !== "all";

  // Chaque compteur tient compte du filtre de l'autre groupe
  const countCategorie = (id) => PROJETS.filter((p) => matches(p, id, annee)).length;
  const countAnnee = (id) => PROJETS.filter((p) => matches(p, categorie, id)).length;

  function reset() {
    setCategorie("all");
    setAnnee("all");
  }

  return (
    <section id="projects" className="pj" aria-labelledby="pj-title">
      <header className="pj-header">
        <h2 id="pj-title" className="pj-title">
          My <span>Projects</span>
        </h2>
        <p className="pj-lead">
          A few things I've built, from machine learning models to web apps.
        </p>
      </header>

      <div className="pj-filters">
        <FilterGroup
          label="Category"
          options={CATEGORIES}
          value={categorie}
          onChange={setCategorie}
          count={countCategorie}
        />
        <FilterGroup
          label="Year"
          options={ANNEES}
          value={annee}
          onChange={setAnnee}
          count={countAnnee}
        />
      </div>

      <p className="pj-result" aria-live="polite">
        {visibles.length} project{visibles.length > 1 ? "s" : ""}
        {filtre && (
          <button type="button" className="pj-reset" onClick={reset}>
            Clear filters
          </button>
        )}
      </p>

      {visibles.length > 0 ? (
        <ul className="pj-grid">
          {visibles.map((projet) => (
            <ProjectCard key={projet.id} projet={projet} />
          ))}
        </ul>
      ) : (
        <div className="pj-empty">
          <p className="pj-empty-title">Nothing here yet</p>
          <p className="pj-empty-text">
            {annee !== "all" && annee > 1
              ? "Projects from this year are on their way. Check back soon!"
              : "No project matches these filters."}
          </p>
          <button type="button" className="pj-reset" onClick={reset}>
            Show all projects
          </button>
        </div>
      )}
    </section>
  );
}
