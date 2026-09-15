"use client";

import { useState } from "react";
import { useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowRight,
  Send,
} from "lucide-react";

import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import "./page.css";

import "aos/dist/aos.css";
import Aos from "aos";

const page = () => {

    useEffect(() => {
    Aos.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: "ease-out-cubic"
    });
    }, []);


  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>

        <div data-aos="fade-up" className="contact-hero-content">
          <span className="contact-eyebrow">WE'D LOVE TO HEAR FROM YOU</span>

          <h1>
            Let’s <span>Talk.</span>
          </h1>

          <p>
            Whether you're planning a dinner, have a question, or simply want
            to say hello, our doors are always open.
          </p>
        </div>
      </section>

      {/* CONTACT INTRO */}
      <section className="contact-section">
        <div data-aos="fade-up" className="contact-heading">
          <span>GET IN TOUCH</span>
          <h2>Come Say Hello</h2>
          <p>
            Reach out to TheOakTable and let us take care of the rest.
            We're here to make every visit memorable.
          </p>
        </div>

        <div data-aos="fade-up" className="contact-grid">
          {/* LEFT INFO */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <MapPin size={21} />
              </div>

              <div>
                <span>OUR LOCATION</span>
                <h3>24 Oak Avenue</h3>
                <p>Victoria Island, Lagos, Nigeria</p>

                <a href="#map" className="direction-link">
                  Get Directions <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Phone size={21} />
              </div>

              <div>
                <span>PHONE</span>
                <h3>+234 800 123 4567</h3>
                <p>Available during opening hours</p>

                <a href="tel:+2348001234567" className="direction-link">
                  Call Us <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Mail size={21} />
              </div>

              <div>
                <span>EMAIL</span>
                <h3>hello@theoaktable.com</h3>
                <p>We usually reply within 24 hours</p>

                <a
                  href="mailto:hello@theoaktable.com"
                  className="direction-link"
                >
                  Send Email <ArrowRight size={15} />
                </a>
              </div>
            </div>

<div className="info-card">
              <div className="info-icon">
                <Clock3 size={21} />
              </div>

              <div>
                <span>OPENING HOURS</span>

                <div className="hours">
                  <div>
                    <p>Monday – Thursday</p>
                    <strong>11:00 AM – 10:00 PM</strong>
                  </div>

                  <div>
                    <p>Friday – Saturday</p>
                    <strong>11:00 AM – 11:30 PM</strong>
                  </div>

                  <div>
                    <p>Sunday</p>
                    <strong>12:00 PM – 9:00 PM</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIALS */}
            <div className="contact-socials">
              <span>FOLLOW ALONG</span>

              <div className="social-links">
                <a href="#" aria-label="Instagram">
                  <FaInstagram size={18} />
                </a>

                <a href="#" aria-label="Facebook">
                  <FaFacebookF size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-wrapper">
            <div className="form-top">
              <span>SEND A MESSAGE</span>
              <h2>How Can We Help?</h2>
              <p>
                Have a question, feedback, or a special request? Drop us a
                message below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>

                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>

                <textarea
                  id="message"
                  rows="7"
                  placeholder="Tell us what's on your mind..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="contact-submit">
                {submitted ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
                {!submitted && <Send size={17} />}
              </button>

              {submitted && (
                <p className="success-message">
                  Thank you! Your message has been received.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="contact-map-section" id="map">
        <div data-aos="fade-right" className="map-content">
          <span>FIND US</span>
          <h2>Visit TheOakTable</h2>
          <p>
            Located in the heart of Victoria Island, we're easy to find and
            even harder to forget.
          </p>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="map-button"
          >
            OPEN IN GOOGLE MAPS
            <ArrowRight size={16} />
          </a>
        </div>

        <div data-aos="fade-left" className="map-placeholder">
          <MapPin size={34} />
          <span>TheOakTable</span>
          <small>Victoria Island, Lagos</small>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section data-aos="fade-up" className="contact-cta">
        <div>
          <span>YOUR TABLE AWAITS</span>
          <h2>Good Food. Good Company.</h2>
          <p>
            Come hungry. Leave happy.
          </p>
        </div>

        <a href="/menu" className="cta-button">
          EXPLORE OUR MENU
          <ArrowRight size={16} />
        </a>
      </section>
    </main>
  );
};

export default page;
