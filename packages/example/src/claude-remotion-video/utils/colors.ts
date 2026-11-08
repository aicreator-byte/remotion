export const colors = {
  // Primary brand colors
  primary: '#00d4aa',
  primaryDark: '#00b894',
  primaryLight: '#55efc4',
  primaryGlow: 'rgba(0, 212, 170, 0.4)',

  // Secondary colors
  secondary: '#74b9ff',
  secondaryDark: '#0984e3',
  secondaryLight: '#a2d9ff',

  // Accent colors
  accent: '#fd79a8',
  accentDark: '#e84393',
  accentLight: '#fab1d0',

  // Warning/energy
  warning: '#ffeaa7',
  warningDark: '#fdcb6e',
  warningLight: '#fff5b8',

  // Error
  error: '#ff7675',
  errorDark: '#d63031',
  errorLight: '#fab1a0',

  // Dark theme backgrounds
  bgPrimary: '#0a0a0f',
  bgSecondary: '#11111a',
  bgTertiary: '#1a1a2e',
  bgCard: '#161622',
  bgCardHover: '#1e1e30',
  bgOverlay: 'rgba(10, 10, 15, 0.9)',

  // Borders
  borderPrimary: 'rgba(0, 212, 170, 0.3)',
  borderSecondary: 'rgba(116, 185, 255, 0.2)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderFocus: '#00d4aa',

  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b2bec3',
  textMuted: '#636e72',
  textDim: '#2d3436',
  textOnPrimary: '#0a0a0f',

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #00d4aa 0%, #00b894 100%)',
    primaryVertical: 'linear-gradient(180deg, #00d4aa 0%, #00b894 100%)',
    secondary: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    accent: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    dark: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
    card: 'linear-gradient(135deg, #161622 0%, #1e1e30 100%)',
    glow: 'radial-gradient(circle at center, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
    mesh: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
  },

  // Glass morphism
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.08)',
    heavy: 'rgba(255, 255, 255, 0.12)',
    border: 'rgba(255, 255, 255, 0.1)',
  },

  // Shadows
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 8px 24px rgba(0, 0, 0, 0.4)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.5)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.6)',
    glow: '0 0 40px rgba(0, 212, 170, 0.3)',
    glowSecondary: '0 0 40px rgba(116, 185, 255, 0.2)',
    inner: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
};

// Color utility functions
export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const lighten = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + Math.round(255 * amount));
  const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + Math.round(255 * amount));
  const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const darken = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const gradientText = (gradient: string): Record<string, string> => ({
  background: gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
});