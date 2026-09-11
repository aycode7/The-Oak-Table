"use client";

import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import "./page.css";
import Aos from "aos";
import "aos/dist/aos.css";

const featuredDishes = [
  {
    name: "Oak-Grilled Ribeye",
    description:
      "Prime cut, flame-grilled and finished with rosemary butter.",
    price: "$34",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Truffle Pasta",
    description:
      "Handmade pasta tossed in a rich parmesan and black truffle cream.",
    price: "$26",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Seared Salmon",
    description:
      "Atlantic salmon, seasonal vegetables and our signature herb sauce.",
    price: "$29",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
  },
];

const menuItems = [
  {
    category: "Starters",
    name: "Burrata & Heirloom Tomatoes",
    price: "$14",
  },
  {
    category: "Main",
    name: "Oak-Grilled Ribeye",
    price: "$34",
  },
  {
    category: "Main",
    name: "Wild Mushroom Risotto",
    price: "$24",
  },
  {
    category: "Dessert",
    name: "Warm Chocolate Fondant",
    price: "$12",
  },
];

const testimonials = [
  {
    text: "The food, atmosphere and service were absolutely beautiful. The OakTable has quickly become one of our favorite places.",
    name: "Sophia M.",
  },
  {
    text: "Every dish felt carefully prepared. It is the kind of restaurant you visit for dinner and end up staying for hours.",
    name: "Daniel R.",
  },
  {
    text: "Elegant without feeling pretentious. Amazing food, warm atmosphere and genuinely thoughtful service.",
    name: "Emma T.",
  },
];

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
    <main className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div data-aos="fade-up" className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span></span>
            FINE DINING · GOOD COMPANY
            <span></span>
          </p>

          <h1>
            Where every meal
            <br />
            <em>becomes a memory.</em>
          </h1>

          <p className="hero-description">
            Thoughtfully prepared food, warm hospitality, and an atmosphere
            designed for lingering.
          </p>

          <div className="hero-actions">
            <Link href="/menu" className="primary-btn">
              Explore Our Menu
              <span>↗</span>
            </Link>

            <Link href="/reservations" className="secondary-btn">
              Reserve a Table
            </Link>
          </div>
        </div>

      </section>

      {/* ================= INTRO ================= */}
      <section className="intro-section">
        <div className="section-container intro-grid">

          <div data-aos="fade-right" className="intro-heading reveal">
            <p className="eyebrow">WELCOME TO THE OAK TABLE</p>

            <h2>
              Good food.
              <br />
              <em>Great moments.</em>
            </h2>
          </div>

          <div data-aos="fade-left" className="intro-copy reveal delay-1">
            <p>
              The OakTable is a place for beautifully simple things — honest
              food, carefully chosen ingredients, and time spent around a
              table with people who matter.
            </p>

            <Link href="/about" className="text-link">
              Discover our story
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= FEATURED DISHES ================= */}
      <section className="dishes-section">
        <div className="section-container">

          <div data-aos="fade-up" className="section-header reveal">
            <div>
              <p className="eyebrow">FROM OUR KITCHEN</p>
              <h2>
                A Taste Of
                <br />
                <em>The OakTable</em>
              </h2>
            </div>

            <Link href="/menu" className="outline-btn">
              View Full Menu
              <span>↗</span>
            </Link>
          </div>

          <div data-aos="fade-up" className="dishes-grid">
            {featuredDishes.map((dish, index) => (
              <article
                className={`dish-card reveal delay-${index + 1}`}
                key={dish.name}
              >
                <div className="dish-image">
                  <img src={dish.image} alt={dish.name} />

                  <span className="dish-number">
                    0{index + 1}
                  </span>
                </div>

                <div className="dish-info">
                  <div>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                  </div>

                  <span className="dish-price">{dish.price}</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-section">
        <div className="section-container about-grid">

          <div data-aos="fade-right" className="about-image reveal">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
              alt="The OakTable dining atmosphere"
            />

            <div className="about-badge">
              <span>EST.</span>
              <strong>2026</strong>
            </div>
          </div>

          <div data-aos="fade-left" className="about-content reveal delay-1">
            <p className="eyebrow">OUR PHILOSOPHY</p>

            <h2>
              Rooted in
              <br />
              <em>the table.</em>
            </h2>

            <p>
              We believe the best meals are never just about what's on the
              plate. They're about the conversations, celebrations and little
              moments that happen around it.
            </p>

            <p>
              Our kitchen brings together seasonal ingredients, thoughtful
              technique and a little bit of creativity to create food worth
              coming back for.
            </p>

            <Link href="/about" className="text-link">
              Meet The OakTable
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= MENU PREVIEW ================= */}
      <section className="menu-section">
        <div data-aos="fade-up" className="section-container">

          <div className="menu-heading reveal">
            <p className="eyebrow">TONIGHT AT THE OAK TABLE</p>

            <h2>
              Something For
              <br />
              <em>Every Appetite.</em>
            </h2>
          </div>

          <div className="menu-list">
            {menuItems.map((item, index) => (
              <div className="menu-row reveal" key={item.name}>
                <span className="menu-index">0{index + 1}</span>

                <div className="menu-item-name">
                  <small>{item.category}</small>
                  <h3>{item.name}</h3>
                </div>

                <div className="menu-dots"></div>

                <span className="menu-price">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="menu-button reveal">
            <Link href="/menu" className="primary-btn">
              Explore the Menu
              <span>↗</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= ATMOSPHERE ================= */}
      <section className="atmosphere-section">

        <div className="atmosphere-image">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=85"
            alt="The OakTable restaurant interior"
          />
        </div>

        <div className="atmosphere-overlay"></div>

        <div data-aos="fade-up" className="atmosphere-content reveal">
          <p className="eyebrow">THE ATMOSPHERE</p>

          <h2>
            Stay A Little
            <br />
            <em>Longer.</em>
          </h2>

          <p>
            Soft lighting. Good music. A table worth gathering around.
          </p>
        </div>

      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="reviews-section">
        <div data-aos="fade-up" className="section-container">

          <div className="section-header centered reveal">
            <p className="eyebrow">FROM OUR GUESTS</p>

            <h2>
              Don't Just Take
              <br />
              <em>Our Word For It.</em>
            </h2>
          </div>

          <div className="reviews-grid">
            {testimonials.map((review, index) => (
              <article
                className={`review-card reveal delay-${index + 1}`}
                key={review.name}
              >
                <div className="quote-mark">“</div>

                <p>{review.text}</p>

                <div className="review-author">
                  <span></span>
                  <strong>{review.name}</strong>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ================= RESERVATION CTA ================= */}
      <section className="reservation-section">
        <div data-aos="fade-up" className="reservation-inner reveal">

          <p className="eyebrow">YOUR TABLE IS WAITING</p>

          <h2>
            Make Tonight
            <br />
            <em>Worth Remembering.</em>
          </h2>

          <p>
            Join us for an evening of good food, great company and moments
            worth slowing down for.
          </p>

          <Link href="/reservations" className="primary-btn light-btn">
            Reserve Your Table
            <span>↗</span>
          </Link>

        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="location-section">
        <div className="section-container location-grid">

          <div data-aos="fade-right" className="location-content reveal">
            <p className="eyebrow">COME FIND US</p>

            <h2>
              Around The
              <br />
              <em>Table.</em>
            </h2>

            <div className="location-details">
              <div>
                <small>LOCATION</small>
                <p>
                  24 Oak Street
                  <br />
                  Your City, Country
                </p>
              </div>

              <div>
                <small>OPENING HOURS</small>
                <p>
                  Tuesday – Sunday
                  <br />
                  12:00 PM – 11:00 PM
                </p>
              </div>
            </div>

            <Link href="/contact" className="text-link">
              Get directions
              <span>→</span>
            </Link>
          </div>

          <div data-aos="fade-left" className="location-map reveal delay-1">
            <div className="map-placeholder">
              <span>THE OAK TABLE</span>
              <div className="map-pin">+</div>
              <small>YOUR CITY</small>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default page;
