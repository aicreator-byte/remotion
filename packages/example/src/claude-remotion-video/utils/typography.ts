export const typography = {
  fontFamilies: {
    sans: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    display: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeights: {
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const textStyles = {
  // Display styles
  display1: {
    fontFamily: typography.fontFamilies.display,
    fontSize: typography.fontSizes['7xl'],
    fontWeight: typography.fontWeights.black,
    lineHeight: typography.fontHeights.tight,
    letterSpacing: typography.letterSpacing.tighter,
  },
  display2: {
    fontFamily: typography.fontFamilies.display,
    fontSize: typography.fontSizes['6xl'],
    fontWeight: typography.fontWeights.extrabold,
    lineHeight: typography.fontHeights.tight,
    letterSpacing: typography.letterSpacing.tighter,
  },
  display3: {
    fontFamily: typography.fontFamilies.display,
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.fontHeights.snug,
    letterSpacing: typography.letterSpacing.tight,
  },

  // Heading styles
  h1: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.fontHeights.snug,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.semibold,
    lineHeight: typography.fontHeights.snug,
    letterSpacing: typography.letterSpacing.normal,
  },
  h3: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.semibold,
    lineHeight: typography.fontHeights.normal,
    letterSpacing: typography.letterSpacing.normal,
  },
  h4: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.fontHeights.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Body styles
  body1: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.fontHeights.relaxed,
    letterSpacing: typography.letterSpacing.normal,
  },
  body2: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.fontHeights.normal,
    letterSpacing: typography.letterSpacing.normal,
  },

  // Caption styles
  caption: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.fontHeights.normal,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },
  overline: {
    fontFamily: typography.fontFamilies.sans,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.fontHeights.normal,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },

  // Code styles
  codeInline: {
    fontFamily: typography.fontFamilies.mono,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.fontHeights.normal,
  },
  codeBlock: {
    fontFamily: typography.fontFamilies.mono,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.fontHeights.loose,
    letterSpacing: typography.letterSpacing.normal,
  },
};

// Helper to merge text styles
export const mergeTextStyles = (
  base: React.CSSProperties,
  overrides: Partial<React.CSSProperties>
): React.CSSProperties => ({
  ...base,
  ...overrides,
});

// Responsive text clamp utility
export const clampFontSize = (
  min: string,
  max: string,
  viewportWidth = '1vw'
): string => `clamp(${min}, ${viewportWidth}, ${max})`;