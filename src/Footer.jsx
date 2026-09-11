"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6"
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span className="footer-logo-mark">T</span>

            <div className="footer-logo-text">
              <span className="footer-logo-name">TheOakTable</span>
              <span className="footer-logo-tagline">EST. 2026</span>
            </div>
          </Link>

          <p className="footer-description">
            Thoughtfully prepared food, warm hospitality, and memorable
            moments around the table.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF size={18} />
            </a>

            <a href="#" aria-label="Twitter">
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>

          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/menu">Menu</Link>
            </li>

            <li>
              <Link href="/about">About</Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>

            <li>
              <Link href="/reservations">Reservations</Link>
            </li>
          </ul>
        </div>

        {/* Visit */}
        <div className="footer-column footer-contact">
          <h3>Visit Us</h3>

          <div className="footer-contact-item">
            <MapPin size={17} />
            <span>
              24 Oak Street
              <br />
              Your City, Country
            </span>
          </div>

          <div className="footer-contact-item">
            <Phone size={17} />
            <span>+234 567 890 222</span>
          </div>

          <div className="footer-contact-item">
            <Mail size={17} />
            <span>hello@theoaktable.com</span>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="footer-column footer-hours">
          <h3>Opening Hours</h3>

          <div className="hours-row">
            <span>Mon – Thu</span>
            <span>12:00 – 22:00</span>
          </div>

          <div className="hours-row">
            <span>Fri – Sat</span>
            <span>12:00 – 23:00</span>
          </div>

          <div className="hours-row">
            <span>Sunday</span>
            <span>12:00 – 21:00</span>
          </div>

          <Link href="/reservations" className="footer-reserve">
            Reserve a Table
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © 2026 TheOakTable. All rights reserved.
          </p>

          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>

          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
