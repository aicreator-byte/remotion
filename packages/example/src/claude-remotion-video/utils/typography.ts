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

  // Display styles
  display1: {
    fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '72px',
    fontWeight: 900,
    lineHeight: 1.1,
    letterSpacing: '-0.05em',
  },
  display2: {
    fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '60px',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.05em',
  },
  display3: {
    fontFamily: '"Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.375,
    letterSpacing: '-0.025em',
  },

  // Heading styles
  h1: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1.375,
    letterSpacing: '-0.025em',
  },
  h2: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: 1.375,
    letterSpacing: '0',
  },
  h3: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  h4: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0',
  },

  // Body styles
  body1: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.625,
    letterSpacing: '0',
  },
  body2: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0',
  },

  // Caption styles
  caption: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.025em',
    textTransform: 'uppercase' as const,
  },
  overline: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },

  // Code styles
  codeInline: {
    fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  codeBlock: {
    fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: '0',
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