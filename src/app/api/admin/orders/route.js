import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const verifyAdmin = async (request) => {
  const token = request.cookies.get("admin_session")?.value;

  if (!token || !process.env.ADMIN_SESSION_SECRET) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.ADMIN_SESSION_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    return payload.role === "admin";
  } catch {
    return false;
  }
};

export async function GET(request) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        order_number,
        customer_name,
        customer_phone,
        order_type,
        delivery_address,
        note,
        subtotal,
        delivery_fee,
        total,
        status,
        created_at,
        order_items (
          id,
          dish_id,
          dish_name,
          unit_price,
          quantity,
          line_total
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin orders error:", error);

      return NextResponse.json(
        { error: "Could not fetch orders." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orders: data || [],
    });
  } catch (error) {
    console.error("Admin orders API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}