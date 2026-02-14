import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './Contact.css';


interface FormData {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
}

const initialFormData: FormData = {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
};

{
    icon: <FiPhone size={24} />,
        title: 'Telefon (Birincil)',
            value: '0532 470 35 66',
                link: 'tel:+905324703566'
},
{
    icon: <FiPhone size={24} />,
        title: 'Telefon (İkincil)',
            value: '0535 694 39 64',
                link: 'tel:+905356943964'
},
{
    icon: <FiMapPin size={24} />,
        title: 'Adres',
            value: 'Trabzon, Türkiye',
                link: 'https://maps.google.com/?q=Trabzon,Turkey'
}
];

const services = [
    'Boya - Badana',
    'Dış Cephe Boyama',
    'İç Cephe Boyama',
    'Isı Yalıtımı',
    'Dış Cephe Mantolama',
    'Asma Tavan',
    'Işık Bandı',
    'Alçıpan İşleri',
    'Duvar Kağıdı',
    'Diğer'
];

const Contact = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(initialFormData);

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section id="iletisim" className="section section-dark contact">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-subtitle">İletişim</span>
                    <h2 className="section-title">Bizimle İletişime Geçin</h2>
                    <p className="section-description">
                        Projeniz hakkında konuşmak ister misiniz?
                        Ücretsiz keşif ve fiyat teklifi için bize ulaşın.
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>İletişim Bilgileri</h3>
                        <p>
                            Size yardımcı olmaktan memnuniyet duyarız.
                            Aşağıdaki kanallardan bize ulaşabilirsiniz.
                        </p>

                        <div className="contact-items">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.link}
                                    target={item.link.startsWith('http') ? '_blank' : undefined}
                                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="contact-item"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="contact-icon">{item.icon}</div>
                                    <div>
                                        <span className="contact-label">{item.title}</span>
                                        <span className="contact-value">{item.value}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Working Hours */}
                        <div className="working-hours">
                            <div className="hours-icon"><FiClock size={20} /></div>
                            <div>
                                <h4>Çalışma Saatleri</h4>
                                <p>Pazartesi - Cumartesi: 08:00 - 18:00</p>
                                <p>Pazar: Kapalı</p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            <a
                                href="https://www.facebook.com/p/Iskendero%C4%9Flu-Reis-Dekorasyon-ve-Yalitim-100063570160945/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="social-link">
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="https://wa.me/905551234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link whatsapp"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <h3>Ücretsiz Teklif Alın</h3>

                            {isSubmitted && (
                                <motion.div
                                    className="form-success"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                                </motion.div>
                            )}

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Adınız Soyadınız *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Telefon *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="0555 123 45 67"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">E-posta</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ornek@email.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="service">Hizmet Türü *</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seçiniz</option>
                                        {services.map((service, index) => (
                                            <option key={index} value={service}>{service}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mesajınız *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Projeniz hakkında bilgi verin..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn btn-primary form-submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <span>Gönderiliyor...</span>
                                ) : (
                                    <>
                                        <FiSend />
                                        <span>Gönder</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
