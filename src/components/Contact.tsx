import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
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

const contactInfo = [
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

const Contact = () => {
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

                <div className="contact-content-centered">
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
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
                                href="https://wa.me/905324703566"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link whatsapp"
                            >
                                <FaWhatsapp size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
