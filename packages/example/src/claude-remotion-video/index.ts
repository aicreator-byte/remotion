import {useCurrentFrame, interpolate, spring} from 'remotion';
import React from 'react';

// Re-export utilities
export * from './utils/animations';
export * from './utils/colors';
export * from './utils/typography';

// Re-export components
export * from './components/CodeBlock';
export * from './components/Terminal';
export * from './components/ChatBubble';
export * from './components/GradientText';
export * from './components/GlowingCard';
export * from './components/AnimatedCounter';
export * from './components/ProgressRing';
export * from './components/ParticleBackground';
export * from './components/SceneTransition';

// Re-export scenes
export * from './scenes/Scene1_Hook';
export * from './scenes/Scene2_WhatIsRemotion';
export * from './scenes/Scene3_RoleOfClaude';
export * from './scenes/Scene4_TheWorkflow';
export * from './scenes/Scene5_RealExample';
export * from './scenes/Scene6_TipsAndTricks';
export * from './scenes/Scene7_Closing';