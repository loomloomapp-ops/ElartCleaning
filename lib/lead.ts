/**
 * Sends a lead to the Telegram group via the server-side PHP relay
 * (public/send-telegram.php). The bot token lives on the server, never here.
 *
 * Returns true only when Telegram confirmed delivery. Callers should fall back
 * to WhatsApp/email when this returns false so a lead is never lost (e.g. in
 * local dev where no PHP runs, or if the endpoint is unreachable).
 */
export type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  object?: string;
  area?: string;
  timing?: string;
  extras?: string[] | string;
  message?: string;
  /** Which part of the site the lead came from. */
  source?: string;
  /** Honeypot — must stay empty. */
  company?: string;
};

export async function sendLead(lead: Lead): Promise<boolean> {
  try {
    const res = await fetch("/send-telegram.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) return false;
    const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return Boolean(json && json.ok);
  } catch {
    return false;
  }
}
