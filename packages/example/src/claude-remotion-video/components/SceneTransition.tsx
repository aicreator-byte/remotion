import React from 'react';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {useCurrentFrame, interpolate, spring} from 'remotion';
import {fadeIn, fadeOut, slideUp, slideDown, slideLeft, slideRight, scaleIn, easing} from '../utils/animations';

interface SceneTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'iris' | 'push';
  direction?: 'in' | 'out';
  startFrame?: number;
  duration?: number;
  delay?: number;
  from?: number;
  to?: number;
}

export const SceneTransition = ({
  children,
  type = 'fade',
  direction = 'in',
  startFrame = 0,
  duration = 30,
  delay = 0,
  from,
  to,
}: SceneTransitionProps) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - delay;

  let opacity = 1;
  let transform = 'none';
  let clipPath = 'inset(0)';

  const progress = direction === 'in'
    ? Math.min(1, Math.max(0, (adjustedFrame - startFrame) / duration))
    : 1 - Math.min(1, Math.max(0, (adjustedFrame - startFrame) / duration));

  const easedProgress = easing.easeOut(progress);

  switch (type) {
    case 'fade':
      opacity = direction === 'in' ? easedProgress : 1 - easedProgress;
      break;
    case 'slideUp':
      opacity = direction === 'in' ? easedProgress : 1 - easedProgress;
      transform = `translateY(${direction === 'in'
        ? (from || 50) * (1 - easedProgress)
        : (to || 50) * easedProgress}px)`;
      break;
    case 'slideDown':
      opacity = direction === 'in' ? easedProgress : 1 - easedProgress;
      transform = `translateY(${direction === 'in'
        ? -(from || 50) * (1 - easedProgress)
        : -(to || 50) * easedProgress}px)`;
      break;
    case 'slideLeft':
      opacity = direction === 'in' ? easedProgress : 1 - easedProgress;
      transform = `translateX(${direction === 'in'
        ? (from || 50) * (1 - easedProgress)
        : (to || 50) * easedProgress}px)`;
      break;
    case 'slideRight':
      opacity = direction === 'in' ? easedProgress : 1 - easedProgress;
      transform = `translateX(${direction === 'in'
        ? -(from || 50) * (1 - easedProgress)
        : -(to || 50) * easedProgress}px)`;
      break;
    case 'scale':
      opacity = direction === 'in' ? easedProgress : 1 - easedProgress;
      transform = `scale(${direction === 'in'
        ? (from || 0.9) + (1 - (from || 0.9)) * easedProgress
        : 1 - (1 - (to || 0.9)) * easedProgress})`;
      break;
    case 'iris':
      // Iris transition - expanding/contracting circle
      const irisSize = direction === 'in'
        ? easedProgress * 150
        : (1 - easedProgress) * 150;
      clipPath = `circle(${irisSize}% at 50% 50%)`;
      break;
    case 'push':
      // Push transition - new scene pushes old scene
      const pushDistance = direction === 'in'
        ? (from || 100) * (1 - easedProgress)
        : (to || 100) * easedProgress;
      transform = `translateX(${pushDistance}px)`;
      opacity = direction === 'in' ? easedProgress : 1;
      break;
  }

  return (
    <div
      style={{
        opacity,
        transform,
        clipPath,
        willChange: 'opacity, transform, clipPath',
      }}
    >
      {children}
    </div>
  );
};

// Crossfade between two scenes
export const CrossFade = ({
  currentScene,
  nextScene,
  progress, // 0 to 1
  duration = 30,
}: {
  currentScene: React.ReactNode;
  nextScene: React.ReactNode;
  progress: number;
  duration?: number;
}) => {
  const easedProgress = easing.easeInOut(progress);

  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 1 - easedProgress,
          willChange: 'opacity',
        }}
      >
        {currentScene}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: easedProgress,
          willChange: 'opacity',
        }}
      >
        {nextScene}
      </div>
    </div>
  );
};

// Slide transition between scenes
export const SlideTransition = ({
  currentScene,
  nextScene,
  progress, // 0 to 1
  direction = 'left', // 'left' | 'right' | 'up' | 'down'
}: {
  currentScene: React.ReactNode;
  nextScene: React.ReactNode;
  progress: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}) => {
  const easedProgress = easing.easeOut(progress);
  const distance = direction === 'up' || direction === 'left' ? 1 : -1;

  const currentTransform = direction === 'up' || direction === 'left'
    ? `translateY(-${easedProgress * 100}%)`
    : direction === 'down' || direction === 'right'
      ? `translateY(${easedProgress * 100}%)`
      : 'none';

  const nextTransform = direction === 'up' || direction === 'left'
    ? `translateY(${100 - easedProgress * 100}%)`
    : direction === 'down' || direction === 'right'
      ? `translateY(${-100 + easedProgress * 100}%)`
      : 'none';

  return (
    <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: currentTransform,
          willChange: 'transform',
        }}
      >
        {currentScene}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: nextTransform,
          willChange: 'transform',
        }}
      >
        {nextScene}
      </div>
    </div>
  );
};

