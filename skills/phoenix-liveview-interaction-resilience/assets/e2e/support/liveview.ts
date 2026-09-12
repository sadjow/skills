import { expect, type Page } from "@playwright/test";

export type ReconnectLiveViewOptions = {
  rootSelector?: string;
  connectionStatusSelector?: string;
  competingErrorSelector?: string;
};

export async function waitForLiveSocket(page: Page): Promise<void> {
  await page.waitForFunction(() => Boolean(window.liveSocket));
}

export async function withLiveViewLatency<T>(
  page: Page,
  action: () => Promise<T>,
  milliseconds = 750
): Promise<T> {
  await waitForLiveSocket(page);
  await page.evaluate(
    (latency) => window.liveSocket.enableLatencySim(latency),
    milliseconds
  );

  try {
    return await action();
  } finally {
    await page.evaluate(() => window.liveSocket.disableLatencySim());
  }
}

export async function reconnectLiveView(
  page: Page,
  options: ReconnectLiveViewOptions = {}
): Promise<void> {
  const {
    rootSelector = "[data-phx-main]",
    connectionStatusSelector,
    competingErrorSelector
  } = options;

  await waitForLiveSocket(page);
  const root = page.locator(rootSelector);
  await expect(root).toHaveClass(/phx-connected/);

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        window.liveSocket.disconnect(resolve);
      })
  );

  await expect(root).toHaveClass(/phx-disconnected|phx-error/);
  if (connectionStatusSelector) {
    await expect(page.locator(connectionStatusSelector)).toBeVisible();
  }
  if (competingErrorSelector) {
    await expect(page.locator(competingErrorSelector)).toHaveCount(0);
  }

  await page.evaluate(() => window.liveSocket.connect());
  await expect(root).toHaveClass(/phx-connected/);

  if (connectionStatusSelector) {
    await expect(page.locator(connectionStatusSelector)).toBeHidden();
  }
}

declare global {
  interface Window {
    liveSocket: {
      enableLatencySim: (milliseconds: number) => void;
      disableLatencySim: () => void;
      disconnect: (callback?: () => void) => void;
      connect: () => void;
    };
  }
}
