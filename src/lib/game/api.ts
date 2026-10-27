// ─────────────────────────────────────────────────────────────
// MNEMO — typed fetch client for the game APIs.
// The backend owns the truth; this client just speaks its shape.
// ─────────────────────────────────────────────────────────────

import type {
  SubmitBody,
  SubmitResponse,
  TodayPayload,
  VenuePayload,
} from "./types";

/** GET /api/game/today — TodayPayload plus the roster size (client-side helper). */
export type TodayResponse = TodayPayload & { rosterSize: number };

/** POST /api/game/submit — authoritative session result plus roster size. */
export type SubmitApiResponse = SubmitResponse & { rosterSize: number };

/** GET /api/venue — the campaign venue payload plus roster size. */
export type VenueResponse = VenuePayload & { rosterSize: number };

/** Thrown when POST /api/game/submit returns 409 (session already exists today). */
export class AlreadyPlayedError extends Error {
  constructor() {
    super("Today's session is already complete.");
    this.name = "AlreadyPlayedError";
  }
}

async function getJson<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch {
    throw new Error(`Network error reaching ${url}. Is the café open?`);
  }
  if (!res.ok) {
    throw new Error(`GET ${url} failed with status ${res.status}`);
  }
  return (await res.json()) as T;
}

/** The daily ritual payload: player, crowd, due friends, recap, teaser. */
export async function fetchToday(): Promise<TodayResponse> {
  return getJson<TodayResponse>("/api/game/today");
}

/** The venue (campaign) payload for the overlay. */
export async function fetchVenue(): Promise<VenueResponse> {
  return getJson<VenueResponse>("/api/venue");
}

/** Submit the recall session. 409 → AlreadyPlayedError (never double-submit). */
export async function submitSession(body: SubmitBody): Promise<SubmitApiResponse> {
  let res: Response;
  try {
    res = await fetch("/api/game/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new Error("Network error submitting your session. Try again.");
  }
  if (res.status === 409) {
    throw new AlreadyPlayedError();
  }
  if (!res.ok) {
    throw new Error(`POST /api/game/submit failed with status ${res.status}`);
  }
  return (await res.json()) as SubmitApiResponse;
}
