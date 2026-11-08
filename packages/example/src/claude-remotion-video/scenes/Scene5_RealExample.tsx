import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, slideUp, SlideReveal, ScaleFadeIn
} from '../utils/animations';
import {PrimaryGradientText, SecondaryGradientText} from '../components/GradientText';
import {CodeBlock, TypingCodeBlock} from '../components/CodeBlock';
import {Terminal} from '../components/Terminal';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {GlowingCard, FeatureCard} from '../components/GlowingCard';
import {AnimatedCounter} from '../components/AnimatedCounter';
import {ProgressRing} from '../components/ProgressRing';

export const SCENE5_DURATION = 900; // 30 seconds

interface Scene5Props {
  startFrame?: number;
}

export const Scene5_RealExample = ({startFrame = 0}: Scene5Props) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE5_DURATION) {
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
      <MeshGradient width={1920} height={1080} speed={0.006} />
      <ParticleBackground
        particleCount={20}
        width={1920}
        height={1080}
        color={colors.secondary}
        speed={0.05}
        sizeRange={[1, 2]}
        opacityRange={[0.03, 0.15]}
        connectDistance={60}
      />
      <NoiseOverlay width={1920} height={1080} opacity={0.02} />

      <div style={{position: 'relative', zIndex: 10, width: '100%', height: '100%', padding: '80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>

        <SlideReveal startFrame={0} duration={40} direction="down">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px'}}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colors.gradients.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{fontSize: '24px'}}>💻</span>
            </div>
            <div>
              <SecondaryGradientText style={{...typography.h3, margin: 0}}>SCENE 5</SecondaryGradientText>
              <div style={{...typography.caption, color: colors.textMuted, marginTop: '4px'}}>Real Example: Live Coding</div>
            </div>
          </div>
        </SlideReveal>

        <SlideReveal startFrame={50} duration={50} direction="up">
          <h2 style={{
            ...typography.display2,
            margin: 0,
            lineHeight: 1.15,
          }}>
            Contoh Nyata: <PrimaryGradientText>Live Coding</PrimaryGradientText> sebuah Scene
          </h2>
        </SlideReveal>

        {/* Before/After comparison */}
        <SlideReveal startFrame={150} duration={50} direction="up">
          <p style={{
            ...typography.body1,
            color: colors.textSecondary,
            lineHeight: 1.8,
            fontSize: '20px',
            maxWidth: '900px',
            margin: '24px 0 0',
          }}>
            Mari kita lihat bagaimana Claude membantu membuat scene <strong style={{color: colors.primary}}>Scene 2: What is Remotion</strong> dari nol hingga siap render.
          </p>
        </SlideReveal>

        {/* Side by side: Prompt → Code → Preview */}
        <SlideReveal startFrame={300} duration={50} direction="up">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            marginTop: '40px',
            maxWidth: '1400px',
            alignItems: 'start',
          }}>
            {/* Left: Prompt & Code */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <GlowingCard style={{padding: '24px'}}>
                <div style={{...typography.caption, color: colors.textMuted, marginBottom: '16px'}}>PROMPT KE CLAUDE</div>
                <div style={{
                  background: colors.bgSecondary,
                  border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: '12px',
                  padding: '20px',
                  fontFamily: typography.fontFamilies.sans,
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: colors.textPrimary,
                  whiteSpace: 'pre-wrap',
                }}>
{`Buatkan komponen Remotion untuk scene
"What is Remotion?" dengan spesifikasi:

- Durasi: 30 detik (900 frames @ 30fps)
- Resolution: 1920x1080
- Content: Judul, 4 fitur utama (card grid),
  code example, visual pipeline React→Video
- Style: Dark tech, gradient text, animated cards
- Animations: Staggered fade-in, slide-up
- Background: Mesh gradient + particles`}

                </div>
              </GlowingCard>

              <GlowingCard style={{padding: '24px'}}>
                <div style={{...typography.caption, color: colors.textMuted, marginBottom: '16px'}}>CLAUDE OUTPUT: Scene2_WhatIsRemotion.tsx</div>
                <CodeBlock
                  code={`import { useCurrentFrame } from 'remotion';
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
    <div style={{width: 1920, height: 1080, ...}}>
      <MeshGradient width={1920} height={1080} />
      <ParticleBackground particleCount={30} ... />
      
      <div style={{padding: 80, ...}}>
        <SlideReveal startFrame={0} ...>
          <h2>Apa itu <PrimaryGradientText>Remotion</PrimaryGradientText>?</h2>
        </SlideReveal>
        <SlideReveal startFrame={150} ...>
          <p>Remotion adalah framework...</p>
        </SlideReveal>
        <SlideReveal startFrame={300} ...>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
            <FeatureCard icon="📦" title="Composable" ... />
            <FeatureCard icon="⏱️" title="Frame-Accurate" ... />
            <FeatureCard icon="🔄" title="Programmatic" ... />
            <FeatureCard icon="🎬" title="Production Ready" ... />
          </div>
        </SlideReveal>
        <SlideReveal startFrame={550} ...>
          <CodeBlock code={...} language="tsx" />
        </SlideReveal>
      </div>
    </div>
  );
};`}
                  language="tsx"
                  startFrame={0}
                  duration={0}
                  fontSize="11px"
                  highlightLines={[1, 2, 3, 15, 16, 24, 25, 34, 35, 44, 45, 54, 55]}
                />
              </GlowingCard>
            </div>

            {/* Right: Preview simulation */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
              <GlowingCard style={{padding: '24px', height: 'fit-content'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
                  <div style={{...typography.caption, color: colors.textMuted}}>REAL-TIME PREVIEW (Remotion Studio)</div>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: colors.primary,
                    boxShadow: `0 0 12px ${colors.primary}`,
                    animation: 'pulse 1.5s infinite',
                  }} />
                </div>
                <div style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  background: colors.bgSecondary,
                  borderRadius: '12px',
                  border: `1px solid ${colors.borderSubtle}`,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  {/* Simulated preview content */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    padding: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <PrimaryGradientText style={{fontSize: '48px', fontWeight: 800, marginBottom: '16px'}}>
                      Apa itu Remotion?
                    </PrimaryGradientText>
                    <p style={{color: colors.textSecondary, fontSize: '18px', maxWidth: '600px', lineHeight: 1.7, marginBottom: '32px'}}>
                      Remotion adalah framework berbasis React yang memungkinkan kita membuat video menggunakan kode.
                    </p>
                    <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center'}}>
                      {['Composable', 'Frame-Accurate', 'Programmatic', 'Production Ready'].map((feat, i) => (
                        <div key={i} style={{
                          padding: '12px 24px',
                          background: withOpacity(colors.primary, 0.15),
                          border: `1px solid ${withOpacity(colors.primary, 0.3)}`,
                          borderRadius: '50px',
                          color: colors.primary,
                          fontWeight: 600,
                          fontSize: '14px',
                          animation: `fadeInUp 0.4s ease-out ${i * 0.1}s forwards`,
                          opacity: 0,
                        }}>
                          {feat}
                          <style jsx>{`
                            @keyframes fadeInUp {
                              from { opacity: 0; transform: translateY(20px); }
                              to { opacity: 1; transform: translateY(0); }
                            }
                          `}</style>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowingCard>

              {/* Iteration log */}
              <GlowingCard style={{padding: '24px'}}>
                <div style={{...typography.caption, color: colors.textMuted, marginBottom: '16px'}}>ITERATION LOG (Hot Reload)</div>
                <Terminal
                  lines={[
                    {type: 'output', content: '🔄 Hot reload triggered...', delay: 0},
                    {type: 'output', content: '✅ Scene2_WhatIsRemotion.tsx updated', delay: 10},
                    {type: 'output', content: '🎨 Gradient text applied to title', delay: 20},
                    {type: 'output', content: '📦 FeatureCard grid rendered (4 items)', delay: 30},
                    {type: 'output', content: '✨ Staggered animations: 120ms delay each', delay: 40},
                    {type: 'output', content: '🎯 MeshGradient + ParticleBackground active', delay: 50},
                    {type: 'success', content: 'Preview refreshed. 900 frames ready.', delay: 70},
                  ]}
                  startFrame={0}
                  fontSize="12px"
                />
              </GlowingCard>
            </div>
          </div>
        </SlideReveal>

        {/* Time saved metrics */}
        <SlideReveal startFrame={650} duration={50} direction="up">
          <div style={{marginTop: '48px', maxWidth: '1000px', width: '100%'}}>
            <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 24px', textAlign: 'center'}}>
              Efisiensi Waktu: Manual vs AI-Assisted
            </p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap'}}>
              <AnimatedCounter
                endValue={85}
                suffix="%"
                startFrame={0}
                duration={80}
                fontSize="72px"
                color={colors.primary}
              />
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <span style={{...typography.h3, color: colors.textMuted}}>Time Saved</span>
                <span style={{...typography.caption, color: colors.textDim}}>vs manual coding</span>
              </div>
              <AnimatedCounter
                endValue={15}
                suffix="min"
                startFrame={0}
                duration={80}
                fontSize="72px"
                color={colors.accent}
              />
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <span style={{...typography.h3, color: colors.textMuted}}>AI Assist Time</span>
                <span style={{...typography.caption, color: colors.textDim}}>prompt + review</span>
              </div>
            </div>
          </div>
        </SlideReveal>

        {/* Key takeaway */}
        <SlideReveal startFrame={750} duration={60} direction="up">
          <div style={{
            marginTop: '48px',
            padding: '32px',
            background: withOpacity(colors.secondary, 0.1),
            border: `1px solid ${withOpacity(colors.secondary, 0.3)}`,
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <SecondaryGradientText style={{...typography.h3, margin: '0 0 16px'}}>
              "Dari konsep ke komponen siap render
              <br />
              dalam hitungan menit, bukan jam."
            </SecondaryGradientText>
          </div>
        </SlideReveal>
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