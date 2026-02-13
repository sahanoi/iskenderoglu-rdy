import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './App.css';

// Component imports
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#anasayfa', label: 'Ana Sayfa' },
    { href: '#hizmetler', label: 'Hizmetlerimiz' },
    { href: '#projeler', label: 'Projelerimiz' },
    { href: '#hakkimizda', label: 'Hakkımızda' },
    { href: '#iletisim', label: 'İletişim' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <motion.nav 
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container navbar-container">
          <a href="#anasayfa" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('#anasayfa'); }}>
            <img src="/images/iskenderoglu_logo_1770651419961.png" alt="İskenderoğlu Reis" />
          </a>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a href="tel:+905551234567" className="navbar-cta btn btn-primary">
            <FiPhone />
            <span>Hemen Ara</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="tel:+905551234567" className="btn btn-primary mobile-cta">
                <FiPhone />
                <span>Hemen Ara</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/905551234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp size={32} />
      </motion.a>
    </div>
  );
}

export default App;
