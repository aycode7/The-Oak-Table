import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const allowedStatuses = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];

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

export async function PATCH(request, { params }) {
  const { id } = await  params;
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { status } = await request.json();

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid order status." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Status update error:", error);

      return NextResponse.json(
        { error: "Could not update order status." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error("Admin status API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
