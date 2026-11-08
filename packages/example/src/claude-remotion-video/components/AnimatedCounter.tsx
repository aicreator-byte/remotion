import React from 'react';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {useCurrentFrame, interpolate} from 'remotion';

interface AnimatedCounterProps {
  endValue: number;
  startValue?: number;
  startFrame?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: string;
  color?: string;
  easing?: (t: number) => number;
}

export const AnimatedCounter = ({
  endValue,
  startValue = 0,
  startFrame = 0,
  duration = 60,
  decimals = 0,
  prefix = '',
  suffix = '',
  fontSize = '48px',
  color = colors.primary,
  easing = (t) => 1 - Math.pow(1 - t, 3), // easeOut
}: AnimatedCounterProps) => {
  const frame = useCurrentFrame();

  const progress = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const easedProgress = easing(progress);
  const currentValue = startValue + (endValue - startValue) * easedProgress;

  const formattedValue = currentValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span
      style={{
        fontSize,
        fontWeight: 800,
        color,
        fontFamily: typography.fontFamilies.display,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '4px',
      }}
    >
      {prefix && <span style={{color: colors.textSecondary, fontSize: '0.6em', fontWeight: 600}}>{prefix}</span>}
      {formattedValue}
      {suffix && <span style={{color: colors.textSecondary, fontSize: '0.5em', fontWeight: 600, marginTop: '0.2em'}}>{suffix}</span>}
    </span>
  );
};

// Count up from 0 with stagger
export const StaggeredCounters = ({
  counters,
  startFrame = 0,
  duration = 60,
  staggerDelay = 10,
  ...props
}: {
  counters: Array<Omit<AnimatedCounterProps, 'startFrame' | 'duration'>>;
  startFrame?: number;
  duration?: number;
  staggerDelay?: number;
} & Omit<AnimatedCounterProps, 'endValue' | 'startValue'>) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      {counters.map((counter, index) => (
        <AnimatedCounter
          key={index}
          {...props}
          {...counter}
          startFrame={startFrame + index * staggerDelay}
          duration={duration}
        />
      ))}
    </div>
  );
};

// Animated number with comma formatting
export const AnimatedNumber = ({
  value,
  startFrame = 0,
  duration = 60,
  fontSize = '48px',
  color = colors.primary,
  showCommas = true,
}: {
  value: number;
  startFrame?: number;
  duration?: number;
  fontSize?: string;
  color?: string;
  showCommas?: boolean;
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, (frame - startFrame) / duration));
  const easedProgress = 1 - Math.pow(1 - progress, 3);
  const currentValue = Math.floor(value * easedProgress);

  const formatted = showCommas
    ? currentValue.toLocaleString()
    : currentValue.toString();

  return (
    <span
      style={{
        fontSize,
        fontWeight: 800,
        color,
        fontFamily: typography.fontFamilies.display,
        lineHeight: 1,
      }}
    >
      {formatted}
    </span>
  );
};

// Percentage counter
export const PercentageCounter = ({
  endValue = 100,
  startFrame = 0,
  duration = 60,
  fontSize = '48px',
  color = colors.primary,
  showPercentSign = true,
}: {
  endValue?: number;
  startFrame?: number;
  duration?: number;
  fontSize?: string;
  color?: string;
  showPercentSign?: boolean;
}) => {
  return (
    <AnimatedCounter
      endValue={endValue}
      startFrame={startFrame}
      duration={duration}
      decimals={0}
      suffix={showPercentSign ? '%' : ''}
      fontSize={fontSize}
      color={color}
    />
  );
};