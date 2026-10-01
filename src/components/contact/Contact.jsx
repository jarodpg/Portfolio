import { useRef, useState } from "react";
import "./Contact.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqayndjk";


const OPPORTUNITIES = [
  {
    id: "internship",
    title: "Internship",
    from: 2026,
    to: 2027,
    description:
      "An internship where I can put my AI & Data skills to work inside a tech team.",
    cta: "Write about this internship",
  },
  {
    id: "work-study",
    title: "Work-study (alternance)",
    from: 2027,
    to: 2028,
    description:
      "A work-study contract alongside my final year of the Bachelor's at Epitech.",
    cta: "Write about this work-study",
  },
];

// Sujets proposés dans le formulaire (les ids reprennent ceux du dessus)
const TOPICS = [
  {
    id: "internship",
    label: "Internship 2026–27",
    placeholder: "Tell me about the internship: the team, the missions, the dates…",
  },
  {
    id: "work-study",
    label: "Work-study 2027–28",
    placeholder: "Tell me about the work-study: the team, the missions, the rhythm…",
  },
  {
    id: "project",
    label: "A project",
    placeholder: "Tell me about your project…",
  },
  {
    id: "other",
    label: "Something else",
    placeholder: "Hi Jarod, …",
  },
];

// Liens directs — laisse "href" vide pour masquer un lien
const LINKS = [
  { id: "github", label: "GitHub", href: "https://github.com/jarodpg" },
  { id: "linkedin", label: "LinkedIn", href: "" }, // ex : "https://www.linkedin.com/in/ton-profil"
  { id: "mail", label: "Email", href: "" }, // ex : "mailto:ton@email.com"
];

// ================================================================
//  ICÔNES (SVG inline, aucune dépendance)
// ================================================================
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
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
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
//  COMPOSANT
// ================================================================
export default function Contact() {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [sentTo, setSentTo] = useState("");
  const messageRef = useRef(null);

  const links = LINKS.filter((link) => link.href);
  const currentTopic = TOPICS.find((t) => t.id === topic);

  // Clic sur "Write about this…" : présélectionne le sujet et amène au message
  function pickOpportunity(id) {
    setTopic(id);
    if (status === "success") setStatus("idle");

    requestAnimationFrame(() => {
      const field = messageRef.current;
      if (!field) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      field.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      field.focus({ preventScroll: true });
    });
  }

  // Envoi à Formspree sans quitter la page
  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set(
      "_subject",
      currentTopic ? `Portfolio – ${currentTopic.label}` : "Portfolio – New message"
    );

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree ${response.status}`);

      setSentTo(String(data.get("email") || ""));
      setTopic("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="ct" aria-labelledby="ct-title">
      <header className="ct-header">
        <h2 id="ct-title" className="ct-title">
          Contact <span>Me</span>
        </h2>
        <p className="ct-lead">
          Have something to discuss? Send me a message, and I'll get back to you soon.
        </p>
      </header>

      <div className="ct-grid">
        {/* ---------- Disponibilités ---------- */}
        <aside className="ct-panel ct-availability" aria-labelledby="ct-availability-title">
          <p className="ct-status">
            <span className="ct-pulse" aria-hidden="true" />
            Open to opportunities
          </p>

          <p id="ct-availability-title" className="ct-panel-title">
            What I'm looking for
          </p>
          <p className="ct-panel-text">
            Computer Science student at Epitech (Bachelor's, 2025–2028).
          </p>

          <ol className="ct-track">
            {OPPORTUNITIES.map((opportunity) => (
              <li
                key={opportunity.id}
                className={`ct-slot${topic === opportunity.id ? " is-selected" : ""}`}
              >
                <span className="ct-tick" aria-hidden="true">
                  {opportunity.from}
                </span>
                <div className="ct-slot-body">
                  <p className="ct-slot-title">
                    {opportunity.title}
                    <span className="ct-sr">
                      , {opportunity.from} to {opportunity.to}
                    </span>
                  </p>
                  <p className="ct-slot-text">{opportunity.description}</p>
                  <button
                    type="button"
                    className="ct-slot-cta"
                    onClick={() => pickOpportunity(opportunity.id)}
                  >
                    {opportunity.cta}
                  </button>
                </div>
              </li>
            ))}
            <li className="ct-track-end" aria-hidden="true">
              <span className="ct-tick">{OPPORTUNITIES[OPPORTUNITIES.length - 1].to}</span>
            </li>
          </ol>

          {links.length > 0 && (
            <div className="ct-links">
              <p className="ct-links-label">Or find me on</p>
              <div className="ct-links-row">
                {links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={link.id}
                      className="ct-link"
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                    >
                      <Icon name={link.id} />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* ---------- Formulaire ---------- */}
        <div className="ct-panel ct-form-panel">
          {status === "success" ? (
            <div className="ct-success" role="status">
              <span className="ct-success-icon">
                <Icon name="check" size={30} />
              </span>
              <p className="ct-panel-title">Message sent</p>
              <p className="ct-panel-text">
                Thanks! I'll reply {sentTo ? <>to <strong>{sentTo}</strong></> : "by email"} soon.
              </p>
              <button type="button" className="ct-ghost" onClick={() => setStatus("idle")}>
                Write another message
              </button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <div>
                <p className="ct-panel-title">Send me a message</p>
                <p className="ct-panel-text">It goes straight to my inbox.</p>
              </div>

              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="ct-name" className="ct-label">Name</label>
                  <input
                    id="ct-name"
                    name="name"
                    type="text"
                    className="ct-input"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="ct-field">
                  <label htmlFor="ct-email" className="ct-label">Email</label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    className="ct-input"
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <fieldset className="ct-fieldset">
                <legend className="ct-label">What's it about?</legend>
                <div className="ct-chips">
                  {TOPICS.map((t) => (
                    <label key={t.id} className="ct-chip-wrap">
                      <input
                        type="radio"
                        name="topic"
                        value={t.label}
                        className="ct-chip-input"
                        checked={topic === t.id}
                        onChange={() => setTopic(t.id)}
                      />
                      <span className="ct-chip">{t.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="ct-field ct-field--grow">
                <label htmlFor="ct-message" className="ct-label">Message</label>
                <textarea
                  ref={messageRef}
                  id="ct-message"
                  name="message"
                  rows={5}
                  className="ct-input ct-textarea"
                  placeholder={currentTopic?.placeholder ?? "Hi Jarod, …"}
                  required
                />
              </div>

              {/* Anti-spam Formspree : champ invisible que seuls les robots remplissent */}
              <input
                type="text"
                name="_gotcha"
                className="ct-honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {status === "error" && (
                <p className="ct-error" role="alert">
                  The message couldn't be sent. Check your connection and try again
                  {links.length > 0 ? ", or reach me through the links on this page" : ""}.
                </p>
              )}

              <button type="submit" className="ct-submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="ct-spinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Icon name="send" />
                    Send message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
