import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors, gradientText} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, fadeOut, slideUp, slideDown, slideRight,
  easing, SlideReveal, ScaleFadeIn, TypewriterText, PulseGlow, FloatingElement
} from '../utils/animations';
import {GradientText, PrimaryGradientText} from '../components/GradientText';
import {CodeBlock, TypingCodeBlock} from '../components/CodeBlock';
import {ChatBubble, StreamingChatBubble} from '../components/ChatBubble';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {AnimatedCounter} from '../components/AnimatedCounter';
import {GlowingCard, FeatureCard} from '../components/GlowingCard';
import {ProgressRing, LinearProgress} from '../components/ProgressRing';

export const SCENE1_DURATION = 600; // 20 seconds at 30fps

interface Scene1HookProps {
  startFrame?: number;
}

export const Scene1_Hook = ({startFrame = 0}: Scene1HookProps) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE1_DURATION) {
    return null;
  }

  return (
    <div
      style={{
        width: '1920px',
        height: '1080px',
        position: 'relative',
        background: colors.bgPrimary,
        overflow: 'hidden',
        fontFamily: typography.fontFamilies.sans,
        color: colors.textPrimary,
      }}
    >
      {/* Background layers */}
      <MeshGradient width={1920} height={1080} speed={0.015} />
      <ParticleBackground
        particleCount={40}
        width={1920}
        height={1080}
        color={colors.primary}
        speed={0.15}
        sizeRange={[1, 2.5]}
        opacityRange={[0.08, 0.3]}
        connectDistance={100}
      />
      <FloatingShapes
        count={12}
        width={1920}
        height={1080}
        colors={[colors.primary, colors.secondary, colors.accent]}
        minSize={30}
        maxSize={120}
        speed={0.08}
      />
      <NoiseOverlay width={1920} height={1080} opacity={0.02} />

      {/* Main content */}
      <div style={{position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px', boxSizing: 'border-box'}}>

        {/* Opening question - types out */}
        <TypewriterText
          text="Bagaimana jika kamu bisa membuat video profesional hanya dengan memberikan instruksi kepada AI?"
          startFrame={30}
          charsPerFrame={3}
          delay={0}
        />

        {/* Divider line */}
        <SlideReveal startFrame={200} duration={40} direction="up" delay={0}>
          <div style={{
            width: '200px',
            height: '4px',
            background: colors.gradients.primary,
            marginTop: '32px',
            marginBottom: '32px',
            borderRadius: '2px',
          }} />
        </SlideReveal>

        {/* Main title with gradient */}
        <SlideReveal startFrame={250} duration={50} direction="up" delay={0}>
          <h1 style={{
            ...typography.display1,
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.05,
          }}>
            <PrimaryGradientText>CREATE VIDEOS</PrimaryGradientText>{' '}
            <span style={{color: colors.textSecondary}}>WITH</span> {' '}
            <PrimaryGradientText>AI</PrimaryGradientText>
          </h1>
        </SlideReveal>

        {/* Subtitle */}
        <SlideReveal startFrame={350} duration={40} direction="up" delay={0}>
          <p style={{
            ...typography.h2,
            color: colors.textMuted,
            margin: '16px 0 0',
            textAlign: 'center',
            fontWeight: 400,
          }}>
            Claude + Remotion
          </p>
        </SlideReveal>

        {/* Animated stats cards */}
        <SlideReveal startFrame={450} duration={50} direction="up" delay={0}>
          <div style={{
            display: 'flex',
            gap: '32px',
            marginTop: '64px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <FeatureCard
              icon={<span style={{fontSize: '24px'}}>⚡</span>}
              title="Zero Editing Skills"
              description="Write prompts, not keyframes"
              index={0}
            />
            <FeatureCard
              icon={<span style={{fontSize: '24px'}}>🎨</span>}
              title="Code-Based"
              description="React components become video frames"
              index={1}
            />
            <FeatureCard
              icon={<span style={{fontSize: '24px'}}>🤖</span>}
              title="AI Assisted"
              description="Claude writes the heavy lifting"
              index={2}
            />
          </div>
        </SlideReveal>

        {/* Floating code snippets in background */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '80px',
          display: 'flex',
          gap: '24px',
          opacity: 0.4,
        }}>
          <CodeBlock
            code={`// Your idea
const concept = "AI video tutorial";

// Ask Claude
const storyboard = await claude.generate(concept);

// Generate Remotion code
const components = await claude.toRemotion(storyboard);`}
            language="typescript"
            startFrame={500}
            duration={40}
            fontSize="11px"
          />
        </div>

        {/* Pulsing indicator */}
        <PulseGlow startFrame={550} duration={120} intensity={0.8}>
          <div style={{
            marginTop: '80px',
            padding: '16px 32px',
            background: withOpacity(colors.primary, 0.1),
            border: `1px solid ${withOpacity(colors.primary, 0.3)}`,
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: colors.primary,
            fontSize: '14px',
            fontWeight: 600,
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: colors.primary,
              animation: 'pulse 1.5s infinite',
            }} />
            Watch the full workflow →
            <style jsx>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(0.8); }
              }
            `}</style>
          </div>
        </PulseGlow>
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