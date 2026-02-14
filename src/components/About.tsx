import { motion } from 'framer-motion';
import { FiCheckCircle, FiAward, FiUsers, FiClock } from 'react-icons/fi';
import './About.css';

const stats = [
    { icon: <FiClock size={28} />, value: '15+', label: 'Yıl Tecrübe' },
    { icon: <FiUsers size={28} />, value: '500+', label: 'Mutlu Müşteri' },
    { icon: <FiCheckCircle size={28} />, value: '1000+', label: 'Tamamlanan Proje' },
    { icon: <FiAward size={28} />, value: '%100', label: 'Müşteri Memnuniyeti' },
];

const values = [
    {
        title: 'Kaliteli İşçilik',
        description: 'Her projede en yüksek kalite standartlarını uyguluyoruz.'
    },
    {
        title: 'Güvenilir Hizmet',
        description: 'Söz verdiğimiz sürede, söz verdiğimiz kalitede teslim ediyoruz.'
    },
    {
        title: 'Uygun Fiyat',
        description: 'Rekabetçi fiyatlarla profesyonel hizmet sunuyoruz.'
    },
    {
        title: 'Müşteri Odaklı',
        description: 'Müşterilerimizin ihtiyaçlarını önceliğimiz olarak görüyoruz.'
    },
];

const About = () => {
    return (
        <section id="hakkimizda" className="section section-alt about">
            <div className="container">
                <div className="about-content">
                    {/* Left Side - Image Removed */}
                    {/* Left Side - Image Removed */}

                    {/* Right Side - Text */}
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-subtitle">Hakkımızda</span>
                        <h2>İskenderoğlu Reis Dekorasyon ve Yalıtım</h2>
                        <p className="about-description">
                            Trabzon'da 15 yılı aşkın süredir hizmet veren firmamız, boya-badana,
                            dış cephe mantolama, ısı yalıtımı, asma tavan ve iç dekorasyon alanında
                            uzmanlaşmış profesyonel bir ekibe sahiptir.
                        </p>
                        <p className="about-description">
                            Müşteri memnuniyetini ön planda tutarak, her projede en kaliteli
                            malzemeleri ve modern teknikleri kullanarak, yaşam alanlarınızı
                            hayallerinizdeki mekanlara dönüştürüyoruz.
                        </p>

                        {/* Values */}
                        <div className="about-values">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    className="value-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="value-check">✓</div>
                                    <div>
                                        <h4>{value.title}</h4>
                                        <p>{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    className="about-stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
