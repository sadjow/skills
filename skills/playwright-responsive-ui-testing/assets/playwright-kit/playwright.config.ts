import { defineConfig, devices } from "@playwright/test";
import { interactionContract } from "./interaction-contract.config.js";

const capture = process.env.E2E_CAPTURE === "1";
const slowMo = Number(process.env.SLOW_MO) || 0;
const { viewports } = interactionContract;

export default defineConfig({
  testDir: process.env.E2E_TEST_DIR || "./e2e",
  timeout: 30_000 + slowMo * 50,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["line"], ["html", { open: "never" }]]
    : [["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4000",
    screenshot: "only-on-failure",
    video: capture ? "on" : "retain-on-failure",
    trace: capture ? "on" : "on-first-retry",
    launchOptions: { slowMo }
  },
  projects: [
    {
      name: "small-mobile-touch",
      use: {
        ...devices["iPhone SE"],
        viewport: viewports.smallMobile
      }
    },
    {
      name: "mobile-touch",
      use: {
        ...devices["iPhone 14"],
        viewport: viewports.mobile
      }
    },
    {
      name: "narrow-desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: viewports.narrowDesktop
      }
    },
    {
      name: "tablet-touch",
      use: {
        ...devices["iPad Mini"],
        viewport: viewports.tablet
      }
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: viewports.desktop
      }
    }
  ]
});
