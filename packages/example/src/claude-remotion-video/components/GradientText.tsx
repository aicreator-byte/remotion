import React from 'react';
import {colors, gradientText} from '../utils/colors';
import {typography} from '../utils/typography';

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const GradientText = ({
  children,
  gradient = colors.gradients.primary,
  className = '',
  style = {},
}: GradientTextProps) => {
  return (
    <span
      className={className}
      style={{
        ...style,
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
};

// Specific gradient text variants
export const PrimaryGradientText = ({children, ...props}: GradientTextProps) =>
  <GradientText gradient={colors.gradients.primary} {...props}>{children}</GradientText>;

export const SecondaryGradientText = ({children, ...props}: GradientTextProps) =>
  <GradientText gradient={colors.gradients.secondary} {...props}>{children}</GradientText>;

export const AccentGradientText = ({children, ...props}: GradientTextProps) =>
  <GradientText gradient={colors.gradients.accent} {...props}>{children}</GradientText>;

// Animated gradient text
export const AnimatedGradientText = ({
  children,
  gradient = colors.gradients.primary,
  speed = 0.5,
  ...props
}: GradientTextProps & {speed?: number}) => {
  // We'll use CSS animation for the gradient shift
  return (
    <span
      style={{
        ...props.style,
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        display: 'inline-block',
        animation: `gradientShift ${1 / speed}s ease infinite`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
};