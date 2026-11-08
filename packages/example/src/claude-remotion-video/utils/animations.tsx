import {interpolate, spring, useCurrentFrame} from 'remotion';
import React from 'react';

export const fadeIn = (frame: number, start: number, duration: number): number => {
  if (frame < start) return 0;
  if (frame > start + duration) return 1;
  return (frame - start) / duration;
};

export const fadeOut = (frame: number, start: number, duration: number): number => {
  if (frame < start) return 1;
  if (frame > start + duration) return 0;
  return 1 - (frame - start) / duration;
};

export const slideUp = (frame: number, start: number, duration: number, distance = 100): number => {
  if (frame < start) return distance;
  if (frame > start + duration) return 0;
  return distance - (distance * (frame - start) / duration);
};

export const slideDown = (frame: number, start: number, duration: number, distance = 100): number => {
  if (frame < start) return -distance;
  if (frame > start + duration) return 0;
  return -distance + (distance * (frame - start) / duration);
};

export const slideLeft = (frame: number, start: number, duration: number, distance = 100): number => {
  if (frame < start) return distance;
  if (frame > start + duration) return 0;
  return distance - (distance * (frame - start) / duration);
};

export const slideRight = (frame: number, start: number, duration: number, distance = 100): number => {
  if (frame < start) return -distance;
  if (frame > start + duration) return 0;
  return -distance + (distance * (frame - start) / duration);
};

export const scaleIn = (frame: number, start: number, duration: number, from = 0.8): number => {
  if (frame < start) return from;
  if (frame > start + duration) return 1;
  return from + ((1 - from) * (frame - start) / duration);
};

export const rotateIn = (frame: number, start: number, duration: number, fromDeg = 10): number => {
  if (frame < start) return fromDeg;
  if (frame > start + duration) return 0;
  return fromDeg - (fromDeg * (frame - start) / duration);
};

export const useSpringValue = (target: number, stiffness = 150, damping = 20): number => {
  const frame = useCurrentFrame();
  return spring(frame, {
    frameRate: 30,
    stiffness,
    damping,
    initialValue: 0,
    target,
  });
};

export const staggerFrames = (index: number, baseDelay = 8, frameOffset = 0): number => {
  return frameOffset + (index * baseDelay);
};

export const easing = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

export const SlideReveal = ({
  children,
  startFrame,
  duration = 40,
  direction = 'up',
  delay = 0,
}: {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;
  const opacity = fadeIn(adjustedFrame, startFrame, duration);

  let translateX = 0;
  let translateY = 0;

  switch (direction) {
    case 'up':
      translateY = slideUp(adjustedFrame, startFrame, duration);
      break;
    case 'down':
      translateY = slideDown(adjustedFrame, startFrame, duration);
      break;
    case 'left':
      translateX = slideLeft(adjustedFrame, startFrame, duration);
      break;
    case 'right':
      translateX = slideRight(adjustedFrame, startFrame, duration);
      break;
  }

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export const ScaleFadeIn = ({
  children,
  startFrame,
  duration = 40,
  from = 0.85,
  delay = 0,
}: {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  from?: number;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;
  const opacity = fadeIn(adjustedFrame, startFrame, duration);
  const scale = scaleIn(adjustedFrame, startFrame, duration, from);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export const TypewriterText = ({
  text,
  startFrame,
  charsPerFrame = 2,
  delay = 0,
}: {
  text: string;
  startFrame: number;
  charsPerFrame?: number;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;
  const visibleChars = Math.floor(Math.max(0, (adjustedFrame - startFrame) * charsPerFrame));
  const displayText = text.slice(0, visibleChars);

  return <span>{displayText}</span>;
};

export const PulseGlow = ({
  children,
  startFrame,
  duration = 60,
  intensity = 1,
}: {
  children: React.ReactNode;
  startFrame: number;
  duration?: number;
  intensity?: number;
}) => {
  const frame = useCurrentFrame();
  const progress = (frame - startFrame) / duration;
  const glow = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
  const opacity = glow * intensity;

  return (
    <div
      style={{
        filter: `drop-shadow(0 0 ${20 * opacity}px rgba(0, 212, 170, ${opacity * 0.6}))`,
      }}
    >
      {children}
    </div>
  );
};

export const FloatingElement = ({
  children,
  startFrame,
  amplitude = 8,
  frequency = 0.02,
  phase = 0,
}: {
  children: React.ReactNode;
  startFrame: number;
  amplitude?: number;
  frequency?: number;
  phase?: number;
}) => {
  const frame = useCurrentFrame();
  const y = Math.sin((frame - startFrame) * frequency + phase) * amplitude;

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};