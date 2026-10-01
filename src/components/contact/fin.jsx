import "./Footer.css";

// ================================================================
//  NAVIGATION — "id" = l'id de la section visée.
//  "fallback" sert si la section n'a pas d'id (classe CSS à la place).
// ================================================================
const NAV = [
  { label: "Home", id: null },
  { label: "About", id: "about", fallback: ".about-section" },
  { label: "Projects", id: "projects", fallback: ".projects-section" },
  { label: "Experiences", id: "experiences" },
  { label: "Contact", id: "contact" },
];

// Liens externes — laisse "href" vide pour masquer un lien
const LINKS = [
  { id: "github", label: "GitHub", href: "https://github.com/jarodpg" },
  { id: "linkedin", label: "LinkedIn", href: "" }, // ex : "https://www.linkedin.com/in/ton-profil"
  { id: "mail", label: "Email", href: "" }, // ex : "mailto:ton@email.com"
];

const ICONS = {
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  arrowUp: (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
};

function Icon({ name, size = 17 }) {
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

function scrollToSection(event, item) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = reduceMotion ? "auto" : "smooth";

  if (!item.id) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target =
    document.getElementById(item.id) ??
    (item.fallback ? document.querySelector(item.fallback) : null);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior, block: "start" });
}

function Footer() {
  const year = new Date().getFullYear();
  const links = LINKS.filter((link) => link.href);

  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <p className="ft-name">
              Jarod <span className="ft-nowrap">Putman-Grain</span>
            </p>
            <p className="ft-tagline">
              Computer Science student at Epitech, specializing in AI &amp; Data.
            </p>
            <a
              className="ft-status"
              href="#contact"
              onClick={(e) => scrollToSection(e, { id: "contact" })}
            >
              <span className="ft-dot" aria-hidden="true" />
              Looking for an internship (2026–27) and a work-study (2027–28)
            </a>
          </div>

          <nav className="ft-col" aria-label="Footer navigation">
            <p className="ft-col-title">Navigate</p>
            <ul className="ft-list">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    className="ft-link"
                    href={item.id ? `#${item.id}` : "#"}
                    onClick={(e) => scrollToSection(e, item)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {links.length > 0 && (
            <div className="ft-col">
              <p className="ft-col-title">Elsewhere</p>
              <ul className="ft-list">
                {links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.id}>
                      <a
                        className="ft-link"
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                      >
                        <Icon name={link.id} />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="ft-bottom">
          <p>© {year} Jarod Putman-Grain. All rights reserved.</p>
          <p>Built with React and Vanta.js</p>
          <button
            type="button"
            className="ft-totop"
            onClick={(e) => scrollToSection(e, { id: null })}
          >
            Back to top
            <Icon name="arrowUp" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
