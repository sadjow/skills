import type { Page, Route } from "@playwright/test";
import { interactionContract } from "../../interaction-contract.config.js";

export type UrlMatcher = string | RegExp | ((url: URL) => boolean);

export async function delayMatchingRequests(
  page: Page,
  matcher: UrlMatcher,
  delayMs = interactionContract.standardLatencyMs
): Promise<() => Promise<void>> {
  const handler = async (route: Route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.continue();
  };

  await page.route(matcher, handler);
  return () => page.unroute(matcher, handler);
}

export async function waitForNextPaint(
  page: Page,
  frameCount = 1
): Promise<void> {
  await page.evaluate(
    (frames) =>
      new Promise<void>((resolve) => {
        let remaining = Math.max(1, frames);
        const tick = () => {
          remaining -= 1;
          if (remaining === 0) resolve();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    frameCount
  );
}

export async function setBrowserOffline(
  page: Page,
  offline: boolean
): Promise<void> {
  await page.context().setOffline(offline);
}
