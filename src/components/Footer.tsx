import { FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo-new.png';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const services = [
        'Boya - Badana',
        'Dış Cephe Boyama',
        'Isı Yalıtımı',
        'Dış Cephe Mantolama',
        'Asma Tavan',
        'Işık Bandı'
    ];

    const quickLinks = [
        { label: 'Ana Sayfa', href: '#anasayfa' },
        { label: 'Hizmetlerimiz', href: '#hizmetler' },
        { label: 'Projelerimiz', href: '#projeler' },
        { label: 'Hakkımızda', href: '#hakkimizda' },
        { label: 'İletişim', href: '#iletisim' }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Company Info */}
                    <div className="footer-brand">
                        <img
                            src={logo}
                            alt="İskenderoğlu Reis"
                            className="footer-logo"
                            style={{ borderRadius: '50%' }}
                        />
                        <p>
                            Trabzon'un güvenilir dekorasyon ve yalıtım firması.
                            15+ yıllık tecrübemizle profesyonel hizmet sunuyoruz.
                        </p>
                        <div className="footer-social">
                            <a
                                href="https://www.facebook.com/p/Iskendero%C4%9Flu-Reis-Dekorasyon-ve-Yalitim-100063570160945/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </a>
                            <a href="#" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a
                                href="https://wa.me/905551234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>Hızlı Bağlantılar</h4>
                        <ul>
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-links">
                        <h4>Hizmetlerimiz</h4>
                        <ul>
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a href="#hizmetler">{service}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h4>İletişim</h4>
                        <ul>
                            <li>
                                <FiPhone className="footer-icon" />
                                <a href="tel:+905324703566">0532 470 35 66</a>
                            </li>
                            <li>
                                <FiPhone className="footer-icon" />
                                <a href="tel:+905356943964">0535 694 39 64</a>
                            </li>
                            <li>
                                <FiMapPin className="footer-icon" />
                                <span>Trabzon, Türkiye</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>
                        © {currentYear} İskenderoğlu Reis Dekorasyon ve Yalıtım.
                        Tüm hakları saklıdır.
                    </p>
                    <p className="footer-credit">
                        Profesyonel Dekorasyon & Yalıtım Hizmetleri
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
