import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { FaPaintRoller, FaHome, FaTools } from 'react-icons/fa';
import './Services.css';

const services = [
    {
        icon: <FaPaintRoller size={40} />,
        title: 'Boya & Badana',
        description: 'İç ve dış cephe boya işleri, profesyonel badana hizmetleri ile mekanlarınıza yeni bir soluk katıyoruz.',
        features: [
            'İç Cephe Boyama',
            'Dış Cephe Boyama',
            'Plastik Boya Uygulaması',
            'Saten Boya İşleri',
            'Duvar Hazırlık ve Macun',
            'Renk Danışmanlığı'
        ],
        link: '#iletisim'
    },
    {
        icon: <FaHome size={40} />,
        title: 'Isı Yalıtımı & Mantolama',
        description: 'Dış cephe mantolama ve ısı yalıtım sistemleri ile enerji tasarrufu sağlıyoruz.',
        features: [
            'Dış Cephe Mantolama',
            'Isı Yalıtım Sistemleri',
            'Poliüretan Köpük',
            'Taş Yünü Uygulaması',
            'Su Yalıtımı',
            'Çatı İzolasyonu'
        ],
        link: '#iletisim'
    },
    {
        icon: <FaTools size={40} />,
        title: 'İç Dekorasyon',
        description: 'Asma tavan, ışık bandı, alçıpan bölme duvar ve iç mekan dekorasyon hizmetleri sunuyoruz.',
        features: [
            'Asma Tavan Sistemleri',
            'Işık Bandı Uygulaması',
            'Alçıpan Bölme Duvar',
            'Dekoratif Tavan Modelleri',
            'Duvar Kağıdı',
            'İç Mekan Tadilat'
        ],
        link: '#iletisim'
    }
];

const Services = () => {
    return (
        <section id="hizmetler" className="section section-dark services">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-subtitle">Hizmetlerimiz</span>
                    <h2 className="section-title">Profesyonel Dekorasyon ve Yalıtım</h2>
                    <p className="section-description">
                        Trabzon'da 15+ yıllık tecrübemizle boya, badana, mantolama,
                        asma tavan ve iç dekorasyon hizmetleri sunuyoruz.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>

                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <FiCheckCircle className="feature-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href={service.link} className="service-link">
                                Teklif Al
                                <span>→</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
