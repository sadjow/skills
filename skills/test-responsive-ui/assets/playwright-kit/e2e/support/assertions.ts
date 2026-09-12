import { expect, type Locator, type Page } from "@playwright/test";
import { interactionContract } from "../../interaction-contract.config.js";

export type RectSnapshot = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export async function readRect(locator: Locator): Promise<RectSnapshot> {
  await expect(locator).toBeVisible();

  return locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left
    };
  });
}

export async function expectNoHorizontalOverflow(
  page: Page,
  tolerance = interactionContract.horizontalOverflowToleranceCssPx
): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      )
    )
    .toBeLessThanOrEqual(tolerance);
}

export async function expectMinimumTargetSize(
  locator: Locator,
  minimum = interactionContract.minimumTargetCssPx
): Promise<void> {
  const rect = await readRect(locator);
  expect(rect.width).toBeGreaterThanOrEqual(minimum);
  expect(rect.height).toBeGreaterThanOrEqual(minimum);
}

export async function expectWithinViewport(
  locator: Locator,
  margin = 0
): Promise<void> {
  const result = await locator.evaluate((element, allowedMargin) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: window.innerWidth,
      height: window.innerHeight,
      margin: allowedMargin
    };
  }, margin);

  expect(result.top).toBeGreaterThanOrEqual(-result.margin);
  expect(result.left).toBeGreaterThanOrEqual(-result.margin);
  expect(result.right).toBeLessThanOrEqual(result.width + result.margin);
  expect(result.bottom).toBeLessThanOrEqual(result.height + result.margin);
}

export async function expectAbovePersistentChrome(
  control: Locator,
  chrome: Locator,
  tolerance = interactionContract.horizontalOverflowToleranceCssPx
): Promise<void> {
  const [controlRect, chromeRect] = await Promise.all([
    readRect(control),
    readRect(chrome)
  ]);

  expect(controlRect.bottom).toBeLessThanOrEqual(chromeRect.top + tolerance);
  await control.click({ trial: true });
}

export async function expectOnePendingOwner(
  page: Page,
  selector = '[aria-busy="true"]'
): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(1);
}

export function expectRectDeltaWithin(
  before: RectSnapshot,
  after: RectSnapshot,
  tolerance: Partial<Pick<RectSnapshot, "x" | "y" | "width" | "height">>
): void {
  for (const key of ["x", "y", "width", "height"] as const) {
    const allowed = tolerance[key] ?? 0;
    expect(Math.abs(after[key] - before[key])).toBeLessThanOrEqual(allowed);
  }
}
