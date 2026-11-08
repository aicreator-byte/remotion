import React from 'react';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {fadeIn, slideUp, scaleIn} from '../utils/animations';
import {useCurrentFrame} from 'remotion';

interface GlowingCardProps {
  children: React.ReactNode;
  startFrame?: number;
  duration?: number;
  intensity?: number;
  pulse?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const GlowingCard = ({
  children,
  startFrame = 0,
  duration = 40,
  intensity = 1,
  pulse = false,
  onClick,
  className = '',
  style = {},
}: GlowingCardProps) => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, startFrame, duration);
  const scale = scaleIn(frame, startFrame, duration, 0.95);

  const pulseGlow = pulse
    ? Math.sin(frame * 0.05) * 0.3 + 0.7
    : 1;

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: colors.bgCard,
        border: `1px solid ${colors.borderPrimary}`,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: `
          ${colors.shadows.md},
          0 0 ${30 * intensity * pulseGlow}px ${withOpacity(colors.primary, 0.15 * intensity * pulseGlow)}
        `,
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={onClick ? () => {} : undefined}
      onMouseLeave={onClick ? () => {} : undefined}
    >
      {children}
    </div>
  );
}

// Feature card with icon, title, description
export const FeatureCard = ({
  icon,
  title,
  description,
  startFrame = 0,
  duration = 40,
  index = 0,
  gradient = colors.gradients.primary,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  startFrame?: number;
  duration?: number;
  index?: number;
  gradient?: string;
}) => {
  const frame = useCurrentFrame();
  const delay = index * 8;
  const opacity = fadeIn(frame, startFrame + delay, duration);
  const slide = slideUp(frame, startFrame + delay, duration, 30);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slide}px)`,
        background: colors.bgCard,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
        boxShadow: colors.shadows.md,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
          boxShadow: `0 8px 24px ${withOpacity(colors.primary, 0.3)}`,
        }}
      >
        {icon}
      </div>

      <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary}}>
        {title}
      </h3>

      <p style={{...typography.body1, margin: 0, color: colors.textSecondary, lineHeight: 1.7}}>
        {description}
      </p>
    </div>
  );
};

// Stat card for numbers
export const StatCard = ({
  value,
  label,
  icon,
  startFrame = 0,
  duration = 40,
  index = 0,
  color = colors.primary,
}: {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  startFrame?: number;
  duration?: number;
  index?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const delay = index * 8;
  const opacity = fadeIn(frame, startFrame + delay, duration);
  const slide = slideUp(frame, startFrame + delay, duration, 30);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slide}px)`,
        background: colors.bgCard,
        border: `1px solid ${withOpacity(color, 0.3)}`,
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '12px',
        minWidth: '140px',
        boxShadow: `0 8px 24px ${withOpacity(color, 0.2)}`,
      }}
    >
      {icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${color}, ${darken(color, 0.2)})`,
          }}
        >
          {icon}
        </div>
      )}
      <div style={{fontSize: '48px', fontWeight: 800, color, lineHeight: 1, fontFamily: typography.fontFamilies.display}}>
        {value}
      </div>
      <div style={{...typography.caption, color: colors.textSecondary, textTransform: 'none'}}>
        {label}
      </div>
    </div>
  );
};

function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function darken(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - Math.round(255 * amount));
  const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - Math.round(255 * amount));
  const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - Math.round(255 * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}