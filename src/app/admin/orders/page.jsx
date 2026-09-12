"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Clock3,
  CheckCircle2,
  ChefHat,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  RefreshCw,
  X,
  MapPin,
  Phone,
  User,
  PackageCheck,
  Volume2,
  VolumeX,
  Truck,
} from "lucide-react";
import "./page.css";

const page = () => {

    const notificationAudio = useRef(null);

    useEffect(() => {
    notificationAudio.current = new Audio(
        "/sounds/order-notification.mp3"
    );

    notificationAudio.current.volume = 0.8;
    notificationAudio.current.preload = "auto";

    return () => {
        notificationAudio.current?.pause();
        notificationAudio.current = null;
    };
    }, []);

    const [soundEnabled, setSoundEnabled] = useState(false);  
    const knownOrderIds = useRef(new Set());  
    
    useEffect(() => {  
    const savedSoundSetting = localStorage.getItem(  
        "theoaktable_sound_enabled"  
    );  
    
    if (savedSoundSetting === "true") {  
        setSoundEnabled(true);  
    }  
    }, []);  
    
    const playOrderSound = () => {
    if (!soundEnabled || !notificationAudio.current) return;

    notificationAudio.current.currentTime = 0;

    notificationAudio.current.play().catch(() => {
        // Browser blocked playback — don't crash the dashboard
    });
    };


  const [activeTab, setActiveTab] = useState("Overview");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All orders");
  const [updatingStatus, setUpdatingStatus] = useState(false);

//   const playOrderSound = () => {
//     if (!soundEnabled || !audioUnlocked) return;

//     const audio = new Audio("/sounds/order-notification.mp3");

//     audio.volume = 0.8;

//     audio.play().catch((error) => {
//         console.error("Notification sound error:", error);
//     });
//   }



  const fetchOrders = async () => {
    try {
        setLoading(true);

        const response = await fetch("/api/admin/orders", {
        cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Could not load orders.");
        }

        const fetchedOrders = data.orders || [];

        setOrders(fetchedOrders);

        fetchedOrders.forEach((order) => {
        knownOrderIds.current.add(order.id);
        });
    } catch (error) {
        console.error("Fetch orders error:", error);
    } finally {
        setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);
  
  useEffect(() => {  
  const checkForNewOrders = async () => {  
    try {  
      const response = await fetch("/api/admin/orders", {  
        cache: "no-store",  
      });  
  
      if (!response.ok) return;  
  
      const data = await response.json();  
      const latestOrders = data.orders || [];  
  
      if (latestOrders.length === 0) return;  
  
      // First check: remember all existing orders  
      if (knownOrderIds.current.size === 0) {  
        latestOrders.forEach((order) => {  
          knownOrderIds.current.add(order.id);  
        });  
  
        setOrders(latestOrders);  
        return;  
      }  
  
      // Find genuinely new orders  
      const newOrders = latestOrders.filter(  
        (order) => !knownOrderIds.current.has(order.id)  
      );  
  
      if (newOrders.length > 0) {  
        // Remember the new orders  
        newOrders.forEach((order) => {  
          knownOrderIds.current.add(order.id);  
        });  
  
        // Update dashboard  
        setOrders(latestOrders);  
  
        // Play notification sound  
        if (soundEnabled) {  
          playOrderSound();  
        }  
      }  
    } catch (error) {  
      console.error("New order check error:", error);  
    }  
  };  
  
  // Check immediately  
  checkForNewOrders();  
  
  // Then every 5 seconds  
  const interval = setInterval(checkForNewOrders, 5000);  
  
  return () => clearInterval(interval);  
}, [soundEnabled]);
  
  
  
// const fetchedOrders = data.orders || [];  
  
// setOrders(fetchedOrders);  
  
// fetchedOrders.forEach((order) => {  
//   knownOrderIds.current.add(order.id);  
// });


  const today = new Date().toDateString();

  const todayOrders = orders.filter(
    (order) => new Date(order.created_at).toDateString() === today
  );

  const totalOrders = todayOrders.length;

  const pendingOrders = todayOrders.filter(
    (order) => order.status === "Pending"
  ).length;

  const preparingOrders = todayOrders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const completedOrders = todayOrders.filter(
    (order) => order.status === "Completed"
  ).length;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        order.order_number?.toLowerCase().includes(searchValue) ||
        order.customer_name?.toLowerCase().includes(searchValue) ||
        order.customer_phone?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All orders" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingStatus(true);

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not update order.");
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );

      setSelectedOrder((current) =>
        current
          ? { ...current, status: data.order.status }
          : current
      );
    } catch (error) {
      console.error("Status update error:", error);
      alert(error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleViewOrders = () => {
    setActiveTab("Orders");

    document
      .querySelector(".orders-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="admin-dashboard">

      {/* Sidebar */}

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <span>TheOakTable</span>
          <small>ADMIN</small>
        </div>

        <nav className="admin-nav">

          <button
            className={activeTab === "Overview" ? "active" : ""}
            onClick={() => setActiveTab("Overview")}
          >
            <LayoutDashboard size={19} />
            Overview
          </button>

          <button
            className={activeTab === "Orders" ? "active" : ""}
            onClick={() => setActiveTab("Orders")}
          >
            <ClipboardList size={19} />
            Orders
          </button>

          <button
            className={activeTab === "Kitchen" ? "active" : ""}
            onClick={() => setActiveTab("Kitchen")}
          >
            <ChefHat size={19} />
            Kitchen
          </button>

          <button
            className={activeTab === "Settings" ? "active" : ""}
            onClick={() => setActiveTab("Settings")}
          >
            <Settings size={19} />
            Settings
          </button>

        </nav>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Sign out
        </button>

      </aside>

      {/* Main */}

      <section className="admin-main">

        <header className="admin-header">

          <div>

            <p className="admin-eyebrow">
              RESTAURANT MANAGEMENT
            </p>

            <h1>
              {activeTab === "Overview" &&
                "Good morning, Admin."}

              {activeTab === "Orders" && "Orders"}

              {activeTab === "Kitchen" && "Kitchen"}

              {activeTab === "Settings" && "Settings"}
            </h1>

            <p className="admin-subtitle">

              {activeTab === "Overview" &&
                "Here's what's happening with TheOakTable today."}

              {activeTab === "Orders" &&
                "View and manage every customer order."}

              {activeTab === "Kitchen" &&
                "Keep track of orders currently being prepared."}

              {activeTab === "Settings" &&
                "Manage your restaurant dashboard."}

            </p>

          </div>

          <div className="admin-header-actions">

            <button
                className="sound-button"
                onClick={() => {
                const newValue = !soundEnabled;

                setSoundEnabled(newValue);

                localStorage.setItem(
                    "theoaktable_sound_enabled",
                    String(newValue)
                );

                if (newValue && notificationAudio.current) {
                    notificationAudio.current.currentTime = 0;

                    notificationAudio.current
                    .play()
                    .then(() => {
                        notificationAudio.current.pause();
                        notificationAudio.current.currentTime = 0;
                    })
                    .catch((error) => {
                        console.error("Audio unlock error:", error);
                    });
                }
                }}

                title={
                    soundEnabled
                    ? "Disable order sounds"
                    : "Enable order sounds"
                }
                >
                {soundEnabled ? (
                    <Volume2 size={20} />
                ) : (
                    <VolumeX size={20} />
                )}

                <span>
                    {soundEnabled ? " Sound On" : " Sound Off"}
                </span>
            </button>


            <button
              className="notification-button"
              onClick={() => setActiveTab("Orders")}
              title="View orders"
            >
              <Bell size={19} />

              {pendingOrders > 0 && (
                <span className="notification-count">
                  {pendingOrders}
                </span>
              )}

            </button>

            <button
              className="admin-profile"
              onClick={() => setActiveTab("Settings")}
            >

              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Administrator</strong>
                <small>Owner</small>
              </div>

              <ChevronDown size={16} />

            </button>

          </div>

        </header>

        {/* Overview */}

        {activeTab === "Overview" && (
          <>

            <div className="admin-stats">

              <div className="stat-card">

                <div className="stat-icon">
                  <ClipboardList size={20} />
                </div>

                <div>
                  <span>Total Orders</span>
                  <strong>{totalOrders}</strong>
                  <small>Today</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <span>Pending</span>
                  <strong>{pendingOrders}</strong>
                  <small>Needs attention</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon">
                  <ChefHat size={20} />
                </div>

                <div>
                  <span>Preparing</span>
                  <strong>{preparingOrders}</strong>
                  <small>In the kitchen</small>
                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <span>Completed</span>
                  <strong>{completedOrders}</strong>
                  <small>Today</small>
                </div>

              </div>

            </div>

            <section className="orders-section">

              <div className="orders-heading">

                <div>
                  <h2>Recent Orders</h2>
                  <p>
                    Manage incoming customer orders.
                  </p>
                </div>

                <button
                  className="view-orders-button"
                  onClick={handleViewOrders}
                >
                  View all orders
                </button>

              </div>

              <OrderList
                orders={filteredOrders.slice(0, 5)}
                loading={loading}
                onSelect={setSelectedOrder}
              />

            </section>

          </>
        )}

        {/* Orders */}

        {activeTab === "Orders" && (
          <section className="orders-section">

            <div className="orders-heading">

              <div>
                <h2>All Orders</h2>
                <p>
                  Search and manage customer orders.
                </p>
              </div>

              <button
                className="refresh-button"
                onClick={fetchOrders}
                disabled={loading}
              >
                <RefreshCw
                  size={17}
                  className={loading ? "spin" : ""}
                />
                Refresh
              </button>

            </div>

            <div className="orders-card">

              <div className="orders-toolbar">

                <div className="search-box">

                  <Search size={18} />

                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option>All orders</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Preparing</option>
                  <option>Ready</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

              </div>

              <OrderList
                orders={filteredOrders}
                loading={loading}
                onSelect={setSelectedOrder}
              />

            </div>

          </section>
        )}

        {/* Kitchen */}

        {activeTab === "Kitchen" && (
          <section className="orders-section">

            <div className="orders-heading">

              <div>
                <h2>Kitchen Queue</h2>
                <p>
                  Orders that require kitchen attention.
                </p>
              </div>

              <button
                className="refresh-button"
                onClick={fetchOrders}
              >
                <RefreshCw size={17} />
                Refresh
              </button>

            </div>

            <div className="orders-card">

              <OrderList
                orders={orders.filter(
                  (order) =>
                    order.status === "Confirmed" ||
                    order.status === "Preparing" ||
                    order.status === "Ready"
                )}
                loading={loading}
                onSelect={setSelectedOrder}
              />

            </div>

          </section>
        )}

        {/* Settings */}

        {activeTab === "Settings" && (
          <section className="settings-section">

            <div className="settings-card">

              <div className="settings-icon">
                <Settings size={22} />
              </div>

              <div>

                <h2>Restaurant Settings</h2>

                <p>
                  Dashboard settings can be added here later,
                  including restaurant details, delivery fees
                  and notifications.
                </p>

              </div>

            </div>

            <div className="settings-card">

              <div className="settings-icon">
                <User size={22} />
              </div>

              <div>

                <h2>Administrator</h2>

                <p>
                  You are currently signed in as the restaurant
                  administrator.
                </p>

                <button
                  className="settings-action"
                  onClick={handleLogout}
                >
                  Sign out
                </button>

              </div>

            </div>

          </section>
        )}
 {/* Order Details Modal */}

        {selectedOrder && (
          <div
            className="order-modal-overlay"
            onClick={() => setSelectedOrder(null)}
          >

            <div
              className="order-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="order-modal-header">

                <div>

                  <p>ORDER</p>

                  <h2>
                    {selectedOrder.order_number}
                  </h2>

                </div>

                <button
                  className="close-modal"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                >
                  <X size={20} />
                </button>

              </div>

              <div className="order-detail-grid">

                <div className="detail-box">

                  <User size={17} />

                  <div>
                    <small>Customer</small>

                    <strong>
                      {selectedOrder.customer_name}
                    </strong>
                  </div>

                </div>

                <div className="detail-box">

                  <Phone size={17} />

                  <div>
                    <small>Phone</small>

                    <strong>
                      {selectedOrder.customer_phone}
                    </strong>
                  </div>

                </div>

                <div className="detail-box">

                  {selectedOrder.order_type === "Delivery" ? (
                    <Truck size={17} />
                  ) : (
                    <PackageCheck size={17} />
                  )}

                  <div>
                    <small>Order type</small>

                    <strong>
                      {selectedOrder.order_type}
                    </strong>
                  </div>

                </div>

                <div className="detail-box">

                  <Clock3 size={17} />

                  <div>
                    <small>Placed</small>

                    <strong>
                      {formatDate(selectedOrder.created_at)}
                      {" · "}
                      {formatTime(selectedOrder.created_at)}
                    </strong>
                  </div>

                </div>

              </div>

              {selectedOrder.order_type === "Delivery" &&
                selectedOrder.delivery_address && (
                  <div className="order-address">

                    <MapPin size={18} />

                    <div>

                      <small>
                        Delivery address
                      </small>

                      <p>
                        {selectedOrder.delivery_address}
                      </p>

                    </div>

                  </div>
                )}

              <div className="modal-items">

                <h3>Items</h3>

                {selectedOrder.order_items?.map(
                  (item) => (
                    <div
                      className="modal-item"
                      key={item.id}
                    >

                      <div>

                        <strong>
                          {item.quantity} ×{" "}
                          {item.dish_name}
                        </strong>

                        <small>
                          ₦
                          {Number(
                            item.unit_price
                          ).toLocaleString()}{" "}
                          each
                        </small>

                      </div>

                      <strong>
                        ₦
                        {Number(
                          item.line_total
                        ).toLocaleString()}
                      </strong>

                    </div>
                  )
                )}

              </div>

              {selectedOrder.note && (
                <div className="order-note">

                  <strong>
                    Customer note
                  </strong>

                  <p>
                    {selectedOrder.note}
                  </p>

                </div>
              )}

              <div className="order-total-box">

                <div>
                  <span>Subtotal</span>

                  <strong>
                    ₦
                    {Number(
                      selectedOrder.subtotal
                    ).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Delivery</span>

                  <strong>
                    ₦
                    {Number(
                      selectedOrder.delivery_fee
                    ).toLocaleString()}
                  </strong>
                </div>

                <div className="grand-total">

                  <span>Total</span>

                  <strong>
                    ₦
                    {Number(
                      selectedOrder.total
                    ).toLocaleString()}
                  </strong>

                </div>

              </div>

              <div className="status-control">

                <label>
                  Order status
                </label>

                <select
                  value={selectedOrder.status}
                  disabled={updatingStatus}
                  onChange={(e) =>
                    updateOrderStatus(
                      selectedOrder.id,
                      e.target.value
                    )
                  }
                >

                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Preparing</option>
                  <option>Ready</option>
                  <option>Completed</option>
                  <option>Cancelled</option>

                </select>

              </div>

            </div>

          </div>
        )}

      </section>

    </main>
  );
};

const OrderList = ({
  orders,
  loading,
  onSelect,
}) => {

  if (loading) {
    return (
      <div className="empty-orders">

        <div className="empty-orders-icon">
          <ClipboardList size={25} />
        </div>

        <h3>
          Loading orders...
        </h3>

        <p>
          Fetching the latest orders.
        </p>

      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">

        <div className="empty-orders-icon">
          <ClipboardList size={25} />
        </div>

        <h3>
          No orders to display
        </h3>

        <p>
          New customer orders will appear here as
          soon as they are placed.
        </p>

      </div>
    );
  }

  return (
    <div className="admin-orders-list">

      {orders.map((order) => (

        <button
          className="admin-order-row"
          key={order.id}
          onClick={() => onSelect(order)}
        >

          <div className="order-main-info">

            <strong>
              {order.order_number}
            </strong>

            <span>
              {order.customer_name}
            </span>

            <small>
              {formatOrderTime(
                order.created_at
              )}
            </small>

          </div>

          <div className="order-type">

            {order.order_type === "Delivery" ? (
              <Truck size={16} />
            ) : (
              <PackageCheck size={16} />
            )}

            {order.order_type}

          </div>

          <strong className="order-price">

            ₦
            {Number(
              order.total
            ).toLocaleString()}

          </strong>

          <span
            className={`order-status ${order.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {order.status}
          </span>

          <ChevronDown
            size={17}
            className="order-arrow"
          />

        </button>

      ))}

    </div>
  );
};

const formatOrderTime = (date) => {
  return new Date(date).toLocaleString([], {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default page;
