import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { DynamicEmailTemplate, DataField } from "@/components/DynamicEmailTemplate";
import { sanitizeText, sanitizeEmail, escapeHtml } from "@/lib/sanitize";

interface InquiryRequestBody {
  name: string;
  email: string;
  phone?: string;
  venue?: string;
  message: string;
}

async function saveToWordPress(data: InquiryRequestBody) {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const wpSecret = process.env.WP_API_SECRET_KEY;

  if (!wpUrl || !wpSecret) {
    console.error("WordPress API config missing, skipping DB save.");
    return { saved: false, reason: "config_missing" };
  }

  try {
    const res = await fetch(`${wpUrl}/wp-json/aio/v1/submit-inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WP-Secret-Token": wpSecret as string,
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("WordPress save failed:", res.status, errText);
      return { saved: false, reason: "http_error", status: res.status };
    }

    const json = await res.json();
    return { saved: true, data: json };
  } catch (err) {
    console.error("WordPress save error:", err);
    return { saved: false, reason: "exception" };
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return NextResponse.json({ error: "Email configuration missing." }, { status: 500 });
    }

    // Sanitise every field — never trust client input
    const name = sanitizeText(raw.name, 100);
    const email = sanitizeEmail(raw.email);
    const phone = sanitizeText(raw.phone, 30);
    const venue = sanitizeText(raw.venue, 200);
    const message = sanitizeText(raw.message, 2000);

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!message || message.length < 5) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const data: InquiryRequestBody = { name, email, phone, venue, message };

    // Escape values used in HTML email to prevent XSS in email clients
    const fields: DataField[] = [
      { label: "Name", value: escapeHtml(name) },
      { label: "Email Address", value: escapeHtml(email) },
      { label: "Phone Number", value: phone ? escapeHtml(phone) : "N/A" },
      { label: "Venue / Location", value: venue ? escapeHtml(venue) : "N/A" },
      {
        label: "Message",
        value: React.createElement(
          "span",
          { style: { fontStyle: "italic", whiteSpace: "pre-wrap" } },
          message  // React escapes this automatically
        ),
      },
    ];

    const emailHtml = await render(
      React.createElement(DynamicEmailTemplate, {
        title: "New Inquiry",
        subtitle: `Submission details received from ${escapeHtml(name)}`,
        tableData: fields,
      })
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    const [emailResult, wpResult] = await Promise.allSettled([
      transporter.sendMail({
        from: emailUser,
        to: emailUser,
        replyTo: email,   // safe — already validated as an email address
        subject: `New Contact Form Submission from ${escapeHtml(name)}`,
        html: emailHtml,
      }),
      saveToWordPress(data),
    ]);

    if (emailResult.status === "rejected") {
      console.error("Event inquiry email send error:", emailResult.reason);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    if (wpResult.status === "fulfilled" && !wpResult.value.saved) {
      console.warn("Email sent, but WordPress save failed:", wpResult.value);
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Event inquiry email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}