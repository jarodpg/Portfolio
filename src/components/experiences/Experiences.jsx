import "./Experiences.css";

// ================================================================
//  TON PARCOURS
//  Une étape = un diplôme + les expériences pro faites pendant
//  cette période. Du plus récent au plus ancien.
// ================================================================
const PARCOURS = [
  {
    id: "epitech",
    debut: 2025,
    fin: 2028,
    enCours: true,
    diplome: {
      titre: "Bachelor's Degree in Computer Science",
      ecole: "Epitech",
      details: "2nd year: specializing in AI & Data. 1st year: full-stack development, AI, cybersecurity.",
      lienImage: "epitech.webp",
    },
    // Créneau ouvert affiché en haut de la colonne Professional (supprime-le une fois trouvé)
    recherche: {
      titre: "Internship, then work-study",
      date: "2026 – 2028",
      texte:
        "I'm looking for an internship in 2026–27, then a work-study contract (alternance) in 2027–28.",
    },
    experiences: [
      {
        titre: "First-Year End-of-Year Workshop",
        entreprise: "Upskill Handball",
        date: "2025",
        description:
          "Operational enhancement of the Upskill Handball database: searching for public information, adding photos, updating player profiles, and quality control.",
        competences: ["OSINT", "Communication", "Rigor", "Accuracy"],
        lienImage: "upskill.webp",
      },
    ],
  },
  {
    id: "lycee",
    debut: 2022,
    fin: 2025,
    diplome: {
      titre: "General Baccalaureate",
      ecole: "Lycée Pierre d'Ailly, Compiègne",
      details: "With honors. Specializations: Life and Earth Sciences, English.",
      lienImage: "pierredailly.webp",
    },
    experiences: [
      {
        titre: "Service Civique",
        entreprise: "USCB / Soccer club",
        date: "2023 – 2024",
        description:
          "During my civic service, I took care of the stadium maintenance. I also coached youth teams aged 5 to 12 and planned their training sessions.",
        competences: ["Communication", "Project management", "Organization", "Creativity", "Supervision"],
        lienImage: "servicecivique.webp",
      },
    ],
  },
  {
    id: "college",
    debut: 2018,
    fin: 2022,
    diplome: {
      titre: "National Brevet Diploma",
      ecole: "Collège Jean Paul II, Compiègne",
      details: "Highest honors (mention Très bien), 698 / 800.",
      lienImage: "jp2.webp",
    },
    experiences: [
      {
        titre: "Middle school internship",
        entreprise: "USCB / Soccer club",
        date: "April 2022",
        description:
          "Observation internship to learn about the role of director at the Choisy-au-Bac soccer academy.",
        competences: ["Observation", "Excel"],
        lienImage: "choisy.webp",
      },
    ],
  },
];

// ================================================================
//  PETITS COMPOSANTS
// ================================================================
function scrollToId(event, id) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

function Logo({ src, size = 40 }) {
  if (!src) return null;
  // alt vide : le nom de l'école / entreprise est déjà écrit à côté
  return <img src={src} alt="" className="xp-logo" width={size} height={size} loading="lazy" />;
}

function Degree({ diplome, enCours }) {
  return (
    <div className="xp-degree">
      <span className="xp-kind">Degree</span>
      <div className="xp-head">
        <Logo src={diplome.lienImage} size={48} />
        <div className="xp-heading">
          <h3 className="xp-name">{diplome.titre}</h3>
          <p className="xp-meta">{diplome.ecole}</p>
        </div>
      </div>
      {diplome.details && <p className="xp-text">{diplome.details}</p>}
      {enCours && <span className="xp-now">In progress</span>}
    </div>
  );
}

function Job({ experience }) {
  return (
    <li className="xp-job">
      <div className="xp-head">
        <Logo src={experience.lienImage} />
        <div className="xp-heading">
          <h4 className="xp-name">{experience.titre}</h4>
          <p className="xp-meta">{experience.entreprise}</p>
        </div>
        <span className="xp-date">{experience.date}</span>
      </div>
      <p className="xp-text">{experience.description}</p>
      {experience.competences?.length > 0 && (
        <ul className="xp-skills" aria-label="Skills">
          {experience.competences.map((competence) => (
            <li key={competence} className="xp-skill">
              {competence}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function OpenSlot({ recherche }) {
  return (
    <li className="xp-open">
      <span className="xp-dot" aria-hidden="true" />
      <div className="xp-open-body">
        <p className="xp-open-title">
          {recherche.titre} <span className="xp-date">· {recherche.date}</span>
        </p>
        <p className="xp-open-text">{recherche.texte}</p>
      </div>
      <a href="#contact" className="xp-open-link" onClick={(e) => scrollToId(e, "contact")}>
        Get in touch
      </a>
    </li>
  );
}

// ================================================================
//  SECTION
// ================================================================
export default function Experiences() {
  return (
    <section id="experiences" className="xp" aria-labelledby="xp-title">
      <header className="xp-header">
        <h2 id="xp-title" className="xp-title">
          My <span>Experiences</span>
        </h2>
        <p className="xp-lead">
          My studies on one side, and the work I did alongside them on the other.
        </p>
      </header>

      <ol className="xp-timeline">
        {PARCOURS.map((etape) => (
          <li key={etape.id} className={`xp-row${etape.enCours ? " is-current" : ""}`}>
            <p className="xp-period">
              <span className="xp-period-start">{etape.debut}</span>
              <span className="xp-sr"> to </span>
              <span className="xp-period-end">{etape.fin}</span>
            </p>

            <div className="xp-panel">
              <Degree diplome={etape.diplome} enCours={etape.enCours} />

              <div className="xp-work">
                <span className="xp-kind">Professional</span>
                <ul className="xp-jobs">
                  {etape.recherche && <OpenSlot recherche={etape.recherche} />}
                  {etape.experiences.map((experience) => (
                    <Job key={experience.titre} experience={experience} />
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
