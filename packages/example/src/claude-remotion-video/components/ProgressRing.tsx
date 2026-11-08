import React from 'react';
import {colors} from '../utils/colors';
import {useCurrentFrame, interpolate} from 'remotion';

interface ProgressRingProps {
  progress: number; // 0 to 1
  startFrame?: number;
  duration?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  fontSize?: string;
  gap?: number;
  children?: React.ReactNode;
}

export const ProgressRing = ({
  progress = 0,
  startFrame = 0,
  duration = 60,
  size = 120,
  strokeWidth = 8,
  color = colors.primary,
  backgroundColor = colors.borderSubtle,
  showPercentage = true,
  fontSize = '28px',
  gap = 16,
  children,
}: ProgressRingProps) => {
  const frame = useCurrentFrame();
  const animatedProgress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, progress],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - animatedProgress);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap}}>
      <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 0.1s linear',
            filter: `drop-shadow(0 0 8px ${withOpacity(color, 0.5)})`,
          }}
        />
      </svg>

      {(showPercentage || children) && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
          {showPercentage && (
            <span
              style={{
                fontSize,
                fontWeight: 700,
                color: colors.textPrimary,
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              {Math.round(animatedProgress * 100)}%
            </span>
          )}
          {children}
        </div>
      )}
    </div>
  );
};

// Animated progress ring that fills up
export const AnimatedProgressRing = ({
  endProgress = 1,
  startFrame = 0,
  duration = 60,
  size = 120,
  strokeWidth = 8,
  color = colors.primary,
  ...props
}: Omit<ProgressRingProps, 'progress'> & {endProgress?: number}) => {
  return <ProgressRing progress={endProgress} startFrame={startFrame} duration={duration} size={size} strokeWidth={strokeWidth} color={color} {...props} />;
};

// Multi-step progress indicator
export const StepProgress = ({
  currentStep,
  totalSteps,
  startFrame = 0,
  stepDuration = 30,
  size = 120,
  strokeWidth = 8,
  color = colors.primary,
  completedColor = colors.primary,
  pendingColor = colors.borderSubtle,
  labels: customLabels,
}: {
  currentStep: number; // 1-based
  totalSteps: number;
  startFrame?: number;
  stepDuration?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  completedColor?: string;
  pendingColor?: string;
  labels?: string[];
}) => {
  const frame = useCurrentFrame();
  const overallProgress = (currentStep - 1) / (totalSteps - 1);

  const stepProgress = Math.min(1, Math.max(0,
    (frame - startFrame - (currentStep - 1) * stepDuration) / stepDuration
  ));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const completedSteps = Math.max(0, currentStep - 1);
  const currentStepProgress = stepProgress;

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px'}}>
      <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={pendingColor}
          strokeWidth={strokeWidth}
        />

        {/* Completed steps arc */}
        {completedSteps > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={completedColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${(circumference * completedSteps) / totalSteps} ${circumference}`}
            strokeDashoffset={0}
            style={{filter: `drop-shadow(0 0 8px ${withOpacity(completedColor, 0.5)})`}}
          />
        )}

        {/* Current step progress */}
        {currentStep <= totalSteps && currentStepProgress > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${(circumference / totalSteps) * currentStepProgress} ${circumference}`}
            strokeDashoffset={(circumference * completedSteps) / totalSteps}
            style={{filter: `drop-shadow(0 0 8px ${withOpacity(color, 0.5)})`}}
          />
        )}
      </svg>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
        {customLabels && customLabels[currentStep - 1] && (
          <span style={{...colors, fontSize: '16px', fontWeight: 600, color: colors.textPrimary}}>
            {customLabels[currentStep - 1]}
          </span>
        )}
        <span style={{fontSize: '14px', color: colors.textMuted}}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

// Linear progress bar
export const LinearProgress = ({
  progress = 0,
  startFrame = 0,
  duration = 60,
  width = 400,
  height = 8,
  color = colors.primary,
  backgroundColor = colors.borderSubtle,
  borderRadius = 4,
  showLabel = false,
  label = '',
}: {
  progress?: number;
  startFrame?: number;
  duration?: number;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  showLabel?: boolean;
  label?: string;
}) => {
  const frame = useCurrentFrame();
  const animatedProgress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, progress],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start'}}>
      {showLabel && label && (
        <span style={{fontSize: '14px', fontWeight: 600, color: colors.textPrimary}}>
          {label} {Math.round(animatedProgress * 100)}%
        </span>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor,
          borderRadius,
          overflow: 'hidden',
          position: 'relative' as const,
        }}
      >
        <div
          style={{
            width: `${animatedProgress * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${colors.primaryLight})`,
            borderRadius,
            transition: 'width 0.1s linear',
            boxShadow: `0 0 12px ${withOpacity(color, 0.5)}`,
          }}
        />
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