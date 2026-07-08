import "server-only";

// Thin Mailgun HTTP API client (no SDK needed). Secrets live in .env only.

type MailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, text, html, replyTo }: MailInput): Promise<boolean> {
  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const base = process.env.MAILGUN_BASE_URL ?? "https://api.mailgun.net";
  const from = process.env.MAIL_FROM ?? `Athens Creative English <despina@${domain}>`;

  if (!key || !domain) {
    console.warn("[mailgun] MAILGUN_API_KEY / MAILGUN_DOMAIN not set — email skipped");
    return false;
  }

  const body = new URLSearchParams({ from, to, subject, text });
  if (html) body.set("html", html);
  if (replyTo) body.set("h:Reply-To", replyTo);

  try {
    const res = await fetch(`${base}/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${key}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.warn(`[mailgun] send failed: ${res.status} ${await res.text()}`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[mailgun] network error — email skipped", err);
    return false;
  }
}

export function contactNotificationEmail(name: string, email: string, message: string) {
  return {
    to: process.env.MAIL_TO_ADMIN ?? "info@athens-creative.com",
    subject: `New inquiry from ${name} — athens-creative.com`,
    replyTo: email,
    text: `New message from the website contact form:\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`,
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:24px;background:#FAF3E7;color:#211D19;border-radius:16px">
      <h2 style="margin:0 0 16px">New inquiry from the website</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <div style="padding:16px;background:#fff;border-radius:12px;border-left:6px solid #E8503A;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>`,
  };
}

export function contactAutoReplyEmail(name: string, email: string) {
  return {
    to: email,
    subject: "Ευχαριστούμε! We got your message — Athens Creative English",
    text: `Hello ${name},\n\nThank you for reaching out to Athens Creative English! We received your message and Despina will get back to you within a day.\n\nIn the meantime: the studio is at Ragkavi 77, Gkyzi, Athens, and we answer +30 693 952 3314 whenever we're not mid-song.\n\nSee you at the studio,\nAthens Creative English\nhttps://athens-creative.com`,
    html: `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:24px;background:#FAF3E7;color:#211D19;border-radius:16px">
      <h2 style="margin:0 0 12px">Ευχαριστούμε, ${escapeHtml(name)}!</h2>
      <p>We received your message and <strong>Despina</strong> will get back to you within a day.</p>
      <p>In the meantime: the studio is at <strong>Ragkavi 77, Gkyzi, Athens</strong>, and we answer <a href="tel:+306939523314">+30 693 952 3314</a> whenever we're not mid-song.</p>
      <p style="margin-top:20px">See you at the studio,<br/>Athens Creative English</p>
    </div>`,
  };
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
