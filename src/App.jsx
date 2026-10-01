import { MotionConfig } from 'framer-motion';
import Background from './background.jsx';
import Navbar from './components/accueil/Navbar.jsx';
import Hero from './components/accueil/Hero.jsx';
import './App.css';
import AboutMe from './components/aboutme/AboutMe.jsx';
import Projects from './components/projects/Projects.jsx';
import Experiences from './components/experiences/Experiences.jsx';
import Contact from './components/contact/Contact.jsx';
import Footer from './components/contact/fin.jsx';


function App() {

  // (les données des projets et des expériences sont dans leurs composants)

  // return principal contient uniquement l'affichage
  return (
    // reducedMotion="user" : les animations se coupent si le visiteur l'a demandé à son système
    <MotionConfig reducedMotion="user">
      <Background />

      {/* // ================================================================
      //                         HOME PAGE
      // ================================================================ */}


      <Navbar />
      <Hero />

      {/* // ================================================================
      //                         ABOUT ME
      // ================================================================ */}


      <AboutMe />

      {/* // ================================================================
      //                         PROJECTS
      // ================================================================ */}

      <Projects />

      {/* // ================================================================
      //                         EXPERIENCES
      // ================================================================ */}

      <Experiences />

      {/* // ================================================================
      //                         CONTACT ME
      // ================================================================ */}

      <Contact />

      {/* // ================================================================
      //                         FOOTER
      // ================================================================ */}

      <Footer />
    </MotionConfig>
  );
}

export default App;
