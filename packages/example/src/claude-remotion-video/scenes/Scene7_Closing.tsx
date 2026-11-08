import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, slideUp, SlideReveal, ScaleFadeIn, PulseGlow, FloatingElement
} from '../utils/animations';
import {GradientText, PrimaryGradientText, SecondaryGradientText, AccentGradientText} from '../components/GradientText';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {GlowingCard, FeatureCard, StatCard} from '../components/GlowingCard';
import {AnimatedCounter} from '../components/AnimatedCounter';
import {ProgressRing} from '../components/ProgressRing';

export const SCENE7_DURATION = 600; // 20 seconds

interface Scene7Props {
  startFrame?: number;
}

export const Scene7_Closing = ({startFrame = 0}: Scene7Props) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE7_DURATION) {
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
      <MeshGradient width={1920} height={1080} speed={0.003} />
      <ParticleBackground
        particleCount={50}
        width={1920}
        height={1080}
        color={colors.primary}
        speed={0.2}
        sizeRange={[1, 3]}
        opacityRange={[0.1, 0.4]}
        connectDistance={150}
      />
      <FloatingShapes
        count={20}
        width={1920}
        height={1080}
        colors={[colors.primary, colors.secondary, colors.accent, colors.warning}]
        minSize={20}
        maxSize={100}
        speed={0.1}
      />
      <NoiseOverlay width={1920} height={1080} opacity={0.02} />

      <div style={{position: 'relative', zIndex: 10, width: '100%', height: '100%', padding: '80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>

        {/* Recap stats */}
        <SlideReveal startFrame={0} duration={60} direction="up">
          <div style={{
            display: 'flex',
            gap: '64px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}>
            <StatCard value="7" label="Scene" icon={<span style={{fontSize: '28px'}}>🎬</span>} color={colors.primary} index={0} />
            <StatCard value="180" label="Detik" icon={<span style={{fontSize: '28px'}}>⏱️</span>} color={colors.secondary} index={1} />
            <StatCard value="100%" label="Code-Based" icon={<span style={{fontSize: '28px'}}>⚛️</span>} color={colors.accent} index={2} />
            <StatCard value="∞" label="Possibilities" icon={<span style={{fontSize: '28px'}}>∞</span>} color={colors.warning} index={3} />
          </div>
        </SlideReveal>

        {/* Main closing title */}
        <SlideReveal startFrame={200} duration={80} direction="up">
          <h1 style={{
            ...typography.display1,
            margin: 0,
            lineHeight: 1.05,
          }}>
            <PrimaryGradientText>Mulai Buat</PrimaryGradientText>{' '}
            <span style={{color: colors.textSecondary}}>Video</span> {' '}
            <PrimaryGradientText>Mu</PrimaryGradientText>
            <br />
            <span style={{fontSize: '48px', fontWeight: 400, color: colors.textMuted}}>
              Hari Ini
            </span>
          </h1>
        </SlideReveal>

        {/* Divider */}
        <SlideReveal startFrame={350} duration={50} direction="up">
          <div style={{
            width: '300px',
            height: '6px',
            background: colors.gradients.primary,
            marginTop: '24px',
            marginBottom: '32px',
            borderRadius: '3px',
            boxShadow: '0 0 30px ' + withOpacity(colors.primary, 0.5),
          }} />
        </SlideReveal>

        {/* CTA Buttons */}
        <SlideReveal startFrame={400} duration={60} direction="up">
          <div style={{display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <button
              style={{
                padding: '20px 48px',
                background: colors.gradients.primary,
                border: 'none',
                borderRadius: '50px',
                color: colors.textOnPrimary,
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: typography.fontFamilies.sans,
                cursor: 'pointer',
                boxShadow: `0 16px 48px ${withOpacity(colors.primary, 0.4)}`,
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🚀 Fork Repo & Mulai Coding
            </button>
            <button
              style={{
                padding: '20px 48px',
                background: 'transparent',
                border: `2px solid ${colors.primary}`,
                borderRadius: '50px',
                color: colors.primary,
                fontSize: '18px',
                fontWeight: 600,
                fontFamily: typography.fontFamilies.sans,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = withOpacity(colors.primary, 0.1); e.currentTarget.style.boxShadow = `0 0 30px ${withOpacity(colors.primary, 0.3)}`; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              📖 Baca Dokumentasi Remotion
            </button>
          </div>
        </SlideReveal>

        {/* Resources */}
        <SlideReveal startFrame={500} duration={60} direction="up">
          <div style={{display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px'}}>
            <GlowingCard style={{padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px'}}>
              <span style={{fontSize: '28px'}}>📦</span>
              <div style={{textAlign: 'left'}}>
                <div style={{...typography.caption, color: colors.textMuted, marginBottom: '4px'}}>FORK REPO</div>
                <div style={{...typography.body1, color: colors.textPrimary, fontWeight: 600}}>github.com/aicreator-byte/remotion</div>
              </div>
            </GlowingCard>
            <GlowingCard style={{padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px'}}>
              <span style={{fontSize: '28px'}}>📚</span>
              <div style={{textAlign: 'left'}}>
                <div style={{...typography.caption, color: colors.textMuted, marginBottom: '4px'}}>DOKUMENTASI</div>
                <div style={{...typography.body1, color: colors.textPrimary, fontWeight: 600}}>remotion.dev/docs</div>
              </div>
            </GlowingCard>
            <GlowingCard style={{padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px'}}>
              <span style={{fontSize: '28px'}}>💬</span>
              <div style={{textAlign: 'left'}}>
                <div style={{...typography.caption, color: colors.textMuted, marginBottom: '4px'}}>COMMUNITY</div>
                <div style={{...typography.body1, color: colors.textPrimary, fontWeight: 600}}>Discord: Remotion</div>
              </div>
            </GlowingCard>
          </div>
        </SlideReveal>

        {/* Subscribe CTA */}
        <SlideReveal startFrame={550} duration={80} direction="up">
          <PulseGlow startFrame={0} duration={120} intensity={1}>
            <div style={{
              marginTop: '48px',
              padding: '40px 64px',
              background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.15), rgba(116, 185, 255, 0.1))',
              border: `1px solid ${withOpacity(colors.primary, 0.4)}`,
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              boxShadow: `0 0 60px ${withOpacity(colors.primary, 0.2)}`,
            }}>
              <span style={{fontSize: '48px', animation: 'bounce 2s infinite'}}>🔔</span>
              <PrimaryGradientText style={{...typography.h2, margin: 0, fontSize: '36px'}}>
                Subscribe untuk Tutorial Lebih Lanjut!
              </PrimaryGradientText>
              <p style={{...typography.body1, color: colors.textSecondary, margin: 0, maxWidth: '600px', textAlign: 'center'}}>
                Video berikutnya: Advanced Animations, 3D dengan Three.js, Audio Visualization, dan lebih lagi.
              </p>
              <style jsx>{`
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
              `}</style>
            </div>
          </PulseGlow>
        </SlideReveal>

        {/* Final brand */}
        <SlideReveal startFrame={580} duration={60} direction="up">
          <div style={{marginTop: '48px', opacity: 0.6}}>
            <PrimaryGradientText style={{fontSize: '24px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase'}}>
              Claude + Remotion
            </PrimaryGradientText>
            <div style={{...typography.caption, color: colors.textMuted, marginTop: '8px'}}>
              Powered by AI • Built with Code • Rendered by Remotion
            </div>
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