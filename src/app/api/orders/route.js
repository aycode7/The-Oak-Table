import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { dishes } from "@/lib/menu";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customer,
      cart,
      subtotal,
      deliveryFee,
      total,
    } = body;

    if (!customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    if (!["Pickup", "Delivery"].includes(customer.orderType)) {
      return NextResponse.json(
        { error: "Invalid order type." },
        { status: 400 }
      );
    }

    if (customer.orderType === "Delivery" && !customer.address?.trim()) {
      return NextResponse.json(
        { error: "Delivery address is required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const verifiedCart = cart.map((item) => {
    const dish = dishes.find((d) => d.id === Number(item.id));

    if (!dish) {
      throw new Error("Invalid menu item.");
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Invalid quantity.");
    }

    return {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity,
    };
  });

  const verifiedSubtotal = verifiedCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const verifiedDeliveryFee =
    customer.orderType === "Delivery" ? 3000 : 0;

  const verifiedTotal =
    verifiedSubtotal + verifiedDeliveryFee;

    const orderNumber = `OT-${Date.now().toString().slice(-6)}`;

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customer.name.trim(),
        customer_phone: customer.phone.trim(),
        order_type: customer.orderType,
        delivery_address:
          customer.orderType === "Delivery"
            ? customer.address.trim()
            : null,
        note: customer.note?.trim() || null,
        subtotal: verifiedSubtotal,
        delivery_fee: verifiedDeliveryFee,
        total: verifiedTotal,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);

      return NextResponse.json(
        { error: "Could not create your order." },
        { status: 500 }
      );
    }

    const orderItems = verifiedCart.map((item) => ({
      order_id: order.id,
      dish_id: item.id,
      dish_name: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      line_total: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items error:", itemsError);

      // Remove the order if its items couldn't be saved.
      await supabaseAdmin
        .from("orders")
        .delete()
        .eq("id", order.id);

      return NextResponse.json(
        { error: "Could not save your order items." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderNumber,
    });
  } catch (error) {
    console.error("Order API error:", error);

    try {
    await resend.emails.send({
        from: "TheOakTable <onboarding@resend.dev>",
        to: process.env.OWNER_EMAIL,
        subject: `New Order ${orderNumber}`,
        html: `
        <h2>New Order Received 🍽️</h2>

        <p><strong>Order:</strong> ${orderNumber}</p>
        <p><strong>Customer:</strong> ${customer.name}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Type:</strong> ${customer.orderType}</p>

        ${
            customer.orderType === "Delivery"
            ? `<p><strong>Address:</strong> ${customer.address}</p>`
            : ""
        }

        <h3>Items</h3>

        <ul>
            ${cart
            .map(
                (item) =>
                `<li>${item.quantity} × ${item.name} — ₦${(
                    item.price * item.quantity
                ).toLocaleString()}</li>`
            )
            .join("")}
        </ul>

        <p><strong>Subtotal:</strong> ₦${Number(
            subtotal
        ).toLocaleString()}</p>

        <p><strong>Delivery:</strong> ₦${Number(
            deliveryFee
        ).toLocaleString()}</p>

        <h2>Total: ₦${Number(total).toLocaleString()}</h2>

        ${
            customer.note
            ? `<p><strong>Customer note:</strong> ${customer.note}</p>`
            : ""
        }

        <p>Log in to the TheOakTable admin dashboard to manage this order.</p>
        `,
    });
    } catch (emailError) {
    console.error("Order notification email failed:", emailError);
    }

    return NextResponse.json(
      { error: "Something went wrong while placing your order." },
      { status: 500 }
    );
  }
}
