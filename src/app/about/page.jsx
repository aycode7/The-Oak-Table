"use client";

import { useEffect } from "react";
import Link from "next/link";
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

  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img
            src="https://veloraprestigedesigns.com/assets/hospitality-restaurant-DGEG1ki0.png"
            alt="Elegant TheOakTable dining room"
            />
        </div>

        <div className="about-hero-overlay"></div>

        <div data-aos="fade-up" className="about-hero-content">
          <span className="about-kicker">THE OAKTABLE</span>

          <h1>
            Our
            <br />
            Story
          </h1>

          <p>
            Where thoughtful food, warm hospitality, and unforgettable
            evenings come together around one table.
          </p>
        </div>

        <div className="about-hero-bottom">
          <span>EST. 2026</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>


      {/* INTRO */}
      <section className="about-intro">
        <div data-aos="fade-up" className="about-container intro-grid">

          <div className="intro-number">
            <span>01</span>
            <p>THE BEGINNING</p>
          </div>

          <div className="intro-content">
            <span className="section-label">
              A TABLE WORTH GATHERING AROUND
            </span>

            <h2>
              It started with a simple
              <em> idea.</em>
            </h2>

            <p>
              TheOakTable was created around one belief: some of life's
              best moments happen when people slow down and share a meal.
            </p>

            <p>
              We imagined a restaurant that felt intimate without being
              formal, refined without losing its warmth, and memorable
              without trying too hard.
            </p>

            <p>
              Every plate, every detail, and every seat at the table is
              part of that vision.
            </p>
          </div>

        </div>
      </section>


      {/* FULL WIDTH IMAGE */}
      <section data-aos="fade-up" className="about-image-section">
        <div className="about-large-image">
          <img
            src="https://veloraprestigedesigns.com/assets/hospitality-restaurant-DGEG1ki0.png"
            alt="Elegant TheOakTable dining room"
            />

          <div className="image-caption">
            <span>THE OAKTABLE</span>
            <p>Designed for evenings worth remembering.</p>
          </div>
        </div>
      </section>


      {/* PHILOSOPHY */}
      <section className="philosophy-section">
        <div className="about-container">

          <div data-aos="fade-up" className="philosophy-heading">
            <span className="section-label">
              02 — OUR PHILOSOPHY
            </span>

            <h2>
              Good food.
              <br />
              <em>Good reasons to stay.</em>
            </h2>
          </div>

          <div data-aos="fade-up" className="philosophy-grid">

            <div className="philosophy-card">
              <span>01</span>
              <h3>Quality</h3>
              <p>
                We believe beautiful dishes begin with ingredients
                chosen with care and intention.
              </p>
            </div>

            <div className="philosophy-card">
              <span>02</span>
              <h3>Craft</h3>
              <p>
                Every detail matters — from the kitchen to the final
                plate placed in front of you.
              </p>
            </div>

            <div className="philosophy-card">
              <span>03</span>
              <h3>Hospitality</h3>
              <p>
                We want every guest to feel welcomed, comfortable,
                and genuinely looked after.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CHEF SECTION */}
      <section className="chef-section">
        <div className="about-container chef-grid">

          <div data-aos="fade-right" className="chef-image">
            <img
                src="https://cdn.tatlerasia.com/asiatatler/i/tw/2018/11/02193552-kina5xo_cover_2000x1333.jpg"
                alt="Chef plating a dish in the kitchen"
            />
          </div>

          <div data-aos="fade-left" className="chef-content">
            <span className="section-label">
              03 — FROM THE KITCHEN
            </span>

            <h2>
              Where every plate
              <br />
              becomes <em>art.</em>
            </h2>

            <p>
              Our kitchen is driven by curiosity, precision, and a
              respect for the ingredients we work with.
            </p>

            <p>
              We take familiar flavours and give them a thoughtful
              expression — balancing technique with the warmth and
              simplicity that define TheOakTable.
            </p>

            <Link href="/menu" className="about-link">
              Explore Our Menu
              <span>↗</span>
            </Link>
          </div>

        </div>
      </section>


      {/* QUOTE */}
      <section className="about-quote">
        <div data-aos="fade-up" className="quote-content">

          <span className="quote-symbol">“</span>

          <h2>
            We don't simply serve dinner.
            <br />
            We create a reason to stay.
          </h2>

          <div className="quote-line"></div>

          <span>THE OAKTABLE</span>

        </div>
      </section>


      {/* VALUES */}
      <section className="values-section">
        <div className="about-container">

          <div data-aos="fade-up" className="values-heading">
            <span className="section-label">
              04 — WHAT WE VALUE
            </span>

            <h2>
              Built around
              <br />
              <em>people.</em>
            </h2>
          </div>

          <div data-aos="fade-up" className="values-list">

            <div className="value-row">
              <span>01</span>

              <h3>Good Food</h3>

              <p>
                Thoughtful dishes made with purpose and care.
              </p>
            </div>

            <div className="value-row">
              <span>02</span>

              <h3>Good Company</h3>

              <p>
                A space where conversations can last a little longer.
              </p>
            </div>

            <div className="value-row">
              <span>03</span>

              <h3>Good Moments</h3>

              <p>
                Because the best evenings are rarely rushed.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="about-final-cta">

        <div className="final-cta-bg">
          <img
            src="https://neosparkexperienc.com/images/elegant-dark-restaurant-interior-with-dim-warm-lighting-and-.png"
            alt="Warm intimate restaurant interior"
          />
        </div>

        <div className="final-cta-overlay"></div>

        <div data-aos="fade-up" className="final-cta-content">

          <span className="section-label">
            YOUR TABLE AWAITS
          </span>

          <h2>
            Come take a seat
            <br />
            at <em>TheOakTable.</em>
          </h2>

          <p>
            Good food. Good company. A table worth remembering.
          </p>

          <Link href="/reservations" className="final-cta-button">
            Reserve a Table
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
};

export default page;
