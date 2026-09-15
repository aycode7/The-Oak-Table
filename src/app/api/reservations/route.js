import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      occasion,
      requests,
    } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const guestCount = Number(guests);

    if (guestCount < 1 || guestCount > 8) {
      return NextResponse.json(
        { error: "Guest count must be between 1 and 8." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          reservation_date: date,
          reservation_time: time,
          guests: guestCount,
          occasion: occasion || null,
          special_requests: requests?.trim() || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Reservation insert error:", error);

      return NextResponse.json(
        { error: "Failed to create reservation." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Reservation request received.",
        reservation: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reservation API error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
