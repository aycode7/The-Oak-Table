import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
        subtotal,
        delivery_fee: deliveryFee,
        total,
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

    const orderItems = cart.map((item) => ({
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

    return NextResponse.json(
      { error: "Something went wrong while placing your order." },
      { status: 500 }
    );
  }
}
