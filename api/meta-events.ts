type Req = { method: string; headers: Record<string, string | string[] | undefined>; body: unknown };
type Res = { status: (code: number) => Res; json: (b: unknown) => void };
export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false });
    return;
  }
  try {
    const accessToken = process.env.META_ACCESS_TOKEN;
    const pixelId = process.env.META_PIXEL_ID;
    if (!accessToken || !pixelId) {
      res.status(200).json({ success: true });
      return;
    }
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const name: string = body.name || "";
    const phone: string = body.phone || "";
    const eventId: string = body.event_id || `lead_${Date.now()}`;
    const eventSourceUrl: string = body.event_source_url || "";
    const actionSource: string = body.action_source || "website";
    const fbp: string | undefined = body.fbp;
    const fbc: string | undefined = body.fbc;
    const firstName = name.split(" ")[0] || "";
    const lastName = name.split(" ").slice(1).join(" ") || "";
    const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const hash = async (s: string) => {
      const enc = new TextEncoder().encode(s);
      const buf = await crypto.subtle.digest("SHA-256", enc);
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    };
    const phHashed = await hash(phone.replace(/\D/g, ""));
    const fnHashed = await hash(normalize(firstName));
    const lnHashed = await hash(normalize(lastName));
    const userAgent = req.headers["user-agent"] || "";
    const value = body.value;
    const currency = body.currency;
    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: actionSource,
          event_source_url: eventSourceUrl,
          custom_data: {
            phone_number: phone,
            first_name: firstName,
            last_name: lastName,
            value,
            currency,
          },
          user_data: {
            ph: phHashed,
            fn: fnHashed,
            ln: lnHashed,
            client_user_agent: userAgent,
            fbp,
            fbc,
          },
        },
      ],
    };
    const resp = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      res.status(200).json({ success: false });
      return;
    }
    const data = await resp.json();
    res.status(200).json({ success: true, data });
  } catch {
    res.status(200).json({ success: false });
  }
}
