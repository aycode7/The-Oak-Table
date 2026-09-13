"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Aos from "aos";
import "./page.css";
import "aos/dist/aos.css";
import { BiCart } from "react-icons/bi";

const page = () => {
  const [placingOrder, setPlacingOrder] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    orderType: "Pickup",
    address: "",
    note: "",
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("oaktable-cart");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    } finally {
      setCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;

    try {
      localStorage.setItem("oaktable-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart, cartLoaded]);

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);


  const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

  const dishes = [
    {
      id: 1,
      name: "Oak Table Steak",
      category: "Mains",
      price: 48000,
      description:
        "Chargrilled premium beef, roasted vegetables, herbs and a rich house jus.",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 2,
      name: "Seared Scallops",
      category: "Starters",
      price: 32000,
      description:
        "Delicately seared scallops with silky sauce, fresh herbs and seasonal garnish.",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 3,
      name: "Garden Salmon",
      category: "Mains",
      price: 38000,
      description:
        "Crisp-skinned salmon served with seasonal greens and a delicate cream sauce.",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 4,
      name: "Wild Mushroom Risotto",
      category: "Mains",
      price: 29000,
      description:
        "Creamy Arborio rice, wild mushrooms, parmesan and fresh thyme.",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 5,
      name: "Chocolate Fondant",
      category: "Desserts",
      price: 16000,
      description:
        "Warm dark chocolate centre served with vanilla cream and seasonal berries.",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 6,
      name: "Chef's Garden",
      category: "Starters",
      price: 35000,
      description:
        "An elegant seasonal creation inspired by the finest ingredients of the day.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 7,
      name: "Oak House Lemonade",
      category: "Drinks",
      price: 8000,
      description:
        "Fresh citrus, mint and sparkling water finished with our house syrup.",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 8,
      name: "Berry Elixir",
      category: "Drinks",
      price: 10000,
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

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const addToCart = (dish) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...dish, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee =
    customer.orderType === "Delivery" && cart.length > 0 ? 3000 : 0;

  const total = subtotal + deliveryFee;

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (placingOrder) return;

    setPlacingOrder(true);

    if (cart.length === 0) {
      setPlacingOrder(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          cart,
          subtotal,
          deliveryFee,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not place your order.");
      }

      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      setOrderPlaced(data.orderNumber);

      setCustomer({
        name: "",
        phone: "",
        orderType: "Pickup",
        address: "",
        note: "",
      });
    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        error.message ||
          "Something went wrong while placing your order. Please try again."
      );
    }finally {
      setPlacingOrder(false);
    }
  };


  return (
    <main className="menu-page">

      {/* ================= HERO ================= */}

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

      {/* ================= INTRO ================= */}

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

      {/* ================= MENU ================= */}

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
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* DISHES */}

        <div data-aos="fade-up" className="dish-grid">
          {filteredDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>

              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />

                <span>{dish.category}</span>
              </div>

              <div className="dish-details">

                <div className="dish-title-row">
                  <h3>{dish.name}</h3>
                  <strong>{formatPrice(dish.price)}</strong>
                </div>

                <p>{dish.description}</p>

                <button
                  className="add-cart-button"
                  onClick={() => addToCart(dish)}
                >
                  Add to Cart
                  <span>+</span>
                </button>

              </div>

            </article>
          ))}
        </div>

      </section>

      {/* ================= SIGNATURE ================= */}

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

          <button
            className="menu-cta-button"
            onClick={() => addToCart(dishes[0])}
          >
            Add to Cart
            <span>+</span>
          </button>

        </div>

      </section>

      {/* ================= NOTE ================= */}

      <section data-aos="fade-up" className="menu-note">

        <div className="note-line"></div>

        <p>
          Our menu changes seasonally. Please let our team know about any
          allergies or dietary requirements when making your reservation.
        </p>

        <div className="note-line"></div>

      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="menu-cta">

        <div className="menu-cta-overlay"></div>

        <div data-aos="fade-up" className="menu-cta-content">

          <span className="section-eyebrow">
            THE OAK TABLE
          </span>

          <h2>
            Come hungry.
            <br />
            <em>Leave inspired.</em>
          </h2>

          <p>
            Your table is waiting. Join us for an evening worth remembering.
          </p>

          <Link
            href="/reservations"
            className="gold-button"
          >
            Make a Reservation
            <span>↗</span>
          </Link>

        </div>

      </section>

      {/* ================= CART BUTTON ================= */}

      <button
        className="floating-cart-button"
        onClick={() => setCartOpen(true)}
        aria-label="Open shopping cart"
      >
        <span><BiCart size={30} /></span>

        {cartCount > 0 && (
          <strong>{cartCount}</strong>
        )}
      </button>

      {/* ================= CART DRAWER ================= */}

      {cartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">

              <div>
                <span>YOUR ORDER</span>
                <h2>Your Cart</h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="cart-close"
              >
                ×
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">
                <div><BiCart size={30} /></div>

                <h3>Your cart is empty</h3>

                <p>
                  Add something delicious from our menu
                  to get started.
                </p>

                <button
                  onClick={() => setCartOpen(false)}
                >
                  Explore Menu
                </button>
              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((item) => (
                    <div className="cart-item"  key={item.id}>
                      <div className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)}</p>

                        <div className="quantity-controls">
                          <button onClick={() => decreaseQuantity(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                </div>

                <div className="cart-bottom">

                  <button
                    className="clear-cart"
                    onClick={clearCart}
                  >
                    Clear cart
                  </button>

                  <div className="cart-total-row">
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(subtotal)}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    Proceed to Checkout
                    <span>→</span>
                  </button>

                </div>

              </>

            )}

          </aside>
        </div>
      )}

      {/* ================= CHECKOUT ================= */}

      {checkoutOpen && (
        <div className="checkout-overlay">

          <div className="checkout-modal">

            <div className="checkout-header">

              <div>
                <span>THE OAK TABLE</span>
                <h2>Complete your order</h2>
              </div>

              <button
                onClick={() => setCheckoutOpen(false)}
                className="checkout-close"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleCheckout}>

              <div className="checkout-layout">

                {/* CUSTOMER DETAILS */}

                <div className="checkout-form">

                  <div className="form-section">

                    <span className="form-label">
                      CUSTOMER DETAILS
                    </span>

                    <label>
                      Full name
                      <input
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleCustomerChange}
                        placeholder="John Doe"
                        required
                      />
                    </label>

                    <label>
                      Phone number
                      <input
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={handleCustomerChange}
                        placeholder="080 0000 0000"
                        required
                      />
                    </label>

                  </div>

                  <div className="form-section">

                    <span className="form-label">
                      ORDER METHOD
                    </span>

                    <div className="order-type">

                      <label
                        className={
                          customer.orderType === "Pickup"
                            ? "selected"
                            : ""
                        }
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value="Pickup"
                          checked={
                            customer.orderType === "Pickup"
                          }
                          onChange={handleCustomerChange}
                        />

                        <span>
                          <strong>Pickup</strong>
                          <small>
                            Collect from The Oak Table
                          </small>
                        </span>
                      </label>

                      <label
                        className={
                          customer.orderType === "Delivery"
                            ? "selected"
                            : ""
                        }
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value="Delivery"
                          checked={
                            customer.orderType === "Delivery"
                          }
                          onChange={handleCustomerChange}
                        />

                        <span>
                          <strong>Delivery</strong>
                          <small>
                            We'll bring it to you
                          </small>
                        </span>
                      </label>

                    </div>

                  </div>

                  {customer.orderType === "Delivery" && (
                    <div className="form-section">

                      <span className="form-label">
                        DELIVERY DETAILS
                      </span>

                      <label>
                        Delivery address
                        <textarea
                          name="address"
                          value={customer.address}
                          onChange={handleCustomerChange}
                          placeholder="Enter your full delivery address"
                          required
                        />
                      </label>

                    </div>
                  )}

                  <div className="form-section">

                    <span className="form-label">
                      ADDITIONAL NOTE
                    </span>

                    <label>
                      Order note
                      <textarea
                        name="note"
                        value={customer.note}
                        onChange={handleCustomerChange}
                        placeholder="Anything you'd like our kitchen to know?"
                      />
                    </label>

                  </div>

                </div>

                {/* ORDER SUMMARY */}

                <div className="checkout-summary">

                  <span className="form-label">
                    ORDER SUMMARY
                  </span>

                  <div className="summary-items">

                    {cart.map((item) => (
                      <div
                        className="summary-item"
                        key={item.id}
                      >
                        <div>
                          <strong>
                            {item.quantity} × {item.name}
                          </strong>
                        </div>

                        <span>
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </span>
                      </div>
                    ))}

                  </div>

                  <div className="summary-line">
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(subtotal)}
                    </strong>
                  </div>

                  {customer.orderType === "Delivery" && (
                    <div className="summary-line">
                      <span>Delivery</span>
                      <strong>
                        {formatPrice(deliveryFee)}
                      </strong>
                    </div>
                  )}

                  <div className="summary-total">
                    <span>Total</span>
                    <strong>
                      {formatPrice(total)}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="place-order-button"
                    disabled={placingOrder}
                  >
                    {placingOrder ? "Placing Order..." : "Place Order"}
                    {!placingOrder && <span>→</span>}
                  </button>

                  <p className="checkout-note">
                    No account is required. Your order
                    details are only used to process this
                    order.
                  </p>

                </div>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ================= ORDER SUCCESS ================= */}

      {orderPlaced && (
        <div className="order-success-overlay">

          <div className="order-success">

            <div className="success-icon">
              ✓
            </div>

            <span>ORDER RECEIVED</span>

            <h2>
              Thank you for
              <br />
              <em>choosing us.</em>
            </h2>

            <p>
              Your order has been received by
              The Oak Table.
            </p>

            <div className="order-number">

              <small>ORDER NUMBER</small>

              <strong>
                {orderPlaced}
              </strong>

            </div>

            <p className="success-small">
              Please keep your order number for
              reference.
            </p>

            <button
              onClick={() => setOrderPlaced(false)}
              className="success-button"
            >
              Back to Menu
            </button>

          </div>

        </div>
      )}

    </main>
  );
};

export default page; 
