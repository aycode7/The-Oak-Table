"use client";

import { useState } from "react";
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

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    occasion: "",
    requests: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
        const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (!response.ok) {
        throw new Error(result.error || "Failed to submit reservation.");
        }

        setSubmitted(true);
    } catch (error) {
        console.error("Reservation submission error:", error);
        alert(error.message || "Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
    };


  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (submitted) {
    return (
      <main className="reservation-page">
        <section className="reservation-success">
          <div className="success-card">
            <span className="success-icon">✓</span>

            <p className="section-eyebrow">RESERVATION REQUEST</p>

            <h1>Your Table Awaits.</h1>

            <p className="success-text">
              Thank you, {formData.name}. We&apos;ve received your reservation
              request and look forward to welcoming you to TheOakTable.
            </p>

            <div className="reservation-summary">
              <div>
                <span>Date</span>
                <strong>{formatDate(formData.date)}</strong>
              </div>

              <div>
                <span>Time</span>
                <strong>{formData.time}</strong>
              </div>

              <div>
                <span>Guests</span>
                <strong>
                  {formData.guests}{" "}
                  {Number(formData.guests) === 1 ? "Guest" : "Guests"}
                </strong>
              </div>

              {formData.occasion && (
                <div>
                  <span>Occasion</span>
                  <strong>{formData.occasion}</strong>
                </div>
              )}
            </div>

            <p className="confirmation-note">
              A member of our team will contact you to confirm your reservation.
            </p>

            <div className="success-actions">
              <Link href="/contact" className="primary-btn">
                Contact Us <span>↗</span>
              </Link>

              <button
                className="secondary-btn"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    date: "",
                    time: "",
                    guests: "2",
                    name: "",
                    email: "",
                    phone: "",
                    occasion: "",
                    requests: "",
                  });
                }}
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="reservation-page">
      <section className="reservation-hero">
        <div className="reservation-hero-overlay"></div>

        <div data-aos="fade-up" className="reservation-hero-content">
          <p className="hero-eyebrow">THE OAK TABLE</p>

          <h1>
            Reserve
            <span>Your Table</span>
          </h1>

          <p>
            An evening worth remembering begins with a table waiting just for
            you.
          </p>
        </div>
      </section>

      <section className="reservation-section">
        <div data-aos="fade-up" className="reservation-heading">
          <div>
            <p className="section-eyebrow">BOOK YOUR EXPERIENCE</p>

            <h2>
              Make a
              <span>Reservation</span>
            </h2>
          </div>

          <p className="reservation-intro">
            Whether it&apos;s an intimate dinner, a celebration, or simply a
            night out, we&apos;ll make your time at TheOakTable memorable.
          </p>
        </div>

        <form data-aos="fade-up" className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-heading">
              <span>01</span>
              <div>
                <h3>Choose Your Table</h3>
                <p>Tell us when you&apos;d like to join us.</p>
              </div>
            </div>

            <div className="form-grid three-columns">
              <div className="input-group">
                <label htmlFor="date">Date *</label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  min={getToday()}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="time">Preferred Time *</label>

                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:30 PM">2:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="guests">Number of Guests *</label>

                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7">7 Guests</option>
                  <option value="8">8 Guests</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-divider"></div>

          <div className="form-section">
            <div className="form-section-heading">
              <span>02</span>
              <div>
                <h3>Your Details</h3>
                <p>So we know who we&apos;re welcoming.</p>
              </div>
            </div>

            <div className="form-grid two-columns">
              <div className="input-group">
                <label htmlFor="name">Full Name *</label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address *</label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone Number *</label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="occasion">Occasion</label>

                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                >
                  <option value="">Select an occasion</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Date Night">Date Night</option>
                  <option value="Business Dinner">Business Dinner</option>
                  <option value="Family Gathering">
                    Family Gathering
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-divider"></div>

          <div className="form-section">
            <div className="form-section-heading">
              <span>03</span>
              <div>
                <h3>Special Requests</h3>
                <p>Anything we should know before your visit?</p>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="requests">Additional Notes</label>

              <textarea
                id="requests"
                name="requests"
                rows="5"
                placeholder="Dietary requirements, seating preferences, special arrangements..."
                value={formData.requests}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="form-submit">
            <p>
              By submitting this request, you agree to be contacted regarding
              your reservation.
            </p>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "SENDING REQUEST..." : "REQUEST A TABLE"}
              {!loading && <span>↗</span>}
            </button>
          </div>
        </form>
      </section>

      <section className="reservation-cta">
        <div data-aos="fade-up" className="cta-content">
          <p className="section-eyebrow">NEED SOMETHING SPECIAL?</p>

          <h2>
            Let&apos;s make your
            <span>evening unforgettable.</span>
          </h2>

          <p>
            For private dining, large parties, or special arrangements, our
            team would be happy to help.
          </p>

          <Link href="/contact" className="cta-btn">
            Get In Touch <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;
