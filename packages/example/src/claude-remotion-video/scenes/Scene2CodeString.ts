// Pre-escaped code string for Scene5 CodeBlock display
// Angle brackets are escaped using Unicode escape sequences to prevent bundler from parsing as JSX

export const SCENE2_DISPLAY_CODE = `import { useCurrentFrame } from 'remotion';
import { colors } from '../utils/colors';
import { typography } from '../utils/typography';
import { SlideReveal } from '../utils/animations';
import { FeatureCard, GlowingCard } from '../components/GlowingCard';

export const SCENE2_DURATION = 900;

export const Scene2_WhatIsRemotion = ({startFrame = 0}) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;
  if (sceneFrame < 0 || sceneFrame > SCENE2_DURATION) return null;

  return (
    \u003Cdiv style={{width: 1920, height: 1080, ...}}\u003E
      \u003CMeshGradient width={1920} height={1080} /\u003E
      \u003CParticleBackground particleCount={30} ... /\u003E
      
      \u003Cdiv style={{padding: 80, ...}}\u003E
        \u003CSlideReveal startFrame={0} ...\u003E
          \u003Ch2\u003EApa itu \u003CPrimaryGradientText\u003ERemotion\u003C/PrimaryGradientText\u003E?\u003C/h2\u003E
        \u003C/SlideReveal\u003E
        \u003CSlideReveal startFrame={150} ...\u003E
          \u003Cp\u003ERemotion adalah framework...\u003C/p\u003E
        \u003C/SlideReveal\u003E
        \u003CSlideReveal startFrame={300} ...\u003E
          \u003Cdiv style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}\u003E
            \u003CFeatureCard icon="\u{1F4E6}" title="Composable" ... /\u003E
            \u003CFeatureCard icon="\u{23F1}\u{FE0F}" title="Frame-Accurate" ... /\u003E
            \u003CFeatureCard icon="\u{1F504}" title="Programmatic" ... /\u003E
            \u003CFeatureCard icon="\u{1F3AC}" title="Production Ready" ... /\u003E
          \u003C/div\u003E
        \u003C/SlideReveal\u003E
        \u003CSlideReveal startFrame={550} ...\u003E
          \u003CCodeBlock code={...} language="tsx" /\u003E
        \u003C/SlideReveal\u003E
      \u003C/div\u003E
    \u003C/div\u003E
  );
};`;