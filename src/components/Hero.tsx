import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
    const services = [
        'Boya - Badana',
        'Dış Cephe Boyama',
        'İç Cephe Boyama',
        'Isı Yalıtımı',
        'Dış Cephe Mantolama',
        'Asma Tavan',
        'Işık Bandı',
        'Alçıpan İşleri',
        'Duvar Kağıdı'
    ];

    return (
        <section id="anasayfa" className="hero">
            {/* Dark Gradient Background */}
            <div className="hero-bg-gradient" />

            {/* Content */}
            <div className="container hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        İskenderoğlu Reis Dekorasyon
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        TRABZON'DA PROFESYONEL DEKORASYON VE YALITIM
                    </motion.p>

                    {/* Service Selector Bar (Blueprint Style) */}
                    <motion.div
                        className="hero-search-bar"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <div className="search-item">
                            <FiSearch className="search-icon" />
                            <select className="search-select">
                                <option value="">Hizmet Seçin</option>
                                {services.map((service, index) => (
                                    <option key={index} value={service}>{service}</option>
                                ))}
                            </select>
                        </div>

                        <div className="search-divider" />

                        <div className="search-item">
                            <FaPhone className="search-icon" />
                            <a href="tel:+905324703566" className="search-link">
                                Hemen Ara
                            </a>
                        </div>

                        <div className="search-divider" />

                        <div className="search-item">
                            <FaWhatsapp className="search-icon" />
                            <a
                                href="https://wa.me/905324703566"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="search-link"
                            >
                                WhatsApp
                            </a>
                        </div>

                        <button className="search-button">
                            <FiSearch size={20} />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
