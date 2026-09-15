import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const allowedStatuses = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export async function PATCH(request, { params }) {
  try {
    const { reservationId } = await params;
    const { status } = await request.json();

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid reservation status." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", reservationId)
      .select()
      .single();

    if (error) {
      console.error("Reservation update error:", error);

      return NextResponse.json(
        { error: "Failed to update reservation." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Reservation status error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}