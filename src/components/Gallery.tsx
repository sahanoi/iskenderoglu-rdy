import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Gallery.css';

// Import images
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';

import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Dış Cephe Boyama',
        category: 'Dış Cephe',
        image: img1,
        description: 'Modern dış cephe boya uygulaması'
    },
    {
        id: 2,
        title: 'Villa Dış Cephe',
        category: 'Dış Cephe',
        image: img2,
        description: 'Villa dış cephe boya ve badana'
    },
    {
        id: 3,
        title: 'Lüks Konut Boyama',
        category: 'Dış Cephe',
        image: img3,
        description: 'Modern konut dış cephe boyama'
    },
    {
        id: 4,
        title: 'Merdiven Boyama',
        category: 'Boya',
        image: img4,
        description: 'Merdiven boşluğu boya ve onarım'
    },
    {
        id: 5,
        title: 'Dış Cephe Mantolama',
        category: 'Mantolama',
        image: img7,
        description: 'Isı yalıtım mantolama sistemi'
    },

];

const categories = ['Tümü', 'Boya', 'Dış Cephe', 'Mantolama', 'Dekorasyon', 'Yalıtım'];

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tümü');

    const filteredProjects = selectedCategory === 'Tümü'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <section id="projeler" className="section section-alt gallery">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-subtitle">Projelerimiz</span>
                    <h2 className="section-title">Tamamlanan İşlerimiz</h2>
                    <p className="section-description">
                        Trabzon ve çevresinde gerçekleştirdiğimiz boya, mantolama ve
                        dekorasyon projelerimizden örnekler.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="gallery-filters"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="gallery-grid">
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <div className="gallery-image">
                                    <img src={project.image} alt={project.title} />
                                </div>
                                <div className="gallery-overlay">
                                    <span className="gallery-category">{project.category}</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <motion.div
                    className="gallery-cta"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p>Daha fazla proje görmek ister misiniz?</p>
                    <a
                        href="https://www.facebook.com/p/Iskendero%C4%9Flu-Reis-Dekorasyon-ve-Yalitim-100063570160945/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Facebook'ta İncele
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;
