/**
 * Safely tracks outbound link clicks using Google Analytics 4 (gtag.js).
 * Fully compatible with static export and safely checks for client-side window and gtag presence.
 *
 * @param url The target outbound URL.
 * @param label A descriptive label for the link clicked (e.g. 'Privacy Policy', 'Terms of Service', 'YouTube').
 */
export function trackOutboundLink(url: string, label: string): void {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "click_outbound", {
      event_category: "Outbound Links",
      event_label: label,
      value: url,
      transport_type: "beacon",
    });
  } else {
    // Graceful fallback during server-side builds or if GA blocker is active
    console.log(`[Analytics Fallback] Track Outbound Click: ${label} -> ${url}`);
  }
}
