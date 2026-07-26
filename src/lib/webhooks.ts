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

/** Fires the Universal Action Scenario (Scenario 2) for both Escalations and Tours */
export function triggerMakeAction(payload: {
  taskType: "ESCALATION_REPLY" | "SCHEDULE_MEET" | "SCHEDULE_TOUR";
  applicantId: string;
  [key: string]: any;
}) {
  return postJSON(process.env.MAKE_ACTION_WEBHOOK_URL, payload);
}
