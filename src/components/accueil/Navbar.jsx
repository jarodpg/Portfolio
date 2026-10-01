import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Les sections du menu (l'id doit exister dans la page)
const LIENS = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "experiences", label: "Experiences" },
  { id: "contact", label: "Contact" },
];

function scrollToId(event, id) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Barre de progression de lecture en haut de l'écran
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  // Fond "verre" dès qu'on quitte le haut de la page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Surligne la section visible
  useEffect(() => {
    const sections = LIENS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function go(event, id) {
    setOpen(false);
    scrollToId(event, id);
  }

  return (
    <>
      <motion.div className="nv-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <motion.header
        className={`nv${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nv-brand" onClick={(e) => go(e, "top")}>
          Jarod<span>.</span>
        </a>

        <button
          type="button"
          className="nv-burger"
          aria-expanded={open}
          aria-controls="nv-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nv-sr">{open ? "Close menu" : "Open menu"}</span>
          <span className="nv-burger-bar" aria-hidden="true" />
          <span className="nv-burger-bar" aria-hidden="true" />
        </button>

        <nav id="nv-menu" className="nv-menu" aria-label="Main">
          <ul className="nv-links">
            {LIENS.map((lien) => (
              <li key={lien.id}>
                <a
                  href={`#${lien.id}`}
                  className={`nv-link${active === lien.id ? " is-active" : ""}`}
                  aria-current={active === lien.id ? "true" : undefined}
                  onClick={(e) => go(e, lien.id)}
                >
                  {active === lien.id && (
                    <motion.span
                      layoutId="nv-pill"
                      className="nv-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="nv-link-text">{lien.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="nv-cta" onClick={(e) => go(e, "contact")}>
            Let's talk
          </a>
        </nav>
      </motion.header>
    </>
  );
}
