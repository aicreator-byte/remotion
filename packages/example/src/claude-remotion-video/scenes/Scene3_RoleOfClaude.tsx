import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../utils/colors';
import {typography} from '../utils/typography';
import {
  fadeIn, slideUp, SlideReveal, ScaleFadeIn, TypewriterText
} from '../utils/animations';
import {PrimaryGradientText, SecondaryGradientText} from '../components/GradientText';
import {CodeBlock, TypingCodeBlock} from '../components/CodeBlock';
import {ChatBubble, StreamingChatBubble} from '../components/ChatBubble';
import {Terminal} from '../components/Terminal';
import {ParticleBackground, FloatingShapes, MeshGradient, NoiseOverlay} from '../components/ParticleBackground';
import {GlowingCard, FeatureCard} from '../components/GlowingCard';
import {AnimatedCounter} from '../components/AnimatedCounter';

export const SCENE3_DURATION = 900; // 30 seconds

interface Scene3Props {
  startFrame?: number;
}

export const Scene3_RoleOfClaude = ({startFrame = 0}: Scene3Props) => {
  const frame = useCurrentFrame();
  const sceneFrame = frame - startFrame;

  if (sceneFrame < 0 || sceneFrame > SCENE3_DURATION) {
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
      <MeshGradient width={1920} height={1080} speed={0.01} />
      <ParticleBackground
        particleCount={35}
        width={1920}
        height={1080}
        color={colors.accent}
        speed={0.12}
        sizeRange={[1, 2.5]}
        opacityRange={[0.08, 0.3]}
        connectDistance={90}
      />
      <NoiseOverlay width={1920} height={1080} opacity={0.02} />

      <div style={{position: 'relative', zIndex: 10, width: '100%', height: '100%', padding: '80px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'}}>

        <SlideReveal startFrame={0} duration={40} direction="down">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px'}}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: colors.gradients.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{fontSize: '24px'}}>🤖</span>
            </div>
            <div>
              <AccentGradientText style={{...typography.h3, margin: 0}}>SCENE 3</AccentGradientText>
              <div style={{...typography.caption, color: colors.textMuted, marginTop: '4px'}}>The Role of Claude</div>
            </div>
          </div>
        </SlideReveal>

        <SlideReveal startFrame={50} duration={50} direction="up">
          <h2 style={{
            ...typography.display2,
            margin: 0,
            lineHeight: 1.15,
          }}>
            Di sinilah <AccentGradientText>Claude</AccentGradientText> berperan:
            <br />
            <span style={{fontWeight: 400, color: colors.textSecondary}}>Dari ide hingga kode siap render</span>
          </h2>
        </SlideReveal>

        {/* Explanation */}
        <SlideReveal startFrame={150} duration={50} direction="up">
          <p style={{
            ...typography.body1,
            color: colors.textSecondary,
            lineHeight: 1.8,
            fontSize: '20px',
            maxWidth: '900px',
            margin: '24px 0 0',
          }}>
            Kita tidak harus menulis semua kode sendiri. <strong style={{color: colors.textPrimary}}>Claude</strong> bisa membantu merancang storyboard, menulis komponen React, membuat animasi kompleks, hingga memperbaiki error visual. Kamu jadi <em style={{color: colors.primary}}>director</em>, Claude jadi <em style={{color: colors.accent}}>technical artist</em>-nya.
          </p>
        </SlideReveal>

        {/* What Claude can do - cards */}
        <SlideReveal startFrame={300} duration={50} direction="up">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '48px',
            maxWidth: '1100px',
          }}>
            {[
              {icon: '📝', title: 'Storyboard', desc: 'Rancang alur cerita & scene breakdown', color: colors.primary},
              {icon: '⚛️', title: 'Komponen React', desc: 'Tulis komponen Remotion siap pakai', color: colors.secondary},
              {icon: '✨', title: 'Animasi', desc: 'Keyframes, easing, spring, transitions', color: colors.accent},
              {icon: '🐛', title: 'Debug Visual', desc: 'Perbaiki layout, timing, glitch', color: colors.warning},
              {icon: '🔧', title: 'Refactor', desc: 'Optimasi performa & best practices', color: colors.secondary},
              {icon: '📚', title: 'Dokumentasi', desc: 'Jelaskan kode & cara modifikasi', color: colors.primary},
            ].map((item, i) => (
              <GlowingCard key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', padding: '24px'}}>
                <div style={{fontSize: '32px'}}>{item.icon}</div>
                <h3 style={{...typography.h3, margin: 0, color: item.color}}>{item.title}</h3>
                <p style={{...typography.body2, color: colors.textSecondary, margin: 0, lineHeight: 1.6}}>{item.desc}</p>
              </GlowingCard>
            ))}
          </div>
        </SlideReveal>

        {/* Live demo: Chat interface simulation */}
        <SlideReveal startFrame={500} duration={50} direction="left">
          <div style={{marginTop: '48px', maxWidth: '1000px', width: '100%'}}>
            <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 16px'}}>
              Simulasi interaksi dengan Claude:
            </p>

            <StreamingChatBubble
              messages={[
                {role: 'user', content: 'Buatkan storyboard video 3 menit tentang "Cara Membuat Video dengan AI" untuk pemula. Struktur: Hook → Apa itu Remotion → Peran Claude → Workflow lengkap → Tips → Closing. Style: tech explainer modern, dark theme.'},
                {role: 'assistant', content: 'Tentu! Saya akan rancang storyboard lengkap dengan 7 scene, durasi ~180 detik, 1920x1080, 30fps. Setiap scene punya visual direction, narasi, dan komponen Remotion yang dibutuhkan. Mulai dari Scene 1 (Hook)...', isCode: false},
              ]}
              startFrame={0}
              charsPerFrame={4}
              maxWidth="1000px"
            />
          </div>
        </SlideReveal>

        {/* Code generation demo */}
        <SlideReveal startFrame={650} duration={50} direction="right">
          <div style={{marginTop: '32px', maxWidth: '1000px', width: '100%'}}>
            <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 16px'}}>
              Claude generate komponen Remotion:
            </p>

            <TypingCodeBlock
              code={`// Scene 1: Hook Component
import { useCurrentFrame, interpolate } from 'remotion';

export const Scene1_Hook = () => {
  const frame = useCurrentFrame();
  
  const titleOpacity = interpolate(frame, [30, 80], [0, 1]);
  const titleSlide = interpolate(frame, [30, 80], [50, 0]);
  
  return (
    <div style={{opacity: titleOpacity, transform: \`translateY(\${titleSlide}px)\`}}>
      <h1>CREATE VIDEOS WITH AI</h1>
    </div>
  );
};`}
              language="tsx"
              startFrame={0}
              charsPerFrame={5}
            />
          </div>
        </SlideReveal>

        {/* Terminal showing iteration */}
        <SlideReveal startFrame={800} duration={50} direction="up">
          <div style={{marginTop: '32px', maxWidth: '1000px', width: '100%'}}>
            <p style={{...typography.h4, color: colors.textSecondary, margin: '0 0 16px'}}>
              Iterasi: Claude memperbaiki visual issues
            </p>

            <Terminal
              lines={[
                {type: 'prompt', content: '', delay: 0},
                {type: 'command', content: 'npm run preview', delay: 10},
                {type: 'output', content: '🔍 Starting Remotion Studio...', delay: 20},
                {type: 'output', content: '📦 Bundling composition...', delay: 30},
                {type: 'output', content: '✅ Preview running at http://localhost:3000', delay: 50},
                {type: 'prompt', content: '', delay: 80},
                {type: 'command', content: 'claude fix "text terlalu kecil di mobile"', delay: 90},
                {type: 'output', content: '🔧 Menerapkan fix: responsive typography dengan clamp()', delay: 100},
                {type: 'output', content: '✨ Font size sekarang: clamp(1.5rem, 4vw, 3rem)', delay: 110},
                {type: 'success', content: 'Hot reload applied. Preview updated.', delay: 130},
              ]}
              startFrame={0}
              fontSize="12px"
            />
          </div>
        </SlideReveal>

        {/* Key takeaway */}
        <SlideReveal startFrame={850} duration={60} direction="up">
          <div style={{
            marginTop: '48px',
            padding: '32px',
            background: withOpacity(colors.accent, 0.1),
            border: `1px solid ${withOpacity(colors.accent, 0.3)}`,
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <AccentGradientText style={{...typography.h3, margin: '0 0 16px'}}>
              "Claude tidak menggantikan kreativitasmu.
              <br />
              Claude mempercepat eksekusi teknisnya."
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