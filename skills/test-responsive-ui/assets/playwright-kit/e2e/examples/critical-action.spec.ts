import { expect, test } from "@playwright/test";
import {
  expectMinimumTargetSize,
  expectNoHorizontalOverflow,
  readRect,
  expectRectDeltaWithin
} from "../support/assertions.js";
import {
  delayMatchingRequests,
  waitForNextPaint
} from "../support/latency.js";

const journeyPath = process.env.CONTRACT_EXAMPLE_PATH;
const delayedRequest = process.env.CONTRACT_API_PATTERN;

test.describe("critical action interaction contract", () => {
  test.skip(
    !journeyPath,
    "Set CONTRACT_EXAMPLE_PATH and adapt the example test IDs to the host app."
  );

  test("acknowledges locally and keeps one pending owner", async ({ page }) => {
    test.skip(
      !delayedRequest,
      "Set CONTRACT_API_PATTERN to the HTTP request triggered by the action."
    );

    await page.goto(journeyPath!);
    const removeDelay = await delayMatchingRequests(page, delayedRequest!);

    const action = page.getByTestId("contract-critical-action");
    const shell = page.getByTestId("contract-stable-shell");
    const before = await readRect(shell);

    await action.click();
    await waitForNextPaint(page);

    const immediate = await page.evaluate(() => ({
      actionBusy: document
        .querySelector('[data-testid="contract-critical-action"]')
        ?.getAttribute("aria-busy"),
      pendingOwners: document.querySelectorAll('[aria-busy="true"]').length
    }));

    expect(immediate.actionBusy).toBe("true");
    expect(immediate.pendingOwners).toBe(1);
    const pending = await readRect(shell);
    expectRectDeltaWithin(before, pending, {
      x: 1,
      y: 1,
      width: 1,
      height: 1
    });

    await expect(page.getByTestId("contract-terminal-outcome")).toBeVisible();
    await removeDelay();
  });

  test("fits the viewport and exposes an accessible target", async ({ page }) => {
    await page.goto(journeyPath!);

    const action = page.getByTestId("contract-critical-action");
    await expectMinimumTargetSize(action);
    await expectNoHorizontalOverflow(page);
  });

  test("preserves the interaction with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(journeyPath!);

    await page.getByTestId("contract-critical-action").click();
    await expect(page.getByTestId("contract-terminal-outcome")).toBeVisible();
  });
});
