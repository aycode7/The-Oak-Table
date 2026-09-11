

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        {/* Logo */}
        <Link href="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">T</span>

          <div className="logo-text">
            <span className="logo-name">TheOakTable</span>
            <span className="logo-tagline">EST. 2026</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            href="/"
            className={pathname === "/" ? "active" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            href="/menu"
            className={pathname === "/menu" ? "active" : ""}
            onClick={closeMenu}
          >
            Menu
          </Link>

          <Link
            href="/about"
            className={pathname === "/about" ? "active" : ""}
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={pathname === "/contact" ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </Link>

          {/* Mobile reservation button */}
          <Link
            href="/reservations"
            className="mobile-reserve"
            onClick={closeMenu}
          >
            Reserve a Table
          </Link>
        </nav>

        {/* Desktop CTA */}
        <Link href="/reservations" className="reserve-btn">
          <span>Reserve a Table</span>
          <span className="arrow">↗</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;

