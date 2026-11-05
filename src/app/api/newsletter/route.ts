import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";
import { DynamicEmailTemplate, DataField } from "@/components/DynamicEmailTemplate";
import { sanitizeText, sanitizeEmail, sanitizeUrl, sanitizePhone, escapeHtml } from "@/lib/sanitize";

interface EmailRequestBody {
  name: string;
  email: string;
  phone: string;
  location: string;
  links: string[];
  message?: string;
}

async function saveToWordPress(data: EmailRequestBody) {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  const wpSecret = process.env.WP_API_SECRET_KEY;

  if (!wpUrl || !wpSecret) {
    console.error("WordPress API config missing, skipping DB save.");
    return { saved: false, reason: "config_missing" };
  }

  try {
    const res = await fetch(`${wpUrl}/wp-json/aio/v1/submit-join`, {
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

    // Sanitise all fields
    const name = sanitizeText(raw.name, 100);
    const email = sanitizeEmail(raw.email);
    const phone = sanitizePhone(raw.phone) ?? sanitizeText(raw.phone, 30);
    const location = sanitizeText(raw.location, 200);
    const message = sanitizeText(raw.message, 2000);

    if (!name || !email || !phone || !location) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }

    // Validate and sanitise each link — only allow http/https URLs, strip anything else
    const rawLinks: unknown[] = Array.isArray(raw.links) ? raw.links : [];
    const validLinks = rawLinks
      .map((l) => sanitizeUrl(l))
      .filter((l): l is string => l !== null)
      .slice(0, 10); // max 10 links

    const data: EmailRequestBody = { name, email, phone, location, links: validLinks, message };

    // Build the links HTML safely — escape every URL before putting it in href/text
    const linksHtmlString =
      validLinks.length > 0
        ? `<ul style="margin: 0; padding-left: 20px;">${validLinks
            .map((link) => {
              const safe = escapeHtml(link);
              return `<li><a href="${safe}" target="_blank" rel="noreferrer noopener" style="color: #D10F2F;">${safe}</a></li>`;
            })
            .join("")}</ul>`
        : "No links attached";

    const fields: DataField[] = [
      { label: "Applicant Name", value: escapeHtml(name) },
      { label: "Email Address", value: escapeHtml(email) },
      { label: "Phone Number", value: escapeHtml(phone) },
      { label: "Geographic Location", value: escapeHtml(location) },
      {
        label: "Submitted Portfolio Links",
        value: React.createElement("div", {
          dangerouslySetInnerHTML: { __html: linksHtmlString },
        }),
      },
      {
        label: "Personal Note / Statement",
        value: message ? escapeHtml(message) : "No additional message provided.",
      },
    ];

    const emailHtml = await render(
      React.createElement(DynamicEmailTemplate, {
        title: "New Team Submission Details",
        subtitle: `Application profile overview for ${escapeHtml(name)}`,
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
        replyTo: email,
        subject: `New Team Application from ${escapeHtml(name)}`,
        html: emailHtml,
      }),
      saveToWordPress(data),
    ]);

    if (emailResult.status === "rejected") {
      console.error("Email send failed:", emailResult.reason);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    if (wpResult.status === "fulfilled" && !wpResult.value.saved) {
      console.warn("Email sent, but WordPress save failed:", wpResult.value);
    }

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}