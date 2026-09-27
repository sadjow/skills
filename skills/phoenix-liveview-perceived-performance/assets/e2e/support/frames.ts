import type { Page } from "@playwright/test";

export type AnimationFrameEntry = {
  startTime: number;
  duration: number;
  blockingDuration: number;
  renderStart: number;
  styleAndLayoutStart: number;
};

export type FrameReport = {
  frameCount: number;
  longestFrame: number;
  longAnimationFrames: AnimationFrameEntry[];
};

type FrameProbe = {
  deltas: number[];
  entries: AnimationFrameEntry[];
  lastFrame: number;
};

// GPU acceleration for headless Chromium on macOS; confirm the result with
// readRenderer because an unsupported build silently falls back to software.
export const metalGpuLaunchOptions = {
  channel: "chromium",
  args: ["--enable-gpu", "--use-angle=metal", "--ignore-gpu-blocklist"],
};

// Installed as an init script so every document, including one reached by a
// cross-document navigation, records frames from its first paint.
export async function installFrameProbe(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const probe: FrameProbe = { deltas: [], entries: [], lastFrame: 0 };

    const tick = (now: number) => {
      if (probe.lastFrame) probe.deltas.push(now - probe.lastFrame);
      probe.lastFrame = now;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    if (
      PerformanceObserver.supportedEntryTypes.includes("long-animation-frame")
    ) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const frame = entry as PerformanceEntry &
            Partial<AnimationFrameEntry>;
          probe.entries.push({
            startTime: frame.startTime,
            duration: frame.duration,
            blockingDuration: frame.blockingDuration ?? 0,
            renderStart: frame.renderStart ?? 0,
            styleAndLayoutStart: frame.styleAndLayoutStart ?? 0,
          });
        }
      }).observe({ type: "long-animation-frame", buffered: true });
    }

    window.__frameProbe = probe;
  });
}

export async function resetFrames(page: Page): Promise<void> {
  await page.evaluate(() => {
    const probe = window.__frameProbe;
    if (!probe) throw new Error("installFrameProbe must run before navigation");
    probe.deltas = [];
    probe.entries = [];
    probe.lastFrame = 0;
  });
}

export async function readFrames(page: Page): Promise<FrameReport> {
  return page.evaluate(() => {
    const probe = window.__frameProbe;
    if (!probe) throw new Error("installFrameProbe must run before navigation");
    return {
      frameCount: probe.deltas.length,
      longestFrame: Math.max(0, ...probe.deltas),
      longAnimationFrames: probe.entries,
    };
  });
}

// The settle window keeps recording after the action resolves, so frames
// painted by a late patch or a closing animation are included.
export async function measureFrames(
  page: Page,
  action: () => Promise<void>,
  settleMilliseconds = 600,
): Promise<FrameReport> {
  await resetFrames(page);
  await action();
  await page.waitForTimeout(settleMilliseconds);
  return readFrames(page);
}

export async function readRenderer(page: Page): Promise<string> {
  return page.evaluate(() => {
    const context = document.createElement("canvas").getContext("webgl");
    const debugInfo = context?.getExtension("WEBGL_debug_renderer_info");
    return context && debugInfo
      ? String(context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : "unavailable";
  });
}

declare global {
  interface Window {
    __frameProbe?: FrameProbe;
  }
}