// Zoom transition
export const ZoomTransition = ({
  currentScene,
  nextScene,
  progress, // 0 to 1
}: {
  currentScene: React.ReactNode;
  nextScene: React.ReactNode;
  progress: number;
}) => {
  const easedProgress = easing.easeInOut(progress);
  const scaleOut = 1 + easedProgress * 0.2;
  const scaleIn = 1.2 - easedProgress * 0.2;

  return (
    <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scaleOut})`,
          opacity: 1 - easedProgress,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        {currentScene}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `scale(${scaleIn})`,
          opacity: easedProgress,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        {nextScene}
      </div>
    </div>
  );
};

// Page flip transition
export const PageFlipTransition = ({
  currentScene,
  nextScene,
  progress, // 0 to 1
}: {
  currentScene: React.ReactNode;
  nextScene: React.ReactNode;
  progress: number;
}) => {
  const easedProgress = easing.easeInOut(progress);

  return (
    <div style={{position: 'relative', width: '100%', height: '100%', perspective: '1000px'}}>
      {/* Current scene - flipping out */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `rotateY(${easedProgress * 90}deg)`,
          transformOrigin: 'center right',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        {currentScene}
      </div>

      {/* Next scene - flipping in */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: `rotateY(${90 - easedProgress * 90}deg)`,
          transformOrigin: 'center left',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        {nextScene}
      </div>
    </div>
  );
};

// Transition manager for sequencing multiple scenes
export const SceneSequence = ({
  scenes,
  currentSceneIndex,
  transitionDuration = 30,
  transitionType = 'fade',
}: {
  scenes: React.ReactNode[];
  currentSceneIndex: number;
  transitionDuration?: number;
  transitionType?: 'fade' | 'slide' | 'zoom' | 'flip';
}) => {
  const currentScene = scenes[currentSceneIndex];
  const nextScene = scenes[currentSceneIndex + 1];

  if (!nextScene) {
    return <>{currentScene}</>;
  }

  // This would need frame-based progress from parent
  // For now, just render current scene
  return <>{currentScene}</>;
};

// Simple scene switcher with automatic transitions
export const AutoSceneTransition = ({
  scenes,
  sceneDurations, // frames each scene stays visible
  transitionDuration = 30,
}: {
  scenes: React.ReactNode[];
  sceneDurations: number[];
  transitionDuration?: number;
}) => {
  const frame = useCurrentFrame();

  let accumulatedFrames = 0;
  let currentSceneIndex = 0;
  let progressInTransition = 0;

  for (let i = 0; i < scenes.length; i++) {
    const sceneDuration = sceneDurations[i] || 180;
    const nextSceneDuration = sceneDurations[i + 1] || 180;

    if (frame < accumulatedFrames + sceneDuration) {
      currentSceneIndex = i;
      break;
    }

    // Check if in transition
    if (frame < accumulatedFrames + sceneDuration + transitionDuration) {
      progressInTransition = (frame - accumulatedFrames - sceneDuration) / transitionDuration;
      currentSceneIndex = i;
      break;
    }

    accumulatedFrames += sceneDuration + transitionDuration;
  }

  if (currentSceneIndex >= scenes.length - 1) {
    return <>{scenes[scenes.length - 1]}</>;
  }

  const currentScene = scenes[currentSceneIndex];
  const nextScene = scenes[currentSceneIndex + 1];

  switch (transitionType) {
    case 'slide':
      return (
        <SlideTransition
          currentScene={currentScene}
          nextScene={nextScene}
          progress={progressInTransition}
        />
      );
    case 'zoom':
      return (
        <ZoomTransition
          currentScene={currentScene}
          nextScene={nextScene}
          progress={progressInTransition}
        />
      );
    case 'flip':
      return (
        <PageFlipTransition
          currentScene={currentScene}
          nextScene={nextScene}
          progress={progressInTransition}
        />
      );
    default:
      return (
        <CrossFade
          currentScene={currentScene}
          nextScene={nextScene}
          progress={progressInTransition}
        />
      );
  }
};