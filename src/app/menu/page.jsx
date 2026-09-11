"use client";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Aos from "aos";
import "./page.css";
import "aos/dist/aos.css";

const page = () => {

    useEffect(() => {
    Aos.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: "ease-out-cubic"
    });
    }, []);

  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

  const dishes = [
    {
      name: "Oak Table Steak",
      category: "Mains",
      price: "₦48,000",
      description:
        "Chargrilled premium beef, roasted vegetables, herbs and a rich house jus.",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Seared Scallops",
      category: "Starters",
      price: "₦32,000",
      description:
        "Delicately seared scallops with silky sauce, fresh herbs and seasonal garnish.",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Garden Salmon",
      category: "Mains",
      price: "₦38,000",
      description:
        "Crisp-skinned salmon served with seasonal greens and a delicate cream sauce.",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Wild Mushroom Risotto",
      category: "Mains",
      price: "₦29,000",
      description:
        "Creamy Arborio rice, wild mushrooms, parmesan and fresh thyme.",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Chocolate Fondant",
      category: "Desserts",
      price: "₦16,000",
      description:
        "Warm dark chocolate centre served with vanilla cream and seasonal berries.",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Chef's Garden",
      category: "Starters",
      price: "₦35,000",
      description:
        "An elegant seasonal creation inspired by the finest ingredients of the day.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Oak House Lemonade",
      category: "Drinks",
      price: "₦8,000",
      description:
        "Fresh citrus, mint and sparkling water finished with our house syrup.",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85",
    },
    {
      name: "Berry Elixir",
      category: "Drinks",
      price: "₦10,000",
      description:
        "Fresh berries, citrus and delicate botanical notes served chilled.",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <main className="menu-page">
      {/* HERO */}
      <section className="menu-hero">
        <div className="menu-hero-image"></div>

        <div className="menu-hero-overlay"></div>

        <div data-aos="fade-up" className="menu-hero-content">
          <span className="menu-eyebrow">THE OAK TABLE</span>

          <h1>
            Our
            <br />
            <em>Menu.</em>
          </h1>

          <div className="hero-line"></div>

          <p id="pp">
            Thoughtfully prepared dishes, seasonal ingredients and flavours
            made to be remembered.
          </p>
        </div>

        <div data-aos="fade-up" className="hero-scroll">
          <span></span>
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* INTRO */}
      <section data-aos="fade-up" className="menu-intro">
        <span className="section-eyebrow">FROM OUR KITCHEN</span>

        <h2>
          Simple ingredients.
          <br />
          <em>Beautifully prepared.</em>
        </h2>

        <p>
          At The Oak Table, every dish begins with quality ingredients and
          ends with careful attention to detail. Our menu brings together
          familiar flavours with a refined touch.
        </p>
      </section>

      {/* MENU */}
      <section className="menu-selection">
        <div data-aos="fade-up" className="selection-heading">
          <div>
            <span className="section-eyebrow">EXPLORE</span>
            <h2>Our selection</h2>
          </div>

          <p>
            Seasonal dishes crafted for long lunches, intimate dinners and
            everything in between.
          </p>
        </div>

        {/* FILTERS */}
        <div data-aos="fade-up" className="menu-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* DISHES */}
        <div data-aos="fade-up" className="dish-grid">
          {filteredDishes.map((dish) => (
            <article className="dish-card" key={dish.name}>
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />

                <span>{dish.category}</span>
              </div>

              <div className="dish-details">
                <div className="dish-title-row">
                  <h3>{dish.name}</h3>
                  <strong>{dish.price}</strong>
                </div>

                <p>{dish.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SIGNATURE */}
        <section className="signature-section">
          <div data-aos="fade-right" className="signature-image">
            <img
              src="https://cdn.promptalot.com/prompts/images/quadrants/1700056574_s9grR4PYJ0_u4.jpg"
              alt="The Oak Table signature dish"
            />
          </div>

          <div data-aos="fade-left" className="signature-content">
            <span>THE CHEF'S CHOICE</span>

            <h2>
              A dish worth
              <br />
              <em>staying for.</em>
            </h2>

            <p>
              Our signature creation changes with the seasons, allowing the
              kitchen to work with ingredients at their absolute best.
            </p>

            <div className="signature-price">₦48,000</div>

            <Link href="/reservations" className="menu-cta-button">
              Reserve a Table
              <span>↗</span>
            </Link>
          </div>
        </section>

      {/* NOTE */}
      <section data-aos="fade-up" className="menu-note">
        <div className="note-line"></div>

        <p>
          Our menu changes seasonally. Please let our team know about any
          allergies or dietary requirements when making your reservation.
        </p>

        <div className="note-line"></div>
      </section>

      {/* BOTTOM CTA */}
      <section className="menu-cta">
        <div className="menu-cta-overlay"></div>

        <div data-aos="fade-up" className="menu-cta-content">
          <span className="section-eyebrow">THE OAK TABLE</span>

          <h2>
            Come hungry.
            <br />
            <em>Leave inspired.</em>
          </h2>

          <p>
            Your table is waiting. Join us for an evening worth remembering.
          </p>

          <Link href="/reservations" className="gold-button">
            Make a Reservation
            <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;
