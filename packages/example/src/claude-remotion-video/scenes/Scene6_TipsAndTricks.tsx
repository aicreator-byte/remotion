import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, slideUp, SlideReveal, ScaleFadeIn
} from '../utils/animations';
import {PrimaryGradientText, SecondaryGradientText, AccentGradientText} from '../components/GradientText';
import {CodeBlock, TypingCodeBlock} from '../components/CodeBlock';
import {Terminal} from '../components/Terminal';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {GlowingCard, FeatureCard} from '../components/GlowingCard';
import {AnimatedCounter} from '../components/AnimatedCounter';
import {ProgressRing, LinearProgress} from '../components/ProgressRing';

export const SCENE6_DURATION = 720; // 24 seconds

interface Scene6Props {
  startFrame?: number;
}

export const Scene6_TipsAndTricks = ({startFrame = 0}: Scene6Props) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE6_DURATION) {
    return null;
  }

  const tips = [
    {number: 1, title: 'Gunakan clamp() untuk Typography Responsive', icon: '📐', color: colors.primary,
     code: `fontSize: 'clamp(1.5rem, 4vw, 3rem)'`},
    {number: 2, title: 'Interpolate untuk Animasi Smooth', icon: '📈', color: colors.secondary,
     code: `const opacity = interpolate(frame, [0, 30], [0, 1])`},
    {number: 3, title: 'Sequence untuk Timeline Complex', icon: '🎬', color: colors.accent,
     code: `<Sequence from={0} duration={180}><SceneA /></Sequence>`},
    {number: 4, title: 'Lazy Load Scene dengan Dynamic Import', icon: '⚡', color: colors.warning,
     code: `lazyComponent={() => import('./HeavyScene')}`},
    {number: 5, title: 'Debug dengan console.log di calculateMetadata', icon: '🔍', color: colors.primary,
     code: `calculateMetadata: () => { console.log(props); return {...} }`},
    {number: 6, title: 'GitHub Actions untuk Render Gratis', icon: '☁️', color: colors.secondary,
     code: `uses: actions/checkout@v4\nrun: npx remotion render ...`},
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
      <MeshGradient width={1920} height={1080} speed={0.005} />
      <ParticleBackground
        particleCount={15}
        width={1920}
        height={1080}
        color={colors.warning}
        speed={0.04}
        sizeRange={[1, 2]}
        opacityRange={[0.03, 0.12]}
        connectDistance={50}
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
              <span style={{fontSize: '24px'}}>💡</span>
            </div>
            <div>
              <AccentGradientText style={{...typography.h3, margin: 0}}>SCENE 6</AccentGradientText>
              <div style={{...typography.caption, color: colors.textMuted, marginTop: '4px'}}>Tips & Tricks Pro</div>
            </div>
          </div>
        </SlideReveal>

        <SlideReveal startFrame={50} duration={50} direction="up">
          <h2 style={{
            ...typography.display2,
            margin: 0,
            lineHeight: 1.15,
          }}>
            <PrimaryGradientText>6 Tips Pro</PrimaryGradientText> untuk Workflow Lebih Cepat
          </h2>
        </SlideReveal>

        <SlideReveal startFrame={150} duration={50} direction="up">
          <p style={{
            ...typography.body1,
            color: colors.textSecondary,
            lineHeight: 1.8,
            fontSize: '20px',
            maxWidth: '900px',
            margin: '24px 0 0',
          }}>
            Pengalaman nyata dari puluhan video Remotion. Tips ini menghemat jam-jam debugging dan render.
          </p>
        </SlideReveal>

        {/* Tips cards */}
        <SlideReveal startFrame={300} duration={50} direction="up">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '40px',
            maxWidth: '1200px',
          }}>
            {tips.map((tip, i) => (
              <GlowingCard key={tip.number} style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px', height: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <span style={{fontSize: '28px'}}>{tip.icon}</span>
                  <div>
                    <span style={{
                      ...typography.caption,
                      color: tip.color,
                      fontWeight: 700,
                      background: withOpacity(tip.color, 0.15),
                      padding: '4px 12px',
                      borderRadius: '8px',
                    }}>
                      Tip {tip.number}
                    </span>
                  </div>
                </div>
                <h3 style={{...typography.h3, margin: 0, color: colors.textPrimary, lineHeight: 1.3, fontSize: '22px'}}>
                  {tip.title}
                </h3>
                <CodeBlock
                  code={tip.code}
                  language="typescript"
                  startFrame={0}
                  duration={0}
                  fontSize="12px"
                  showLineNumbers={false}
                />
              </GlowingCard>
            ))}
          </div>
        </SlideReveal>

        {/* Common pitfalls */}
        <SlideReveal startFrame={500} duration={50} direction="up">
          <div style={{marginTop: '48px', maxWidth: '1000px', width: '100%'}}>
            <h3 style={{...typography.h3, color: colors.textPrimary, margin: '0 0 24px'}}>
              <AccentGradientText>⚠️</AccentGradientText> Common Pitfalls to Avoid
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px'}}>
              <GlowingCard style={{borderLeft: `4px solid ${colors.error}`}}>
                <div style={{display: 'flex', gap: '16px'}}>
                  <span style={{fontSize: '28px', marginTop: '4px'}}>🚫</span>
                  <div>
                    <h4 style={{...typography.h4, color: colors.error, margin: '0 0 8px'}}>
                      Hardcoded Pixel Values
                    </h4>
                    <p style={{...typography.body2, color: colors.textSecondary, margin: 0, lineHeight: 1.7}}>
                      Gunakan <code style={{color: colors.primary, fontFamily: typography.fontFamilies.mono, fontSize: '13px' }}>clamp()</code>, <code style={{color: colors.primary, fontFamily: typography.fontFamilies.mono, fontSize: '13px' }}>%</code>, atau <code style={{color: colors.primary, fontFamily: typography.fontFamilies.mono, fontSize: '13px' }}>interpolate()</code> agar responsive di semua resolution.
                    </p>
                  </div>
                </div>
              </GlowingCard>
              <GlowingCard style={{borderLeft: `4px solid ${colors.warning}`}}>
                <div style={{display: 'flex', gap: '16px'}}>
                  <span style={{fontSize: '28px', marginTop: '4px'}}>🚫</span>
                  <div>
                    <h4 style={{...typography.h4, color: colors.warning, margin: '0 0 8px'}}>
                      Terlalu Banyak Re-render
                    </h4>
                    <p style={{...typography.body2, color: colors.textSecondary, margin: 0, lineHeight: 1.7}}>
                      Gunakan <code style={{color: colors.primary, fontFamily: typography.fontFamilies.mono, fontSize: '13px' }}>React.memo</code>, <code style={{color: colors.primary, fontFamily: typography.fontFamilies.mono, fontSize: '13px' }}>useMemo</code>, dan hindari inline function di JSX. Remotion me-re-render tiap frame.
                    </p>
                  </div>
                </div>
              </GlowingCard>
              <GlowingCard style={{borderLeft: `4px solid ${colors.accent}`}}>
                <div style={{display: 'flex', gap: '16px'}}>
                  <span style={{fontSize: '28px', marginTop: '4px'}}>🚫</span>
                  <div>
                    <h4 style={{...typography.h4, color: colors.accent, margin: '0 0 8px'}}>
                      Lupa Cleanup di useEffect
                    </h4>
                    <p style={{...typography.body2, color: colors.textSecondary, margin: 0, lineHeight: 1.7}}>
                      Animasi yang tidak dibersihkan menyebabkan memory leak di render lama. Selalu return cleanup function.
                    </p>
                  </div>
                </div>
              </GlowingCard>
              <GlowingCard style={{borderLeft: `4px solid ${colors.secondary}`}}>
                <div style={{display: 'flex', gap: '16px'}}>
                  <span style={{fontSize: '28px', marginTop: '4px'}}>🚫</span>
                  <div>
                    <h4 style={{...typography.h4, color: colors.secondary, margin: '0 0 8px'}}>
                      Render Tanpa Preview
                    </h4>
                    <p style={{...typography.body2, color: colors.textSecondary, margin: 0, lineHeight: 1.7}}>
                      Selalu <code style={{color: colors.primary, fontFamily: typography.fontFamilies.mono, fontSize: '13px' }}>npm run preview</code> dulu. Render 3 menit butuh 10-15 menit; kesalahan kecil = waktu & kredit terbuang.
                    </p>
                  </div>
                </div>
              </GlowingCard>
            </div>
          </div>
        </SlideReveal>

        {/* Pro tip summary */}
        <SlideReveal startFrame={650} duration={60} direction="up">
          <div style={{
            marginTop: '48px',
            padding: '32px',
            background: withOpacity(colors.warning, 0.1),
            border: `1px solid ${withOpacity(colors.warning, 0.3)}`,
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <AccentGradientText style={{...typography.h3, margin: '0 0 16px'}}>
              "Best practice: Preview → Fix → Preview → Render.
              <br />
              Jangan skip step manapun."
            </AccentGradientText>
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