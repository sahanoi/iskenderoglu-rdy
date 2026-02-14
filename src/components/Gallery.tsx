import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Gallery.css';

// Import images
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
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
        category: 'Boya',
        image: img1,
        description: 'Modern dış cephe boya uygulaması'
    },
    {
        id: 2,
        title: 'Villa Dış Cephe',
        category: 'Boya',
        image: img2,
        description: 'Villa dış cephe boya ve badana'
    },
    {
        id: 3,
        title: 'Lüks Konut Boyama',
        category: 'Boya',
        image: img3,
        description: 'Modern konut dış cephe boyama'
    },
    {
        id: 4,
        title: 'Asma Tavan Uygulaması',
        category: 'Dekorasyon',
        image: img4,
        description: 'Dekoratif asma tavan ve ışık bandı'
    },
    {
        id: 5,
        title: 'Dış Cephe Mantolama',
        category: 'Yalıtım',
        image: img7,
        description: 'Isı yalıtım mantolama sistemi'
    },
    {
        id: 6,
        title: 'Pembe Ev Boyama',
        category: 'Boya',
        image: img5,
        description: 'Özel renk dış cephe boyama'
    },

];

const categories = ['Tümü', 'Boya', 'Yalıtım', 'Dekorasyon'];

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = selectedCategory === 'Tümü'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    const openLightbox = (project: Project) => {
        setSelectedProject(project);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedProject(null);
    };

    const navigateProject = (direction: 'prev' | 'next') => {
        if (!selectedProject) return;

        const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
        } else {
            newIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
        }

        setSelectedProject(filteredProjects[newIndex]);
    };

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
                                onClick={() => openLightbox(project)}
                            >
                                <img src={project.image} alt={project.title} />
                                <div className="gallery-overlay">
                                    <span className="gallery-category">{project.category}</span>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <span className="gallery-view">Görüntüle →</span>
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

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && selectedProject && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <FiX size={32} />
                        </button>

                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateProject('prev');
                            }}
                        >
                            <FiChevronLeft size={32} />
                        </button>

                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateProject('next');
                            }}
                        >
                            <FiChevronRight size={32} />
                        </button>

                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedProject.image} alt={selectedProject.title} />
                            <div className="lightbox-info">
                                <span className="lightbox-category">{selectedProject.category}</span>
                                <h3>{selectedProject.title}</h3>
                                <p>{selectedProject.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
