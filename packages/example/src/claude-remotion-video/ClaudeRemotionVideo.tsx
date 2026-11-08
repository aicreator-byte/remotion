import {Sequence, useCurrentFrame} from 'remotion';
import React from 'react';
import {Scene1_Hook, SCENE1_DURATION} from './scenes/Scene1_Hook';
import {Scene2_WhatIsRemotion, SCENE2_DURATION} from './scenes/Scene2_WhatIsRemotion';
import {Scene3_RoleOfClaude, SCENE3_DURATION} from './scenes/Scene3_RoleOfClaude';
import {Scene4_TheWorkflow, SCENE4_DURATION} from './scenes/Scene4_TheWorkflow';
import {Scene5_RealExample, SCENE5_DURATION} from './scenes/Scene5_RealExample';
import {Scene6_TipsAndTricks, SCENE6_DURATION} from './scenes/Scene6_TipsAndTricks';
import {Scene7_Closing, SCENE7_DURATION} from './scenes/Scene7_Closing';

// Total duration in frames
export const CLAUDE_REMOTION_VIDEO_DURATION = 
  SCENE1_DURATION + 
  SCENE2_DURATION + 
  SCENE3_DURATION + 
  SCENE4_DURATION + 
  SCENE5_DURATION + 
  SCENE6_DURATION + 
  SCENE7_DURATION;

export const CLAUDE_REMOTION_VIDEO_FPS = 30;
export const CLAUDE_REMOTION_VIDEO_WIDTH = 1920;
export const CLAUDE_REMOTION_VIDEO_HEIGHT = 1080;

// Duration in seconds
export const CLAUDE_REMOTION_VIDEO_DURATION_SECONDS = CLAUDE_REMOTION_VIDEO_DURATION / CLAUDE_REMOTION_VIDEO_FPS;

export const ClaudeRemotionVideo = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <Sequence from={0} durationInFrames={SCENE1_DURATION}>
        <Scene1_Hook startFrame={0} />
      </Sequence>

      <Sequence from={SCENE1_DURATION} durationInFrames={SCENE2_DURATION}>
        <Scene2_WhatIsRemotion startFrame={SCENE1_DURATION} />
      </Sequence>

      <Sequence from={SCENE1_DURATION + SCENE2_DURATION} durationInFrames={SCENE3_DURATION}>
        <Scene3_RoleOfClaude startFrame={SCENE1_DURATION + SCENE2_DURATION} />
      </Sequence>

      <Sequence from={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION} durationInFrames={SCENE4_DURATION}>
        <Scene4_TheWorkflow startFrame={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION} />
      </Sequence>

      <Sequence from={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION} durationInFrames={SCENE5_DURATION}>
        <Scene5_RealExample startFrame={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION} />
      </Sequence>

      <Sequence from={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION} durationInFrames={SCENE6_DURATION}>
        <Scene6_TipsAndTricks startFrame={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION} />
      </Sequence>

      <Sequence from={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION} durationInFrames={SCENE7_DURATION}>
        <Scene7_Closing startFrame={SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION} />
      </Sequence>
    </>
  );
};

// Scene timing reference for debugging
export const SCENE_TIMINGS = {
  scene1: {name: 'Hook', startFrame: 0, duration: SCENE1_DURATION, startTime: '0:00'},
  scene2: {name: 'What is Remotion', startFrame: SCENE1_DURATION, duration: SCENE2_DURATION, startTime: `${Math.floor(SCENE1_DURATION / 30)}:${String(SCENE1_DURATION % 30).padStart(2, '0')}`},
  scene3: {name: 'Role of Claude', startFrame: SCENE1_DURATION + SCENE2_DURATION, duration: SCENE3_DURATION, startTime: `${Math.floor((SCENE1_DURATION + SCENE2_DURATION) / 30)}:${String((SCENE1_DURATION + SCENE2_DURATION) % 30).padStart(2, '0')}`},
  scene4: {name: 'The Workflow', startFrame: SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION, duration: SCENE4_DURATION, startTime: `${Math.floor((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION) / 30)}:${String((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION) % 30).padStart(2, '0')}`},
  scene5: {name: 'Real Example', startFrame: SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION, duration: SCENE5_DURATION, startTime: `${Math.floor((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION) / 30)}:${String((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION) % 30).padStart(2, '0')}`},
  scene6: {name: 'Tips & Tricks', startFrame: SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION, duration: SCENE6_DURATION, startTime: `${Math.floor((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION) / 30)}:${String((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION) % 30).padStart(2, '0')}`},
  scene7: {name: 'Closing', startFrame: SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION, duration: SCENE7_DURATION, startTime: `${Math.floor((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION) / 30)}:${String((SCENE1_DURATION + SCENE2_DURATION + SCENE3_DURATION + SCENE4_DURATION + SCENE5_DURATION + SCENE6_DURATION) % 30).padStart(2, '0')}`},
};