import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, slideUp, SlideReveal, ScaleFadeIn
} from '../utils/animations';
import {PrimaryGradientText, SecondaryGradientText} from '../components/GradientText';
import {Terminal} from '../components/Terminal';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {GlowingCard, FeatureCard} from '../components/GlowingCard';
import {ProgressRing, LinearProgress, StepProgress} from '../components/ProgressRing';
import {AnimatedCounter} from '../components/AnimatedCounter';

export const SCENE4_DURATION = 900; // 30 seconds

interface Scene4Props {
  startFrame?: number;
}

export const Scene4_TheWorkflow = ({startFrame = 0}: Scene4Props) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE4_DURATION) {
    return null;
  }

  const workflowSteps = [
    {number: 1, icon: '💡', title: 'Tulis Konsep Video', desc: 'Ide, target audience, durasi, style', color: colors.primary},
    {number: 2, icon: '📋', title: 'Minta Storyboard ke Claude', desc: 'Scene breakdown, narasi, visual direction', color: colors.secondary},
    {number: 3, icon: '⚛️', title: 'Generate Komponen Remotion', desc: 'React components untuk tiap scene', color: colors.accent},
    {number: 4, icon: '👁️', title: 'Preview & Iterasi', desc: 'Remotion Studio, hot reload, fix visual', color: colors.warning},
    {number: 5, icon: '🔧', title: 'Claude Fix Issues', desc: 'Responsive, timing, performance, bugs', color: colors.secondary},
    {number: 6, icon: '🎬', title: 'Render Final MP4', desc: 'GitHub Actions / Local render', color: colors.primary},
  ];

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
      <MeshGradient width={1920} height={1080} speed={0.008} />
      <ParticleBackground
        particleCount={25}
        width={1920}
        height={1080}
        color={colors.warning}
        speed={0.08}
        sizeRange={[1, 2]}
        opacityRange={[0.05, 0.2]}
        connectDistance={70}
      />
      <NoiseOverlay width={1920} height={1080} opacity={0.02} />

      <div style={{position: 'relative', zIndex: 10, width: '100%', height: '100%', padding: '80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>

        <SlideReveal startFrame={0} duration={40} direction="down">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px'}}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fdcb6e, #e17055)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{fontSize: '24px'}}>🔄</span>
            </div>
            <div>
              <SecondaryGradientText style={{...typography.h3, margin: 0}}>SCENE 4</SecondaryGradientText>
              <div style={{...typography.caption, color: colors.textMuted, marginTop: '4px'}}>The Complete Workflow</div>
            </div>
          </div>
        </SlideReveal>

        <SlideReveal startFrame={50} duration={50} direction="up">
          <h2 style={{
            ...typography.display2,
            margin: 0,
            lineHeight: 1.15,
          }}>
            Workflow Lengkap: Dari <PrimaryGradientText>Ide</PrimaryGradientText> hingga <PrimaryGradientText>MP4</PrimaryGradientText>
          </h2>
        </SlideReveal>

        {/* Workflow steps - horizontal timeline */}
        <SlideReveal startFrame={150} duration={50} direction="up">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px',
            flexWrap: 'wrap',
            padding: '0 40px',
          }}>
            {workflowSteps.map((step, i) => (
              <div
                key={step.number}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '240px',
                  maxWidth: '280px',
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${i * 0.15}s forwards`,
                }}
              >
                {/* Step number + icon */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: `0 16px 48px ${withOpacity(step.color, 0.3)}`,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span style={{fontSize: '28px'}}>{step.icon}</span>
                  <span style={{
                    ...typography.caption,
                    color: colors.textOnPrimary,
                    fontWeight: 700,
                    fontSize: '16px',
                  }}>
                    Step {step.number}
                  </span>
                </div>

                {/* Connector line (except last) */}
                {i < workflowSteps.length - 1 && (
                  <div style={{
                    width: '48px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${step.color}, ${workflowSteps[i + 1].color})`,
                    marginTop: '-40px',
                    marginBottom: '40px',
                    zIndex: 1,
                    transform: 'translateX(16px)',
                  }} />
                )}

                <h3 style={{...typography.h3, margin: 0, textAlign: 'center', color: colors.textPrimary}}>
                  {step.title}
                </h3>
                <p style={{...typography.body2, color: colors.textSecondary, margin: 0, textAlign: 'center', lineHeight: 1.6}}>
                  {step.desc}
                </p>
              </div>
            ))}
            <style jsx>{`
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </SlideReveal>

        {/* Detailed view of each step */}
        <SlideReveal startFrame={400} duration={50} direction="up">
          <div style={{
            marginTop: '48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '1100px',
          }}>
            {workflowSteps.map((step, i) => (
              <GlowingCard key={i} style={{display: 'flex', gap: '20px', padding: '24px'}}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                    <span style={{
                      ...typography.caption,
                      color: step.color,
                      fontWeight: 700,
                      background: withOpacity(step.color, 0.15),
                      padding: '4px 12px',
                      borderRadius: '8px',
                    }}>
                      Step {step.number}
                    </span>
                    <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary}}>{step.title}</h3>
                  </div>
                  <p style={{...typography.body2, color: colors.textSecondary, margin: 0, lineHeight: 1.7}}>
                    {step.desc}
                  </p>
                  {i === 1 && (
                    <div style={{marginTop: '16px', padding: '12px', background: colors.bgSecondary, borderRadius: '8px', border: `1px solid ${colors.borderSubtle}`}}>
                      <pre style={{margin: 0, fontFamily: typography.fontFamilies.mono, fontSize: '11px', lineHeight: '1.6', color: colors.textPrimary}}>
{`Prompt contoh:
"Buatkan storyboard video 3 menit
tentang Remotion untuk pemula.
7 scene, dark tech style.
Output: JSON dengan scene,
duration, visual, narration."`}
                      </pre>
                    </div>
                  )}
                  {i === 2 && (
                    <div style={{marginTop: '16px', padding: '12px', background: colors.bgSecondary, borderRadius: '8px', border: `1px solid ${colors.borderSubtle}`}}>
                      <pre style={{margin: 0, fontFamily: typography.fontFamilies.mono, fontSize: '11px', lineHeight: '1.6', color: colors.textPrimary}}>
{`Claude output:
- Scene1_Hook.tsx (600 frames)
- Scene2_WhatIsRemotion.tsx (900 frames)
- Scene3_RoleOfClaude.tsx (900 frames)
- ...dst
Siap di-import ke Root.tsx`}
                      </pre>
                    </div>
                  )}
                  {i === 3 && (
                    <div style={{marginTop: '16px', padding: '12px', background: colors.bgSecondary, borderRadius: '8px', border: `1px solid ${colors.borderSubtle}`}}>
                      <pre style={{margin: 0, fontFamily: typography.fontFamilies.mono, fontSize: '11px', lineHeight: '1.6', color: colors.textPrimary}}>
{`npm run preview
# Hot reload aktif
# Edit kode → lihat perubahan instan
# Chrome DevTools untuk debug`}
                      </pre>
                    </div>
                  )}
                  {i === 5 && (
                    <div style={{marginTop: '16px', padding: '12px', background: colors.bgSecondary, borderRadius: '8px', border: `1px solid ${colors.borderSubtle}`}}>
                      <pre style={{margin: 0, fontFamily: typography.fontFamilies.mono, fontSize: '11px', lineHeight: '1.6', color: colors.textPrimary}}>
{`npx remotion render src/index.ts
MyVideo output.mp4
# Atau push ke GitHub → Actions render`}
                      </pre>
                    </div>
                  )}
                </div>
              </GlowingCard>
            ))}
          </div>
        </SlideReveal>

        {/* Progress visualization */}
        <SlideReveal startFrame={700} duration={50} direction="up">
          <div style={{marginTop: '48px', maxWidth: '800px', width: '100%'}}>
            <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 24px', textAlign: 'center'}}>
              Progress Pipeline Visualization
            </p>
            <StepProgress
              currentStep={Math.min(6, Math.max(1, Math.floor(sceneFrame / 150)))}
              totalSteps={6}
              startFrame={0}
              stepDuration={150}
              size={200}
              strokeWidth={10}
              color={colors.primary}
              labels={workflowSteps.map(s => s.title)}
            />
          </div>
        </SlideReveal>

        {/* Key insight */}
        <SlideReveal startFrame={800} duration={60} direction="up">
          <div style={{
            marginTop: '48px',
            padding: '32px',
            background: withOpacity(colors.primary, 0.1),
            border: `1px solid ${withOpacity(colors.primary, 0.3)}`,
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <PrimaryGradientText style={{...typography.h3, margin: '0 0 16px'}}>
              "Setiap step bisa diotomatisasi.
              <br />
              Kamu fokus pada kreativitas, Claude handle teknis."
            </PrimaryGradientText>
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