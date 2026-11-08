import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, slideUp, SlideReveal, ScaleFadeIn
} from '../utils/animations';
import {PrimaryGradientText, SecondaryGradientText} from '../components/GradientText';
import {SCENE2_COMPOSITION_TERMINAL_LINES, SCENE2_REACT_COMPONENT_LINES} from './Scene2CodeString';
import {ChatBubble} from '../components/ChatBubble';
import {Terminal} from '../components/Terminal';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {FeatureCard, GlowingCard} from '../components/GlowingCard';
import {ProgressRing, LinearProgress} from '../components/ProgressRing';

export const SCENE2_DURATION = 900; // 30 seconds at 30fps

interface Scene2Props {
  startFrame?: number;
}

export const Scene2_WhatIsRemotion = ({startFrame = 0}: Scene2Props) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE2_DURATION) {
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
      <MeshGradient width={1920} height={1080} speed={0.012} />
      <ParticleBackground
        particleCount={30}
        width={1920}
        height={1080}
        color={colors.secondary}
        speed={0.1}
        sizeRange={[1, 2]}
        opacityRange={[0.05, 0.25]}
        connectDistance={80}
      />
      <NoiseOverlay width={1920} height={1080} opacity={0.02} />

      <div style={{position: 'relative', zIndex: 10, width: '100%', height: '100%', padding: '80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>

        {/* Scene header */}
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
              <span style={{fontSize: '24px'}}>⚛️</span>
            </div>
            <div>
              <PrimaryGradientText style={{...typography.h3, margin: 0}}>SCENE 2</PrimaryGradientText>
              <div style={{...typography.caption, color: colors.textMuted, marginTop: '4px'}}>What is Remotion?</div>
            </div>
          </div>
        </SlideReveal>

        <SlideReveal startFrame={50} duration={50} direction="up">
          <h2 style={{
            ...typography.display2,
            margin: 0,
            lineHeight: 1.15,
          }}>
            Apa itu{' '}
            <PrimaryGradientText>Remotion</PrimaryGradientText>{' '}
            dan Mengapa Menggunakannya?
          </h2>
        </SlideReveal>

        {/* Main explanation */}
        <SlideReveal startFrame={150} duration={50} direction="up">
          <div style={{maxWidth: '900px', marginTop: '24px'}}>
            <p style={{
              ...typography.body1,
              color: colors.textSecondary,
              lineHeight: 1.8,
              fontSize: '20px',
              margin: 0,
            }}>
              Remotion adalah framework berbasis <strong style={{color: colors.textPrimary}}>React</strong> yang memungkinkan kita membuat video menggunakan <strong style={{color: colors.primary}}>kode</strong>. Artinya, setiap elemen video—teks, gambar, animasi, transisi—bisa dibuat, dianimasikan, dan dikontrol menggunakan JavaScript dan React.
            </p>
          </div>
        </SlideReveal>

        {/* Key features grid */}
        <SlideReveal startFrame={300} duration={50} direction="up">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginTop: '48px',
            maxWidth: '1100px',
          }}>
            <GlowingCard
              style={{height: '100%'}}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: colors.gradients.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}>📦</div>
                <div>
                  <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary}}>Composable</h3>
                  <p style={{...typography.body2, color: colors.textSecondary, margin: '8px 0 0'}}>
                    Komponen React yang reusable untuk setiap elemen video
                  </p>
                </div>
              </div>
            </GlowingCard>

            <GlowingCard style={{height: '100%'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: colors.gradients.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}>⏱️</div>
                <div>
                  <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary}}>Frame-Accurate</h3>
                  <p style={{...typography.body2, color: colors.textSecondary, margin: '8px 0 0'}}>
                    Kontrol penuh hingga level frame tunggal (30/60 FPS)
                  </p>
                </div>
              </div>
            </GlowingCard>

            <GlowingCard style={{height: '100%'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: colors.gradients.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}>🔄</div>
                <div>
                  <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary}}>Programmatic</h3>
                  <p style={{...typography.body2, color: colors.textSecondary, margin: '8px 0 0'}}>
                    Loop, kondisi, variabel—semua kekuatan JS tersedia
                  </p>
                </div>
              </div>
            </GlowingCard>

            <GlowingCard style={{height: '100%'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #fdcb6e, #e17055)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}>🎬</div>
                <div>
                  <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary}}>Production Ready</h3>
                  <p style={{...typography.body2, color: colors.textSecondary, margin: '8px 0 0'}}>
                    Render ke MP4, WebM, ProRes, image sequence
                  </p>
                </div>
              </div>
            </GlowingCard>
          </div>
        </SlideReveal>

        {/* Code example showing Remotion composition */}
        <SlideReveal startFrame={550} duration={50} direction="left">
          <div style={{marginTop: '56px', maxWidth: '900px'}}>
            <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 16px'}}>
              Contoh struktur composition Remotion:
            </p>
            <SlideReveal startFrame={550} duration={50} direction="left">
                      <div style={{marginTop: '56px', maxWidth: '900px'}}>
                        <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 16px'}}>
                          Contoh struktur composition Remotion:
                        </p>
                        <Terminal
                          lines={SCENE2_COMPOSITION_TERMINAL_LINES}
                          startFrame={0}
                          fontSize="13px"
                        />
                      </div>
                    </SlideReveal>
          </div>
        </SlideReveal>

        {/* Visual: React component → Video frame pipeline */}
        <SlideReveal startFrame={700} duration={50} direction="right">
          <div style={{
            marginTop: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {/* React code box */}
                        <GlowingCard style={{padding: '32px', minWidth: '300px', maxWidth: '400px'}}>
                          <div style={{...typography.caption, color: colors.textMuted, marginBottom: '16px'}}>REACT COMPONENT</div>
                          <Terminal
                            lines={SCENE2_REACT_COMPONENT_LINES}
                            startFrame={0}
                            fontSize="13px"
                          />
                        </GlowingCard>

            {/* Arrow */}
            <div style={{
              fontSize: '48px',
              color: colors.primary,
              animation: 'bounce 1.5s infinite',
            }}>
              →
              <style jsx>{`
                @keyframes bounce {
                  0%, 100% { transform: translateX(0); }
                  50% { transform: translateX(10px); }
                }
              `}</style>
            </div>

            {/* Video frame box */}
            <GlowingCard style={{padding: '32px', minWidth: '300px', maxWidth: '400px'}}>
              <div style={{...typography.caption, color: colors.textMuted, marginBottom: '16px'}}>VIDEO FRAME (1/30s)</div>
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                background: colors.bgSecondary,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${colors.borderSubtle}`,
              }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  background: colors.gradients.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Hello Remotion!
                </div>
                <div style={{...typography.caption, color: colors.textMuted, marginTop: '16px'}}>
                  Frame 1 of 180
                </div>
              </div>
            </GlowingCard>
          </div>
        </SlideReveal>

        {/* Bottom note */}
        <SlideReveal startFrame={800} duration={60} direction="up">
          <div style={{
            marginTop: '64px',
            padding: '24px',
            background: withOpacity(colors.secondary, 0.1),
            border: `1px solid ${withOpacity(colors.secondary, 0.3)}`,
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <SecondaryGradientText style={{...typography.h4, margin: 0}}>
              "Kita tidak edit video. Kita menulis program yang menghasilkan video."
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