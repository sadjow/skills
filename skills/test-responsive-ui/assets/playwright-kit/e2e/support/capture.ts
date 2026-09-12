import type { Page, TestInfo } from "@playwright/test";

export async function captureScreenshot(
  page: Page,
  filename: string,
  testInfo?: TestInfo
): Promise<void> {
  if (process.env.E2E_CAPTURE !== "1") return;

  const body = await page.screenshot({ fullPage: true });
  if (testInfo) {
    await testInfo.attach(filename, { body, contentType: "image/png" });
  }
}
