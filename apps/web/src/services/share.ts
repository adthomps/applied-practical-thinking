export type SharePayload = {
  title?: string;
  text?: string;
  url: string;
};

export type ShareResult =
  | { status: "shared" }
  | { status: "copied" }
  | { status: "unsupported"; reason: string };

export async function shareOrCopy(payload: SharePayload): Promise<ShareResult> {
  if (typeof window === "undefined") {
    return { status: "unsupported", reason: "no-window" };
  }

  const nav = window.navigator as Navigator & {
    share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
    clipboard?: { writeText: (text: string) => Promise<void> };
  };

  if (typeof nav.share === "function") {
    try {
      await nav.share({ title: payload.title, text: payload.text, url: payload.url });
      return { status: "shared" };
    } catch {
      // User cancelled or share failed; fall back to copy.
    }
  }

  if (nav.clipboard && typeof nav.clipboard.writeText === "function") {
    await nav.clipboard.writeText(payload.url);
    return { status: "copied" };
  }

  return { status: "unsupported", reason: "no-share-or-clipboard" };
}
