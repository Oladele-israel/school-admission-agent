/**
 * Helpers for talking to Make.com. Each Make.com scenario exposes its own
 * custom webhook URL — paste them into your .env once the scenarios exist.
 */

async function postJSON(url: string | undefined, body: unknown) {
  if (!url) {
    console.warn("Webhook URL not configured — skipping call.", body);
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    // Never let a Make.com hiccup break the chat experience for the parent.
    console.error("Webhook call failed", url, err);
  }
}

/** Fires Flow A — tells the agent a new parent message has arrived. */
export function notifyAgentOfMessage(payload: {
  applicantId: string;
  sessionId: string;
  message: string;
}) {
  return postJSON(process.env.MAKE_FLOW_A_WEBHOOK_URL, payload);
}

/** Fires Flow D — tells the agent a human has resolved an escalation. */
export function notifyAgentOfResolution(payload: {
  escalationId: string;
  applicantId: string;
  resolution: string;
}) {
  return postJSON(process.env.MAKE_FLOW_D_WEBHOOK_URL, payload);
}
