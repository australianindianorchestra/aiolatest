import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { DynamicEmailTemplate, DataField } from "@/components/DynamicEmailTemplate";
import { sanitizeText, sanitizeEmail, sanitizePhone, escapeHtml } from "@/lib/sanitize";

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Sanitise every field before use
    const name = sanitizeText(raw.name, 100);
    const email = sanitizeEmail(raw.email);
    const phone = sanitizePhone(raw.phone) ?? sanitizeText(raw.phone, 30);
    const country = sanitizeText(raw.country, 100);
    const state = sanitizeText(raw.state, 100);
    const city = sanitizeText(raw.city, 100);

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const fields: DataField[] = [
      { label: "Full Name", value: escapeHtml(name) },
      { label: "Email", value: escapeHtml(email) },
      { label: "Phone", value: escapeHtml(phone) },
      { label: "Country", value: escapeHtml(country) },
      { label: "State", value: escapeHtml(state) },
      { label: "City", value: escapeHtml(city) },
    ];

    const emailHtml = await render(
      React.createElement(DynamicEmailTemplate, {
        title: "🎵 A.R. Rahman 2027 Tour Waitlist Registration",
        subtitle: "New waitlist entry received",
        tableData: fields,
      })
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const [emailResult, wpResult] = await Promise.allSettled([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `🎵 New Waitlist: ${escapeHtml(name)}`,
        html: emailHtml,
      }),
      fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/aio/v1/tour-submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Secret-Token": process.env.WP_API_SECRET_KEY as string,
        },
        body: JSON.stringify({ name, email, phone, country, state, city }),
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    if (emailResult.status === "rejected") {
      console.error("Waitlist email failed:", emailResult.reason);
      return NextResponse.json({ success: false, message: "Failed to process registration." }, { status: 500 });
    }

    if (wpResult.status === "fulfilled") {
      const wpRes = wpResult.value;
      if (!wpRes.ok) {
        console.warn("Waitlist WP save failed:", wpRes.status);
      }
    }

    return NextResponse.json({ success: true, message: "Entry recorded successfully" }, { status: 200 });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ success: false, message: "Error processing request." }, { status: 500 });
  }
}