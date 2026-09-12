export const interactionContract = {
  standardLatencyMs: 750,
  minimumTargetCssPx: 44,
  horizontalOverflowToleranceCssPx: 1,
  viewports: {
    smallMobile: { width: 320, height: 568 },
    mobile: { width: 390, height: 844 },
    narrowDesktop: { width: 390, height: 844 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 }
  }
} as const;
